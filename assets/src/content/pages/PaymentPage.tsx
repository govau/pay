import * as React from "react";
import { Helmet } from "react-helmet";
import { useParams, useHistory } from "react-router-dom";
import {
  Pages as CorePages,
  Loader,
  PageTitle,
  P,
  H3,
  Button,
  styled,
  Strong
} from "@pay/web";
import {
  Label,
  Description,
  BasicTextInput
} from "@pay/web/components/form/inputs";
// import { FormElement } from "@pay/web/components/form/Form";

import { isServerError } from "../../apollo-rest-utils";
import {
  useGetPaymentQuery,
  useSubmitPaymentMutation
} from "../../pay/__generated__/graphql";

const CheckoutForm = styled.form`
  & #card-number,
  & #card-cvv,
  & #card-expiry {
    width: 12em;
    padding: 1rem 1rem 4px 1rem;
    margin-top: 3px;
    box-shadow: none;
    border: 2px solid ${props => props.theme.colors.payDarkGrey};
  }

  & #card-cvv,
  & #card-expiry {
    width: 6em;
  }
`;

const Split = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: start;
  justify-content: space-between;
`;

const Content = styled.section`
  flex: 2;
`;

const Summary = styled.div`
  font-size: 1.2em;
  position: sticky;
  top: 2em;
  padding: 1em;
  right: 0;
  flex: 1;
  background-color: ${props => props.theme.colors.payLightGrey};
`;

interface CustomCheckoutFieldOptions {
  placeholder?: string;
  style?: {
    base?: Record<string, string>;
    complete?: Record<string, string>;
    error?: Record<string, string>;
    empty?: Record<string, string>;
  };
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

const merchantID = "ec5ab889-842b-4d62-890b-e53ab84f91f4";

const PaymentPage: React.FunctionComponent = () => {
  const history = useHistory();

  const { paymentId } = useParams<{ paymentId: string }>();
  const { loading, error, data } = useGetPaymentQuery({
    variables: { id: paymentId },
    errorPolicy: "all"
  });
  const [submitPayment, { loading: submitting }] = useSubmitPaymentMutation();

  const is404 =
    error &&
    error.networkError &&
    isServerError(error.networkError) &&
    error.networkError.statusCode === 404;

  const [checkout, setCheckout] = React.useState<null | CustomCheckout>(null);

  const handleLoad = () => {
    const options = (
      params: CustomCheckoutFieldOptions
    ): CustomCheckoutFieldOptions => ({
      style: {
        base: {
          fontFamily: "-apple-system, sans-serif",
          fontSize: "16px"
        }
      },
      ...params
    });

    const c = customcheckout();

    c.create("card-number", options({})).mount("#card-number");
    c.create("cvv", options({})).mount("#card-cvv");
    c.create("expiry", options({})).mount("#card-expiry");

    setCheckout(c);
  };

  const handleError = () => {
    // TODO: handle
    console.error("could not load script");
  };

  React.useEffect(() => {
    const script = document.createElement("script");

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
  }, []);

  // TODO: lots of handling to work on:
  // - script fails to load
  // - things are loading but script tries to call bambora functions on elements that are not in DOM yet (remove visibility hack below)
  // - payment 404s
  // - submit fails
  // - button callback nesting below

  if (is404) {
    return <CorePages.NotFoundPage />;
  }

  return (
    <>
      {loading && <Loader />}
      <Split style={{ visibility: loading || !checkout ? "hidden" : "unset" }}>
        <Content>
          <Helmet>
            <title>Make a payment</title>
          </Helmet>
          <PageTitle title="Enter card details" />

          <CheckoutForm id="checkout-form">
            <Label>Card number</Label>
            <div id="card-number"></div>

            <Label>Expiry date</Label>
            <Description>For example, 10/20</Description>
            <div id="card-expiry"></div>

            <Label>Card security code</Label>
            <Description>The last 3 digits on the back of the card</Description>
            <div id="card-cvv"></div>

            <Label>Email address</Label>
            <Description>We’ll send your payment confirmation here</Description>
            <BasicTextInput />
          </CheckoutForm>

          <Button
            disabled={submitting}
            onClick={() => {
              console.log("checking out");
              if (!checkout) {
                console.log("checkout not initialised");
                return;
              }

              checkout.createOneTimeToken(merchantID, async result => {
                console.log("checking token", { result });
                if (result.error) {
                  console.log(result.error.message);
                  return;
                }

                if (!result.token) {
                  console.log("missing token in result");
                  return;
                }

                try {
                  await submitPayment({
                    variables: {
                      paymentId,
                      input: {
                        transition: "payment_succeeded",
                        payment: {
                          ott: result.token
                        }
                      }
                    }
                  });

                  history.push(`/pay/${paymentId}/success`);
                } catch (e) {}
              });
            }}
          >
            Submit payment
          </Button>
          <Button variant="link">Cancel</Button>
        </Content>
        {data && (
          <Summary>
            <Strong>Service name</Strong>
            <P>{data.payment.description}</P>

            <P>Total amount:</P>
            <H3>${(data.payment.amount / 100).toFixed(2)}</H3>
          </Summary>
        )}
      </Split>
    </>
  );
};

export default PaymentPage;
