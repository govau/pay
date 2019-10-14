import {
  BamboraCredentials,
  GatewayAccountPaymentProvider,
  GatewayAccountCredentials,
  GatewayAccountFragment
} from "../../__generated__/graphql";

export const isBamboraCredentials = (
  gateway: GatewayAccountFragment,
  credentials: GatewayAccountCredentials
): credentials is BamboraCredentials => {
  if (!credentials) {
    return false;
  }
  return gateway.payment_provider === GatewayAccountPaymentProvider.Bambora;
};
