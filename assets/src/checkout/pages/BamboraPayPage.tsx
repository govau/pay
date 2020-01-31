import * as React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import CustomCheckout, {
  isTokenResultError,
  Field
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
import { SidebarLayout } from "../components/Split";
import CardForm, {
  classNames as cardFormClassNames
} from "../components/BamboraCardForm";
import Summary from "../components/Summary";

const mountFields = (
  checkout: CustomCheckout,
  theme: Theme,
  ids: Record<Field, string>
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
    .mount(`#${ids["card-number"]}`);
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

const bindEventListeners = (
  checkout: CustomCheckout,
  setCardErrors: React.Dispatch<React.SetStateAction<Record<Field, string>>>
) => {
  checkout.on("error", event => {
    setCardErrors(errors => ({ ...errors, [event.field]: event.message }));
  });
  checkout.on("complete", event => {
    if (event.complete) {
      setCardErrors(errors => ({ ...errors, [event.field]: "" }));
    }
  });
  checkout.on("empty", event => {
    if (event.empty) {
      setCardErrors(errors => ({ ...errors, [event.field]: "" }));
    }
  });
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

  const [cardFieldIds] = React.useState<Record<Field, string>>({
    "card-number": generateId("card-number-"),
    cvv: generateId("card-cvv-"),
    expiry: generateId("card-expiry-")
  });

  const [cardErrors, setCardErrors] = React.useState<Record<Field, string>>({
    "card-number": "",
    cvv: "",
    expiry: ""
  });

  const onCheckoutLoad = React.useCallback(
    (checkout: CustomCheckout) => {
      mountFields(checkout, theme, cardFieldIds);
      bindEventListeners(checkout, setCardErrors);
    },
    [theme, cardFieldIds]
  );

  const loadCheckout = useLoadCheckout({
    // TODO: different script for demo/test or prod environment
    src: "https://customcheckout-uat.bambora.net.au/1.0.0/customcheckout.js",
    onLoad: onCheckoutLoad
  });
  const createOTT = useCreateOTT(
    gatewayAccount.credentials.merchantId,
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
          paymentId: payment.externalId,
          transition: "payment_succeeded",
          input: {
            ott: result.token,
            last4: result.last4,
            expiryMonth: result.expiryMonth,
            expiryYear: result.expiryYear
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
  }, [history, path, payment.externalId, createOTT, submitPayment]);

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
      <CardForm
        onSubmit={handleSubmit}
        fieldIds={cardFieldIds}
        errors={cardErrors}
      >
        <Button
          disabled={createOTT.loading || submitting}
          onClick={handleSubmit}
        >
          Submit payment
        </Button>
        <Button variant="link">Cancel</Button>
      </CardForm>
    </SidebarLayout>
  );
};

export default BamboraPayPage;
