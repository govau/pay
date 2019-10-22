import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, P } from "@pay/web";

import {
  Service,
  GatewayAccountFragment,
  GatewayAccountPaymentProvider,
  BamboraCredentials
} from "../../__generated__/graphql";
import { isBamboraCredentials } from ".";

const SandboxCredentialsPage: React.FC = () => (
  <P>
    This is a test account. Account credentials only exist in live services, and
    relate to your payment service providers.
  </P>
);

const BamboraCredentialsPage: React.FC<{
  credentials: BamboraCredentials;
}> = ({ credentials }) => (
  <>
    <table>
      <caption>Your Bambora credentials</caption>
      <tbody>
        <tr>
          <th>Account number</th>
          <td>{credentials.account_number}</td>
        </tr>
        <tr>
          <th>Username</th>
          <td>{credentials.api_username}</td>
        </tr>
        <tr>
          <th>Password</th>
          <td>{credentials.api_username && "●●●●●●●●"}</td>
        </tr>
      </tbody>
    </table>
  </>
);

const CredentialsPage: React.FC<{
  service: Service;
  gatewayAccount: GatewayAccountFragment;
}> = ({ service, gatewayAccount }) => {
  return (
    <>
      <Helmet>
        <title>Account credentials - {service.name}</title>
      </Helmet>
      <PageTitle title="Account credentials" />
      {gatewayAccount.payment_provider ===
        GatewayAccountPaymentProvider.Sandbox && <SandboxCredentialsPage />}
      {gatewayAccount.payment_provider ===
        GatewayAccountPaymentProvider.Bambora &&
        isBamboraCredentials(gatewayAccount, gatewayAccount.credentials) && (
          <BamboraCredentialsPage credentials={gatewayAccount.credentials} />
        )}
    </>
  );
};

export default CredentialsPage;
