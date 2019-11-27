import {
  GatewayAccount,
  PaymentProviderLabel,
  GatewayAccountType,
  GatewayAccountCredentials,
  BamboraCredentials
} from "../__generated__/schema";

interface BamboraGatewayAccount extends GatewayAccount {
  credentials: BamboraCredentials;
}

export const gatewayAccountFullType = (ga: {
  type: GatewayAccountType;
  paymentProvider: PaymentProviderLabel;
}) =>
  ga.type === GatewayAccountType.Test
    ? [ga.paymentProvider, ga.type].join(" ")
    : ga.type;

export const isBamboraGatewayAccount = (ga: {
  paymentProvider: PaymentProviderLabel;
  credentials: GatewayAccountCredentials;
}): ga is BamboraGatewayAccount =>
  ga.paymentProvider === PaymentProviderLabel.Bambora;

export const isBamboraCredentials = (
  ga: { paymentProvider: PaymentProviderLabel },
  credentials: GatewayAccountCredentials
): credentials is BamboraCredentials => {
  if (!credentials) {
    return false;
  }
  return ga.paymentProvider === PaymentProviderLabel.Bambora;
};
