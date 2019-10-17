import * as React from "react";
import { useParams, Redirect } from "react-router";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert, Pages as CorePages } from "@pay/web";

import { isServerError } from "../../apollo-rest-utils";
import { useCreatePaymentMutation } from "../__generated__/graphql";

const ProductPage: React.FC = () => {
  const { serviceNameSlug, nameSlug } = useParams<{
    serviceNameSlug: string;
    nameSlug: string;
  }>();

  const [
    createPaymentMutation,
    { data, called, loading, error }
  ] = useCreatePaymentMutation({
    variables: {
      serviceNameSlug,
      nameSlug,
      input: {}
    },
    errorPolicy: "all"
  });

  if (!called) {
    createPaymentMutation();
  }

  const is404 =
    error &&
    error.networkError &&
    isServerError(error.networkError) &&
    error.networkError.statusCode === 404;

  return (
    <>
      {loading ? (
        <Loader />
      ) : error || !data ? (
        is404 ? (
          <CorePages.NotFoundPage />
        ) : (
          <>
            <Helmet>
              <title>Something went wrong</title>
            </Helmet>
            <PageTitle title="Something went wrong" />
            <ErrorAlert
              title="Unable to create payment"
              message={error && error.message}
              showError
            />
          </>
        )
      ) : (
        <Redirect to={`/products/pay/${data.payment.id}`} />
      )}
    </>
  );
};

export default ProductPage;
