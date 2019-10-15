import * as React from "react";
import { Helmet } from "react-helmet";
import { Route, Switch, Redirect } from "react-router-dom";
import { ApolloError } from "apollo-client";
import { Form, Pages as CorePages, Loader, ErrorAlert } from "@pay/web";

import {
  CreateProductMutationFn,
  useCreateProductMutation
} from "../../__generated__/graphql";
import { isServerError } from "../../../apollo-rest-utils";
import DetailsPage from "./DetailsPage";
import ReferencePage from "./ReferencePage";
import AmountPage from "./AmountPage";
import ReviewPage from "./ReviewPage";

export interface Values {
  name: string;
  description?: string;
  reference_enabled: boolean | null;
  reference_label?: string;
  reference_hint?: string;
  price_fixed: boolean | null;
  price?: string;
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
const ensureMoneyInCents = (amount: string) => {
  // TODO: correct calculation.
  return Number(amount) * 100;
};

const handleSubmit = (
  gatewayAccountId: string,
  createProduct: CreateProductMutationFn
) => {
  return async (values: Values) => {
    const { reference_enabled, price_fixed, price } = values;
    try {
      await createProduct({
        variables: {
          gatewayAccountId,
          input: {
            product: {
              ...values,
              reference_enabled: !!reference_enabled,
              price_fixed: !!price_fixed,
              price: price ? ensureMoneyInCents(price) : 0
            }
          }
        }
      });
    } catch (e) {}
  };
};

const CreateFormPage: React.FC<{
  serviceName: string;
  gatewayAccountId: string;
  path: string;
}> = ({ serviceName, gatewayAccountId, path }) => {
  const [createProduct, { loading, error, data }] = useCreateProductMutation({
    errorPolicy: "all"
  });

  return (
    <>
      <Helmet>
        <title>Create payment link</title>
      </Helmet>
      <Form<Values>
        onSubmit={handleSubmit(gatewayAccountId, createProduct)}
        column
        initialValues={{
          name: "",
          reference_enabled: null,
          price_fixed: null
        }}
      >
        {({ values }) => (
          <>
            {loading ? (
              <Loader message="Creating a new payment link" />
            ) : data && data.product ? (
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
                  <Route path={`${path}/details`}>
                    <DetailsPage
                      serviceName={serviceName}
                      path={path}
                      values={values}
                    />
                  </Route>
                  <Route path={`${path}/reference`}>
                    <ReferencePage path={path} values={values} />
                  </Route>
                  <Route path={`${path}/amount`}>
                    <AmountPage path={path} values={values} />
                  </Route>
                  <Route path={`${path}/review`}>
                    <ReviewPage path={path} values={values} />
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
    </>
  );
};

export default CreateFormPage;
