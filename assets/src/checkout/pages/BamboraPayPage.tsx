import * as React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import CustomCheckout, {
  isTokenResultError
} from "@bambora/apac-custom-checkout-sdk-web";
import {
  useLoadCheckout,
  useCreateOTT
} from "@bambora/apac-custom-checkout-sdk-web/react-hooks";
import { ErrorAlert, PageTitle, Button, Loader } from "@pay/web";
import { useTheme } from "@pay/web/styled-components";
import { Theme } from "@pay/web/theme";
import { generateId } from "@pay/web/lib/utils";

import {
  GatewayAccountFragment,
  PaymentFragment,
  BamboraCredentials,
  useSubmitBamboraPaymentMutation
} from "../__generated__/graphql";
import Split, { Content } from "../components/Split";
import CardForm, {
  classNames as cardFormClassNames
} from "../components/BamboraCardForm";
import Summary from "../components/Summary";

const mountFields = (
  checkout: CustomCheckout,
  theme: Theme,
  ids: { number: string; cvv: string; expiry: string }
) => {
  const style = {
    base: {
      padding: "10px", // TODO: equal to 1rem. Pull from theme?
      fontFamily: theme.fontFamily,
      fontSize: "16px",
      ":focus": {
        color: "inherit"
      },
      ":hover": {
        color: "inherit"
      }
    }
  };

  checkout
    .create("card-number", {
      style,
      classes: cardFormClassNames.number
    })
    .mount(`#${ids.number}`);
  checkout
    .create("cvv", {
      style,
      classes: cardFormClassNames.cvv
    })
    .mount(`#${ids.cvv}`);
  checkout
    .create("expiry", {
      style,
      classes: cardFormClassNames.expiry
    })
    .mount(`#${ids.expiry}`);
};

interface Props {
  path: string;
  gatewayAccount: Omit<GatewayAccountFragment, "credentials"> & {
    credentials: BamboraCredentials;
  };
  payment: Omit<PaymentFragment, "gateway_account">;
}

const BamboraPayPage: React.FC<Props> = ({ path, gatewayAccount, payment }) => {
  const history = useHistory();
  const theme = useTheme();

  const [cardNumberId] = React.useState(generateId("card-number-"));
  const [cardCVVId] = React.useState(generateId("card-cvv-"));
  const [cardExpiryId] = React.useState(generateId("card-expiry-"));

  const onCheckoutLoad = React.useCallback(
    (checkout: CustomCheckout) => {
      mountFields(checkout, theme, {
        number: cardNumberId,
        cvv: cardCVVId,
        expiry: cardExpiryId
      });
    },
    [theme, cardNumberId, cardCVVId, cardExpiryId]
  );

  const loadCheckout = useLoadCheckout({
    // TODO: different script for demo/test or prod environment
    src: "https://customcheckout-uat.bambora.net.au/1.0.0/customcheckout.js",
    onLoad: onCheckoutLoad
  });
  const createOTT = useCreateOTT(
    gatewayAccount.credentials.merchant_id,
    loadCheckout.checkout
  );

  const [submitError, setSubmitError] = React.useState<null | Error>(null);
  const [
    submitPayment,
    { loading: submitting }
  ] = useSubmitBamboraPaymentMutation();

  const handleSubmit = React.useCallback(async () => {
    try {
      const result = await createOTT.call();

      await submitPayment({
        variables: {
          paymentId: payment.id,
          input: {
            transition: "payment_succeeded",
            payment: {
              ott: result.token,
              last4: result.last4,
              expiryMonth: result.expiryMonth,
              expiryYear: result.expiryYear
            }
          }
        }
      });

      history.push(`${path}/success`);
    } catch (e) {
      setSubmitError(e);

      console.error(`could not submit payment: ${e.message}`, e);

      if (isTokenResultError(e)) {
        // TODO: handle
        console.error("is token result error");
      }
    }
  }, [history, path, payment.id, createOTT, submitPayment]);

  if (loadCheckout.error) {
    return (
      <>
        <Helmet>
          <title>Something went wrong</title>
        </Helmet>
        <PageTitle title="Something went wrong" />
        <ErrorAlert
          title="Unable to start the payment process"
          message={loadCheckout.error.message}
          showError
        />
      </>
    );
  }

  if (loadCheckout.loading || !loadCheckout.checkout) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Make a payment</title>
      </Helmet>
      <Split>
        <Content>
          <PageTitle title="Enter card details" />
          {submitError && (
            <ErrorAlert
              title="Unable to submit your payment"
              message={submitError.message}
              showError
            />
          )}
          <CardForm
            onSubmit={handleSubmit}
            numberId={cardNumberId}
            cvvId={cardCVVId}
            expiryId={cardExpiryId}
          >
            <Button
              disabled={createOTT.loading || submitting}
              onClick={handleSubmit}
            >
              Submit payment
            </Button>
            <Button variant="link">Cancel</Button>
          </CardForm>
        </Content>
        <Summary payment={payment} />
      </Split>
    </>
  );
};

export default BamboraPayPage;
