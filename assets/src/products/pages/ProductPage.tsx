import * as React from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import { P, PageTitle, Loader, ErrorAlert, Pages as CorePages } from "@pay/web";

import { useGetProductQuery } from "../__generated__/graphql";
import { isServerError } from "../../apollo-rest-utils";

const ProductPage: React.FC = () => {
  const { serviceNameSlug, nameSlug } = useParams<{
    serviceNameSlug: string;
    nameSlug: string;
  }>();

  const { loading, error, data } = useGetProductQuery({
    variables: {
      serviceNameSlug,
      nameSlug
    },
    errorPolicy: "all"
  });

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
              title="Unable to retrieve product"
              message={error && error.message}
              showError
            />
          </>
        )
      ) : (
        <>
          <Helmet>
            <title>{data.product.name}</title>
          </Helmet>
          <PageTitle title={data.product.name} />
          <P>This page will let a person pay for this product/service.</P>
          <ul>
            <li>We'll create a payment object</li>
            <li>They'll fill in reference details</li>
            <li>They'll fill in payment amount</li>
            <li>They'll fill in credit card details</li>
            <li>They'll pay</li>
          </ul>
        </>
      )}
    </>
  );
};

export default ProductPage;
