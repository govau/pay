import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, P, Button } from "@pay/web";

/* TODO: use this later
const useScript = (url: string) => {
  React.useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};
*/

interface CustomCheckoutFieldOptions {
  placeholder: string;
}

type CustomCheckoutField = "card-number" | "cvv" | "expiry";

interface CustomCheckoutElement {
  mount: (domID: string) => void;
}

interface TokenResultError {
  message: string;
}

interface TokenResult {
  error?: TokenResultError;
  token?: string;
}

interface CustomCheckout {
  create: (
    field: CustomCheckoutField,
    options?: CustomCheckoutFieldOptions
  ) => CustomCheckoutElement;
  createOneTimeToken: (
    merchantID: string,
    callback: (result: TokenResult) => void
  ) => void;
}

declare var customcheckout: () => CustomCheckout;

const PrivacyPage: React.FunctionComponent = () => {
  /*
  useScript(
    "https://customcheckout-uat.bambora.net.au/1.0.0/customcheckout.js"
  );
  */

  let checkout: CustomCheckout | null = null;

  const setupCheckout = (c: CustomCheckout) => {
    checkout = c;

    checkout
      .create("card-number", {
        placeholder: "Card number"
      })
      .mount("#card-number");

    checkout
      .create("cvv", {
        placeholder: "CVV"
      })
      .mount("#card-cvv");

    checkout
      .create("expiry", {
        placeholder: "Card expiry"
      })
      .mount("#card-expiry");
  };

  const scriptElement = document.querySelector("#custom-checkout-script");
  const merchantID = "ec5ab889-842b-4d62-890b-e53ab84f91f4";

  React.useEffect(() => {
    customcheckout
      ? setupCheckout(customcheckout())
      : scriptElement &&
        scriptElement.addEventListener("load", () => {
          setupCheckout(customcheckout());
        });
  });

  return (
    <>
      <Helmet>
        <title>Make a payment</title>
        it
      </Helmet>
      <PageTitle title="Enter card details" />
      <P>ok ok ok</P>

      <form id="checkout-form">
        <div id="card-number"></div>
        <div id="card-cvv"></div>
        <div id="card-expiry"></div>
      </form>

      <Button
        onClick={() => {
          if (!checkout) {
            console.log("checkout not initialised");
            return;
          }

          checkout.createOneTimeToken(merchantID, result => {
            if (result.error) {
              console.log(result.error.message);
            } else {
              console.log(result.token);
            }
          });
        }}
      >
        Make the payment
      </Button>
    </>
  );
};

export default PrivacyPage;
