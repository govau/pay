import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ApolloError } from "apollo-client";
import { Pages as CorePages, Loader, ErrorAlert, validators } from "@pay/web";
import { NakedForm } from "@pay/web/components/form/Form";

import {
  UpdatePaymentMutationFn,
  useUpdatePaymentMutation
} from "../__generated__/graphql";
import { isServerError } from "../../apollo-rest-utils";
import ReferencePage from "./ReferencePage";
import AmountPage from "./AmountPage";
import SubmitPage from "./SubmitPage";
import { ProductPaymentFragment } from "../__generated__/graphql";

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

const PayFormPage: React.FC<{
  payment: ProductPaymentFragment;
  path: string;
}> = ({ payment, path }) => {
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
      {({ handleSubmit, values }) => (
        <>
          {loading ? (
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
              <Switch>
                <Route path={path} exact strict>
                  <Redirect to={`${path}/reference`} />
                </Route>
                <Route path={`${path}/reference`} exact strict>
                  {payment.product.reference_enabled ? (
                    <ReferencePage
                      path={path}
                      payment={payment}
                      onSubmit={handleSubmit}
                    />
                  ) : (
                    <Redirect to={`${path}/amount`} />
                  )}
                </Route>
                <Route path={`${path}/amount`} exact strict>
                  <AmountPage
                    path={path}
                    payment={payment}
                    values={values}
                    onSubmit={handleSubmit}
                  />
                </Route>
                <Route path={`${path}/submit`} exact strict>
                  <SubmitPage path={path} payment={payment} />
                </Route>
                <Route path="*">
                  <CorePages.NotFoundPage />
                </Route>
              </Switch>
            </>
          )}
        </>
      )}
    </NakedForm>
  );
};

export default PayFormPage;
