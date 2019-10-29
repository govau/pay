import * as React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import {
  Pages as CorePages,
  Loader,
  PageTitle,
  P,
  H2,
  Strong,
  ErrorAlert,
  Callout,
  DescriptionList
} from "@pay/web";

import { isServerError } from "../../apollo-rest-utils";
import { useGetPaymentQuery } from "../../pay/__generated__/graphql";

const PaymentSuccessPage: React.FunctionComponent = () => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const { loading, error, data } = useGetPaymentQuery({
    variables: { id: paymentId },
    errorPolicy: "all"
  });

  if (loading) {
    return <Loader message="Loading payment" />;
  }

  const is404 =
    error &&
    error.networkError &&
    isServerError(error.networkError) &&
    error.networkError.statusCode === 404;

  if (is404) {
    return <CorePages.NotFoundPage />;
  }

  if (error || !data) {
    return (
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
    );
  }

  const payment = data.payment;

  return (
    <>
      <Helmet>
        <title>Your payment was successful - {payment.description}</title>
      </Helmet>
      <PageTitle title="Your payment was successful" />
      <Callout>
        <P>
          Your payment reference number is <Strong>{payment.reference}</Strong>
        </P>
      </Callout>
      <H2>Payment summary</H2>
      <DescriptionList>
        <dt>Payment for:</dt>
        <dd>{payment.description}</dd>
        <dt>Total amount:</dt>
        <dd>${(payment.amount / 100).toFixed(2)}</dd>
      </DescriptionList>
    </>
  );
};

export default PaymentSuccessPage;
