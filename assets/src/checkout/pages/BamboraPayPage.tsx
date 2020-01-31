import * as React from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import CustomCheckout, {
  isTokenResultError,
  Field,
  Brand
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
  CardType,
  useSubmitBamboraPaymentMutation
} from "../__generated__/graphql";
import { SidebarLayout } from "../components/Split";
import CardForm, {
  classNames as cardFormClassNames
} from "../components/BamboraCardForm";
import Summary from "../components/Summary";
import { CardTypeBrand } from "../../auth/__generated__/graphql";

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

const normalizeBamboraBrand = (brand: Brand): String => {
  switch (brand) {
    case "visa":
      return CardTypeBrand.Visa;
    case "mastercard":
      return CardTypeBrand.MasterCard;
    case "amex":
      return CardTypeBrand.AmericanExpress;
    case "diners":
      return CardTypeBrand.DinersClub;
    case "discover":
      return CardTypeBrand.Discover;
    case "jcb":
      return CardTypeBrand.Jcb;
    default:
      return "";
  }
};

const isCardBrandSupported = (
  gatewayAccount: GatewayAccountFragment,
  brand: Brand
) => {
  const bamboraBrand = normalizeBamboraBrand(brand);
  return gatewayAccount.cardTypes.some(
    cardType => cardType.brand === bamboraBrand
  );
};

const bindEventListeners = (
  checkout: CustomCheckout,
  setFieldComplete: React.Dispatch<
    React.SetStateAction<null | {
      field: Field;
    }>
  >,
  setFieldError: React.Dispatch<
    React.SetStateAction<null | {
      field: Field;
    }>
  >,
  setCardErrors: React.Dispatch<React.SetStateAction<Record<Field, string>>>,
  setCardBrand: React.Dispatch<React.SetStateAction<null | Brand>>
) => {
  checkout.on("error", event => {
    if (!event.type || !event.message) {
      setFieldError(null);
      return;
    }
    setFieldError(event);
    setCardErrors(errors => ({ ...errors, [event.field]: event.message }));
  });
  checkout.on("complete", event => {
    if (!event.complete) {
      setFieldComplete(null);
      return;
    }
    setFieldComplete(event);
    setFieldError(null);
  });
  checkout.on("empty", event => {
    if (event.empty) {
      setCardErrors(errors => ({ ...errors, [event.field]: "" }));
    }
  });
  checkout.on("brand", event => {
    if (!event.brand || event.brand === "unknown") {
      setCardBrand(null);
      return;
    }
    setCardBrand(event.brand);
    setFieldError(null);
  });
};

interface Props {
  path: string;
  gatewayAccount: Omit<GatewayAccountFragment, "credentials"> & {
    credentials: BamboraCredentials;
  };
  payment: Omit<PaymentFragment, "gateway_account">;
  cardTypes: Array<CardType>;
}

const BamboraPayPage: React.FC<Props> = ({
  path,
  gatewayAccount,
  payment,
  cardTypes
}) => {
  const history = useHistory();
  const theme = useTheme();

  const [cardFieldIds] = React.useState<Record<Field, string>>({
    "card-number": generateId("card-number-"),
    cvv: generateId("card-cvv-"),
    expiry: generateId("card-expiry-")
  });

  const [fieldComplete, setFieldComplete] = React.useState<null | {
    field: Field;
  }>(null);
  const [fieldError, setFieldError] = React.useState<null | {
    field: Field;
  }>(null);
  const [cardErrors, setCardErrors] = React.useState<Record<Field, string>>({
    "card-number": "",
    cvv: "",
    expiry: ""
  });
  const [cardBrand, setCardBrand] = React.useState<null | Brand>(null);

  const onCheckoutLoad = React.useCallback(
    (checkout: CustomCheckout) => {
      mountFields(checkout, theme, cardFieldIds);
      bindEventListeners(
        checkout,
        setFieldComplete,
        setFieldError,
        setCardErrors,
        setCardBrand
      );
    },
    [theme, cardFieldIds]
  );

  React.useEffect(() => {
    if (fieldError) {
      return;
    }
    if (!cardBrand || isCardBrandSupported(gatewayAccount, cardBrand)) {
      setCardErrors(errors => ({ ...errors, "card-number": "" }));
      return;
    }
    const bamboraBrand = normalizeBamboraBrand(cardBrand);
    const cardType = cardTypes.find(
      cardType => cardType.brand === bamboraBrand
    );

    setCardErrors(errors => ({
      ...errors,
      "card-number": !cardType
        ? "This card is not supported"
        : `${cardType.label} is not supported.`
    }));
  }, [gatewayAccount, fieldComplete, fieldError, cardBrand, cardTypes]);

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
