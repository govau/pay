import * as React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { ErrorAlert, PageTitle, Button } from "@pay/web";

import {
  PaymentFragment,
  useSubmitSandboxPaymentMutation
} from "../__generated__/graphql";
import { SidebarLayout } from "../components/Split";
import CardForm from "../components/SandboxCardForm";
import Summary from "../components/Summary";

interface Props {
  path: string;
  payment: PaymentFragment;
}

const SandboxPayPage: React.FC<Props> = ({ path, payment }) => {
  const history = useHistory();

  const [submitError, setSubmitError] = React.useState<null | Error>(null);

  const [
    submitPayment,
    { loading: submitting }
  ] = useSubmitSandboxPaymentMutation();

  const handleSubmit = React.useCallback(async () => {
    try {
      await submitPayment({
        variables: {
          paymentId: payment.externalId,
          transition: "payment_succeeded",
          input: {
            // TODO
            last4: "TODO result.last4",
            expiryMonth: "TODO result.expiryMonth",
            expiryYear: "TODO result.expiryYear"
          }
        }
      });

      history.push(`${path}/success`);
    } catch (e) {
      setSubmitError(e);

      console.error(`could not submit payment: ${e.message}`, e);
    }
  }, [history, path, payment.externalId, submitPayment]);

  return (
    <SidebarLayout sidebar={<Summary payment={payment} />} important={false}>
      <Helmet>
        <title>Make a payment</title>
      </Helmet>
      <PageTitle title="Enter card details" />
      {submitError && (
        <ErrorAlert
          title="Unable to submit your payment"
          message={submitError.message}
          showError
        />
      )}
      <CardForm onSubmit={handleSubmit}>
        <Button disabled={submitting} onClick={handleSubmit}>
          Submit payment
        </Button>
        <Button variant="link">Cancel</Button>
      </CardForm>
    </SidebarLayout>
  );
};

export default SandboxPayPage;
