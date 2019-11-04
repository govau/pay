import * as React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import CustomCheckout, {
  isTokenResultError
} from "@bambora/apac-custom-checkout-sdk-web";
import { useCreateOTT } from "@bambora/apac-custom-checkout-sdk-web/react-hooks";
import { ErrorAlert, PageTitle, Button, Loader } from "@pay/web";
import { useTheme } from "@pay/web/styled-components";
import { Theme } from "@pay/web/theme";
import { generateId } from "@pay/web/lib/utils";

import {
  PaymentFragment,
  useSubmitBamboraPaymentMutation
} from "../__generated__/graphql";
import Split, { Content } from "../components/Split";
import CardForm, {
  classNames as cardFormClassNames
} from "../components/BamboraCardForm";
import Summary from "../components/Summary";

const merchantID = "ec5ab889-842b-4d62-890b-e53ab84f91f4";

const mountCustomCheckout = (
  checkout: CustomCheckout,
  theme: Theme,
  ids: { number: string; cvv: string; expiry: string }
) => {
  const style = {
    base: {
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
  payment: PaymentFragment;
}

const BamboraPayPage: React.FC<Props> = ({ path, payment }) => {
  const history = useHistory();
  const theme = useTheme();

  const [submitError, setSubmitError] = React.useState<null | Error>(null);
  const [loadCheckout, setCustomCheckout] = React.useState<{
    loading: boolean;
    error?: Error;
    checkout?: CustomCheckout;
  }>({ loading: false });

  const createOTT = useCreateOTT(merchantID, loadCheckout.checkout);

  const [
    submitPayment,
    { loading: submitting }
  ] = useSubmitBamboraPaymentMutation();

  const [cardNumberId] = React.useState(generateId("card-number-"));
  const [cardCVVId] = React.useState(generateId("card-cvv-"));
  const [cardExpiryId] = React.useState(generateId("card-expiry-"));

  React.useEffect(() => {
    const handleLoad = () => {
      const checkout = customcheckout();

      setCustomCheckout({ loading: false, checkout });

      mountCustomCheckout(checkout, theme, {
        number: cardNumberId,
        cvv: cardCVVId,
        expiry: cardExpiryId
      });
    };

    const handleError = () => {
      const error = new Error("Could not connect to the payment gateway");
      setCustomCheckout({ loading: false, error });
    };

    const script = document.createElement("script");

    // TODO: different script for demo/test or prod environment
    script.src =
      "https://customcheckout-uat.bambora.net.au/1.0.0/customcheckout.js";
    script.async = true;
    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);

      document.body.removeChild(script);
    };
  }, [theme, cardNumberId, cardCVVId, cardExpiryId]);

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
