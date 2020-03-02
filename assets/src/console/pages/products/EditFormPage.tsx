import * as React from "react";
import { Helmet } from "react-helmet";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { ApolloError } from "apollo-client";
import { Form as FinalForm } from "react-final-form";
import createDecorator from "final-form-focus";
import { validators, Pages as CorePages, Loader, ErrorAlert } from "@pay/web";

import {
  UpdateProductMutationFn,
  useUpdateProductMutation
} from "../../__generated__/graphql";
import { ProductFragment } from "../../../products/__generated__/graphql";
import { isServerError } from "../../../apollo-rest-utils";
import DetailsPage from "./DetailsPage";
import ReferencePage from "./ReferencePage";
import AmountPage from "./AmountPage";
import { Location } from "history";
import EditStartPage from "./EditStartPage";

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
  id: string,
  updateProduct: UpdateProductMutationFn
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

    if (location.pathname !== `${path}`) {
      return;
    }

    const { reference_enabled, price_fixed, price } = values;

    try {
      await updateProduct({
        variables: {
          id,
          input: {
            ...values,
            referenceEnabled: Boolean(reference_enabled),
            referenceLabel: values.reference_label,
            priceFixed: Boolean(price_fixed),
            price: price ? ensureMoneyInCents(price) : 0
          }
        }
      });
      return;
    } catch (e) {}
  };
};

const decorators = [createDecorator<Values>()];

interface Props {
  serviceName: string;
  gatewayAccountId: string;
  product: ProductFragment;
  path: string;
  productPath: string;
}

const EditFormPage: React.FC<Props> = ({
  serviceName,
  gatewayAccountId,
  product,
  path,
  productPath
}) => {
  const location = useLocation();

  const [updateProduct, { loading, error, data }] = useUpdateProductMutation({
    errorPolicy: "all"
  });

  return (
    <>
      <Helmet>
        <title>Edit payment link</title>
      </Helmet>
      <FinalForm<Values>
        onSubmit={handleSubmit(
          location,
          path,
          product.externalId,
          updateProduct
        )}
        initialValues={{
          name: product.name,
          description: !product.description ? "" : product.description,
          reference_enabled: product.referenceEnabled,
          reference_label: !product.referenceLabel
            ? ""
            : product.referenceLabel,
          reference_hint: product.referenceHint || "",
          price_fixed: product.priceFixed,
          price: Number(product.price / 100)
        }}
        decorators={decorators}
      >
        {({ values, handleSubmit }) => (
          <>
            {loading ? (
              <Loader message="Editing payment link" />
            ) : data && data.product ? (
              <Redirect to={path} />
            ) : (
              <>
                {error && (
                  <ErrorAlert
                    title="Unable to edit payment link"
                    message={getErrorMessage(error)}
                    showError={true}
                  />
                )}
                <Switch>
                  <Route path={`${path}/details`} exact strict>
                    <DetailsPage
                      serviceName={serviceName}
                      title="Edit payment link information"
                      values={values}
                      onSubmit={handleSubmit}
                      redirectURL={path}
                    />
                  </Route>
                  <Route path={`${path}/reference`} exact strict>
                    <ReferencePage
                      values={values}
                      onSubmit={handleSubmit}
                      redirectURL={path}
                    />
                  </Route>
                  <Route path={`${path}/amount`} exact strict>
                    <AmountPage
                      values={values}
                      onSubmit={handleSubmit}
                      redirectURL={path}
                    />
                  </Route>
                  <Route path={`${path}`} exact strict>
                    <EditStartPage
                      path={path}
                      productPath={productPath}
                      values={values}
                      product={product}
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

export default EditFormPage;
