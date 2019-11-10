import {
  GatewayAccount,
  GatewayAccountPaymentProvider,
  GatewayAccountType,
  GatewayAccountCredentials,
  BamboraCredentials
} from "../__generated__/schema";

interface BamboraGatewayAccount extends GatewayAccount {
  credentials: BamboraCredentials;
}

export const gatewayAccountFullType = (ga: {
  type: GatewayAccountType;
  payment_provider: GatewayAccountPaymentProvider;
}) =>
  ga.type === GatewayAccountType.Test
    ? [ga.payment_provider, ga.type].join(" ")
    : ga.type;

export const isBamboraGatewayAccount = (ga: {
  payment_provider: GatewayAccountPaymentProvider;
  credentials: GatewayAccountCredentials;
}): ga is BamboraGatewayAccount =>
  ga.payment_provider === GatewayAccountPaymentProvider.Bambora;

export const isBamboraCredentials = (
  ga: { payment_provider: GatewayAccountPaymentProvider },
  credentials: GatewayAccountCredentials
): credentials is BamboraCredentials => {
  if (!credentials) {
    return false;
  }
  return ga.payment_provider === GatewayAccountPaymentProvider.Bambora;
};
