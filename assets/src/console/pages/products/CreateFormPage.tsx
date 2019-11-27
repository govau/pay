import * as React from "react";
import { Helmet } from "react-helmet";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { ApolloError } from "apollo-client";
import { Form as FinalForm } from "react-final-form";
import createDecorator from "final-form-focus";
import { validators, Pages as CorePages, Loader, ErrorAlert } from "@pay/web";

import {
  CreateProductMutationFn,
  useCreateProductMutation
} from "../../__generated__/graphql";
import { isServerError } from "../../../apollo-rest-utils";
import DetailsPage from "./DetailsPage";
import ReferencePage from "./ReferencePage";
import AmountPage from "./AmountPage";
import ReviewPage from "./ReviewPage";
import { Location } from "history";

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
  location: Location,
  path: string,
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

    if (location.pathname !== `${path}/review`) {
      return;
    }

    const { reference_enabled, price_fixed, price } = values;

    try {
      await createProduct({
        variables: {
          gatewayAccountId,
          input: {
            ...values,
            referenceEnabled: Boolean(reference_enabled),
            priceFixed: Boolean(price_fixed),
            price: price ? ensureMoneyInCents(price) : 0
          }
        }
      });
    } catch (e) {}
  };
};

const decorators = [createDecorator<Values>()];

interface Props {
  serviceName: string;
  gatewayAccountId: string;
  productsPath: string;
  path: string;
}

const CreateFormPage: React.FC<Props> = ({
  serviceName,
  gatewayAccountId,
  productsPath,
  path
}) => {
  const location = useLocation();

  const [createProduct, { loading, error, data }] = useCreateProductMutation({
    errorPolicy: "all"
  });

  return (
    <>
      <Helmet>
        <title>Create payment link</title>
      </Helmet>
      <FinalForm<Values>
        onSubmit={handleSubmit(location, path, gatewayAccountId, createProduct)}
        initialValues={{
          name: "",
          reference_enabled: null,
          reference_label: "",
          reference_hint: "",
          price_fixed: null,
          price: 0
        }}
        decorators={decorators}
      >
        {({ values, handleSubmit }) => (
          <>
            {loading ? (
              <Loader message="Creating a new payment link" />
            ) : data && data.product ? (
              <Redirect to={productsPath} />
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
                    <ReviewPage
                      path={path}
                      values={values}
                      onSubmit={handleSubmit}
                    />
                  </Route>
                  <Route path="*">
                    <CorePages.NotFoundPage />
                  </Route>
                </Switch>
              </>
            )}
          </>
        )}
      </FinalForm>
    </>
  );
};

export default CreateFormPage;
