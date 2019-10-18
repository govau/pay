import * as React from "react";
import { Helmet } from "react-helmet";
import { Route, Switch, Redirect } from "react-router-dom";
import { ApolloError } from "apollo-client";
import { validators, Pages as CorePages, Loader, ErrorAlert } from "@pay/web";
import { NakedForm } from "@pay/web/components/form/Form";

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
  reference_label: string;
  reference_hint: string;
  price_fixed: boolean | null;
  price: number;
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
  gatewayAccountId: string,
  createProduct: CreateProductMutationFn
) => {
  return async (values: Values) => {
    const errors = [
      {
        name: "name",
        error: validators.required("Enter a payment link title")(values.name)
      },
      {
        name: "reference_enabled",
        error: validators.isNotNull("Please choose an option")(
          values.reference_enabled
        )
      },
      {
        name: "price_fixed",
        error: validators.isNotNull("Please choose an option")(
          values.price_fixed
        )
      },
      values.reference_enabled
        ? {
            name: "reference_label",
            error: validators.required("Enter a payment reference")(
              values.reference_label
            )
          }
        : null,
      values.price_fixed
        ? {
            name: "price",
            error: validators.isGreaterThan("Enter the amount", {
              min: 0
            })(values.price)
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

    // TODO: fix bug whereby a user that edits a step of this form and then
    // submits causes the request below to execute (because there are no more
    // errors). The way to fix it is to set a state in the location/history when
    // on the review page. If they go to a step to make a change, check for that
    // state and if it exists, instead of submitting, redirects to /review
    // (unless on /review already).

    const { reference_enabled, price_fixed, price } = values;

    try {
      await createProduct({
        variables: {
          gatewayAccountId,
          input: {
            product: {
              ...values,
              reference_enabled: Boolean(reference_enabled),
              price_fixed: Boolean(price_fixed),
              price: price ? ensureMoneyInCents(price) : 0
            }
          }
        }
      });
    } catch (e) {}
  };
};

interface Props {
  serviceName: string;
  gatewayAccountId: string;
  path: string;
}

const CreateFormPage: React.FC<Props> = ({
  serviceName,
  gatewayAccountId,
  path
}) => {
  const [createProduct, { loading, error, data }] = useCreateProductMutation({
    errorPolicy: "all"
  });

  return (
    <>
      <Helmet>
        <title>Create payment link</title>
      </Helmet>
      <NakedForm<Values>
        onSubmit={handleSubmit(gatewayAccountId, createProduct)}
        column
        initialValues={{
          name: "",
          reference_enabled: null,
          reference_label: "",
          reference_hint: "",
          price_fixed: null,
          price: 0
        }}
      >
        {({ values, handleSubmit }) => (
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
                  <Route path={`${path}/details`} exact strict>
                    <DetailsPage
                      serviceName={serviceName}
                      path={path}
                      values={values}
                      onSubmit={handleSubmit}
                    />
                  </Route>
                  <Route path={`${path}/reference`} exact strict>
                    <ReferencePage
                      path={path}
                      values={values}
                      onSubmit={handleSubmit}
                    />
                  </Route>
                  <Route path={`${path}/amount`} exact strict>
                    <AmountPage
                      path={path}
                      values={values}
                      onSubmit={handleSubmit}
                    />
                  </Route>
                  <Route path={`${path}/review`} exact strict>
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
      </NakedForm>
    </>
  );
};

export default CreateFormPage;
