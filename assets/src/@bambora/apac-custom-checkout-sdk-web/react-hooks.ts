import * as React from "react";

import CustomCheckout, { TokenResultError } from "./";

export const useCreateOTT = (merchantID: string, checkout?: CustomCheckout) => {
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
      setLoading(true);

      checkout.createOneTimeToken(merchantID, result => {
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
  }, [merchantID, checkout]);

  return React.useMemo(
    () => ({
      call,
      loading,
      error
    }),
    [call, loading, error]
  );
};
