import * as React from "react";

import CustomCheckout, { TokenResultError } from "./";

interface useLoadCheckoutArgs {
  src: string;
  onLoad: (checkout: CustomCheckout) => void;
}

export const useLoadCheckout = ({ src, onLoad }: useLoadCheckoutArgs) => {
  interface State {
    loading: boolean;
    error?: Error;
    checkout?: CustomCheckout;
  }

  const [state, setState] = React.useState<State>({ loading: false });

  React.useEffect(() => {
    const handleLoad = () => {
      const checkout = customcheckout();

      setState({ loading: false, checkout });

      onLoad(checkout);
    };

    const handleError = () => {
      const error = new Error("Could not connect to the payment gateway");
      setState({ loading: false, error });
    };

    const script = document.createElement("script");

    script.src = src;
    script.async = true;
    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);

      document.body.removeChild(script);
    };
  }, [src, onLoad]);

  return React.useMemo(() => state, [state]);
};

export const useCreateOTT = (
  merchantId?: null | string,
  checkout?: CustomCheckout
) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<null | Error | TokenResultError>(
    null
  );

  const call = React.useCallback(() => {
    if (!checkout) {
      const err = new Error(
        "Checkout is not available. Make sure that you have loaded the custom checkout script on the page"
      );
      setError(err);
      return Promise.reject(err);
    }

    return new Promise<{
      token: string;
      last4: string;
      expiryMonth: string;
      expiryYear: string;
    }>((resolve, reject) => {
      if (!merchantId) {
        const err = new Error("Merchant ID is not set");
        setError(err);
        return reject(err);
      }

      setLoading(true);

      checkout.createOneTimeToken(merchantId, result => {
        setLoading(false);

        const {
          error,
          code,
          token,
          last4 = "",
          expiryMonth = "",
          expiryYear = ""
        } = result;

        if (error) {
          const { message, type } = error;
          const err = new TokenResultError(message, type);
          setError(err);
          return reject(err);
        }
        if (code !== 200) {
          const err = new Error(`Got non-200 code ${code} from response`);
          setError(err);
          return reject(err);
        }
        if (!token) {
          const err = new Error("Could not get one time token from response");
          setError(err);
          return reject(err);
        }
        return resolve({ token, last4, expiryMonth, expiryYear });
      });
    });
  }, [merchantId, checkout]);

  return React.useMemo(
    () => ({
      call,
      loading,
      error
    }),
    [call, loading, error]
  );
};
