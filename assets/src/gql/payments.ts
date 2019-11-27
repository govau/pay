import { PaymentProviderLabel } from "../__generated__/schema";

const withCredentialsTypeName = (gatewayAccount: any) => {
  switch (gatewayAccount.payment_provider) {
    case PaymentProviderLabel.Sandbox:
      return {
        __typename: "SandboxCredentials",
        ...gatewayAccount.credentials
      };
    case PaymentProviderLabel.Bambora:
      return {
        __typename: "BamboraCredentials",
        ...gatewayAccount.credentials
      };
    default:
      return gatewayAccount.credentials;
  }
};

export const typePatchers = {
  GatewayAccount: (data: any): any => {
    if (data.credentials) {
      data.credentials = withCredentialsTypeName(data);
    }
    return data;
  },
  Payment: (data: any): any => {
    data.card_details = { __typename: "CardDetails", ...data.card_details };
    data.gateway_account = {
      __typename: "GatewayAccount",
      ...data.gateway_account,
      credentials: data.gateway_account.credentials
        ? withCredentialsTypeName(data.gateway_account)
        : data.gateway_account.credentials
    };
    return data;
  }
};
