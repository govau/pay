import * as React from "react";
import { ApolloError } from "apollo-client";
import {
  Form as FinalForm,
  FormRenderProps as FinalFormRenderProps
} from "react-final-form";
import createDecorator from "final-form-focus";
import { Loader, ErrorAlert, validators } from "@pay/web";

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
  console.log("WE ARE SUBMITTING");
  console.log({ payment, updatePayment });
  return async (values: Values) => {
    console.log("WE ARE SUBMITTING values");
    console.log({ values });
    const errors = [
      payment.product.referenceEnabled
        ? {
            name: "reference",
            error: validators.required(
              `${payment.product.referenceLabel} is required`
            )(values.reference)
          }
        : null,
      !payment.product.priceFixed
        ? {
            name: "amount",
            error: validators.isGreaterThan("Enter the paymount amount", {
              min: 0
            })(values.amount)
          }
        : null
    ].filter(f => Boolean(f && f.error));
    console.log({ errors });

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
          id: payment.externalId,
          input: {
            ...values,
            amount: payment.product.priceFixed
              ? null
              : amount
              ? ensureMoneyInCents(amount)
              : 0
          }
        }
      });
    } catch (e) {}
  };
};

const decorators = [createDecorator<Values>()];

interface Props {
  children: (props: FinalFormRenderProps<Values>) => React.ReactNode;
  payment: ProductPaymentFragment;
}

const Form: React.FC<Props> = ({ children, payment }) => {
  const [updatePayment, { loading, error }] = useUpdatePaymentMutation({
    errorPolicy: "all"
  });

  return (
    <FinalForm<Values>
      onSubmit={handleSubmit(payment, updatePayment)}
      initialValues={{
        reference: payment.reference || "",
        amount: payment.amount ? payment.amount / 100 : 0
      }}
      decorators={decorators}
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
    </FinalForm>
  );
};

export default Form;
