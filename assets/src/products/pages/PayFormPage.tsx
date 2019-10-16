import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ApolloError } from "apollo-client";
import { Form, Pages as CorePages, Loader, ErrorAlert } from "@pay/web";

import {
  UpdatePaymentMutationFn,
  useUpdatePaymentMutation
} from "../__generated__/graphql";
import { isServerError } from "../../apollo-rest-utils";
import ReferencePage from "./ReferencePage";
import AmountPage from "./AmountPage";
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
  const [updatePayment, { loading, error, data }] = useUpdatePaymentMutation({
    errorPolicy: "all"
  });

  return (
    <Form<Values>
      onSubmit={handleSubmit(payment, updatePayment)}
      column
      initialValues={{
        reference: payment.reference || "",
        amount: payment.amount ? payment.amount / 100 : 0
      }}
    >
      {({ values }) => (
        <>
          {loading ? (
            <Loader message="TODO" />
          ) : data ? (
            <Redirect to={path + "/TODO"} />
          ) : (
            <>
              {error && (
                <ErrorAlert
                  title="Unable to create payment link"
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
                    <ReferencePage path={path} payment={payment} />
                  ) : (
                    <Redirect to={`${path}/amount`} />
                  )}
                </Route>
                <Route path={`${path}/amount`} exact strict>
                  <AmountPage path={path} payment={payment} values={values} />
                </Route>
                <Route path="*">
                  <CorePages.NotFoundPage />
                </Route>
              </Switch>
            </>
          )}
        </>
      )}
    </Form>
  );
};

export default PayFormPage;
