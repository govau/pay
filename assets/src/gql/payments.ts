import { GatewayAccountPaymentProvider } from "../__generated__/schema";

export const typePatchers = {
  GatewayAccount: (data: any): any => {
    if (data.credentials) {
      switch (data.payment_provider) {
        case GatewayAccountPaymentProvider.Sandbox:
          data.credentials = {
            __typename: "SandboxCredentials",
            ...data.credentials
          };
          break;
        case GatewayAccountPaymentProvider.Bambora:
          data.credentials = {
            __typename: "BamboraCredentials",
            ...data.credentials
          };
          break;
      }
    }
    return data;
  },
  Payment: (data: any): any => {
    if (data.card_details) {
      data.card_details = { __typename: "CardDetails", ...data.card_details };
    }
    return data;
  }
};
