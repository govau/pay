import * as React from "react";
import { ApolloError } from "apollo-client";
import { Loader, ErrorAlert, validators } from "@pay/web";
import { FormRenderProps } from "react-final-form";
import { NakedForm } from "@pay/web/components/form/Form";

import {
  UpdatePaymentMutationFn,
  useUpdatePaymentMutation,
  ProductPaymentFragment
} from "../__generated__/graphql";
import { isServerError } from "../../apollo-rest-utils";

export interface Values {
  reference: string;
  amount: number;
}

const getErrorMessage = (error?: ApolloError) => {
  if (!error) {
    return "";
  }
  if (error.networkError && isServerError(error.networkError)) {
    const { result } = error.networkError;
    return Object.keys(result.errors)
      .map(key => `${key} ${result.errors[key]}`)
      .join(", ");
  }
  return error.message;
};

// TODO: move to module.
const ensureMoneyInCents = (amount: number) => {
  // TODO: correct calculation.
  return amount * 100;
};

const handleSubmit = (
  payment: ProductPaymentFragment,
  updatePayment: UpdatePaymentMutationFn
) => {
  return async (values: Values) => {
    const errors = [
      payment.product.reference_enabled
        ? {
            name: "reference",
            error: validators.required(
              `${payment.product.reference_label} is required`
            )(values.reference)
          }
        : null,
      !payment.product.price_fixed
        ? {
            name: "amount",
            error: validators.isGreaterThan("Enter the paymount amount", {
              min: 0
            })(values.amount)
          }
        : null
    ].filter(f => Boolean(f && f.error));

    if (errors.length > 0) {
      const initial: Partial<{ [key: string]: string }> = {};
      return errors.reduce((map, f) => {
        if (!f) {
          return map;
        }
        map[f.name] = f.error;
        return map;
      }, initial);
    }

    const { amount } = values;

    try {
      await updatePayment({
        variables: {
          id: payment.id,
          input: {
            payment: {
              ...values,
              amount: payment.product.price_fixed
                ? null
                : amount
                ? ensureMoneyInCents(amount)
                : 0
            }
          }
        }
      });
    } catch (e) {}
  };
};

interface Props {
  children: (props: FormRenderProps<Values>) => React.ReactNode;
  payment: ProductPaymentFragment;
}

const Form: React.FC<Props> = ({ children, payment }) => {
  const [updatePayment, { loading, error }] = useUpdatePaymentMutation({
    errorPolicy: "all"
  });

  return (
    <NakedForm<Values>
      onSubmit={handleSubmit(payment, updatePayment)}
      column
      initialValues={{
        reference: payment.reference || "",
        amount: payment.amount ? payment.amount / 100 : 0
      }}
    >
      {renderProps =>
        loading ? (
          <Loader />
        ) : (
          <>
            {error && (
              <ErrorAlert
                title="Unable to update the payment"
                message={getErrorMessage(error)}
                showError={true}
              />
            )}
            {children(renderProps)}
          </>
        )
      }
    </NakedForm>
  );
};

export default Form;
