import * as React from "react";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert } from "@pay/web";

import {
  ProductPaymentFragment,
  useSubmitPaymentMutation,
  ProductPaymentStatus
} from "../__generated__/graphql";

interface Props {
  path: string;
  payment: ProductPaymentFragment;
}

const SubmitPage: React.FC<Props> = ({ path, payment }) => {
  const [
    submitPaymentMutation,
    { data, called, loading, error }
  ] = useSubmitPaymentMutation({
    variables: {
      id: payment.id,
      input: {}
    },
    errorPolicy: "all"
  });

  if (payment.status === ProductPaymentStatus.Submitted) {
    return <Redirect to={payment.next_url} />;
  }

  if (!called) {
    submitPaymentMutation();
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error || !data ? (
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
      ) : (
        <Redirect to={data.payment.next_url} />
      )}
    </>
  );
};

export default SubmitPage;
