import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, P, Link } from "@pay/web";

import {
  Service,
  GatewayAccountFragment,
  GatewayAccountPaymentProvider,
  BamboraCredentials
} from "../../__generated__/graphql";
import { isBamboraCredentials } from "../../../payments";

const SandboxCredentialsPage: React.FC = () => (
  <P>
    This is a test account. Account credentials only exist in live services, and
    relate to your payment service providers.
  </P>
);

const BamboraCredentialsPage: React.FC<{
  path: string;
  credentials: BamboraCredentials;
}> = ({ path, credentials }) => (
  <>
    <table>
      <caption>Your Bambora credentials</caption>
      <tbody>
        <tr>
          <th>Merchant ID</th>
          <td>{credentials.merchant_id}</td>
        </tr>
        <tr>
          <th>Account number</th>
          <td>{credentials.account_number}</td>
        </tr>
        <tr>
          <th>API username</th>
          <td>{credentials.api_username}</td>
        </tr>
        <tr>
          <th>API password</th>
          <td>{credentials.api_username && "●●●●●●●●"}</td>
        </tr>
      </tbody>
    </table>
    <Link to={`${path}/edit`}>Edit credentials</Link>
  </>
);

const CredentialsPage: React.FC<{
  path: string;
  service: Service;
  gatewayAccount: GatewayAccountFragment;
}> = ({ path, service, gatewayAccount }) => (
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
        <BamboraCredentialsPage
          path={path}
          credentials={gatewayAccount.credentials}
        />
      )}
  </>
);

export default CredentialsPage;
