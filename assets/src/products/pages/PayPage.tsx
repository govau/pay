import * as React from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet";
import { P, PageTitle, Loader, ErrorAlert, Pages as CorePages } from "@pay/web";

import { useGetPaymentQuery } from "../__generated__/graphql";
import { isServerError } from "../../apollo-rest-utils";

const PayPage: React.FC = () => {
  const { productPaymentId: id } = useParams<{
    productPaymentId: string;
  }>();

  const { loading, error, data } = useGetPaymentQuery({
    variables: {
      id
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
              title="Unable to retrieve that payment"
              message={error && error.message}
              showError
            />
          </>
        )
      ) : (
        <>
          <Helmet>
            <title>{data.payment.product.name}</title>
          </Helmet>
          <PageTitle title={data.payment.product.name} />
          <P>{data.payment.product.description}</P>
          <ul>
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

export default PayPage;
