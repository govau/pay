import * as React from "react";
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

  React.useEffect(() => {
    if (!called) {
      submitPaymentMutation();
    }
    if (payment.status === ProductPaymentStatus.Submitted) {
      window.location.href = payment.next_url;
    }
  }, [called, submitPaymentMutation, payment.status, payment.next_url]);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return (
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
    );
  }

  return null;
};

export default SubmitPage;
