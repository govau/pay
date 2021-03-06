import * as React from "react";
import { Helmet } from "react-helmet";
import { TODO, PageTitle, P, Link } from "@pay/web";

import {
  GatewayAccountFragment,
  PaymentProviderLabel,
  BamboraCredentials,
  ServiceFragment
} from "../../__generated__/graphql";
import { isBamboraCredentials } from "../../../payments";
import { BreadBox } from "@pay/web/components/Breadcrumb";
import { Environment as BamboraEnvironment } from "@bambora/apac-custom-checkout-sdk-web";

// TODO: want to use BamboraEnvironment not string
const bamboraEnvironmentLabel = (env?: null | string) => {
  switch (env) {
    case BamboraEnvironment.Test:
      return "Test";
    case BamboraEnvironment.Live:
      return "Live";
    default:
      return "";
  }
};

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
  <TODO>
    <table>
      <caption>Your Bambora credentials</caption>
      <tbody>
        <tr>
          <th>Environment</th>
          <td>{bamboraEnvironmentLabel(credentials.environment)}</td>
        </tr>
        <tr>
          <th>Merchant ID</th>
          <td>{credentials.merchantId}</td>
        </tr>
        <tr>
          <th>Account number</th>
          <td>{credentials.accountNumber}</td>
        </tr>
        <tr>
          <th>API username</th>
          <td>{credentials.apiUsername}</td>
        </tr>
        <tr>
          <th>API password</th>
          <td>{credentials.apiUsername && "●●●●●●●●"}</td>
        </tr>
      </tbody>
    </table>
    <Link to={`${path}/edit`}>Edit credentials</Link>
  </TODO>
);

const CredentialsPage: React.FC<{
  path: string;
  service: ServiceFragment;
  gatewayAccount: GatewayAccountFragment;
}> = ({ path, service, gatewayAccount }) => (
  <>
    <Helmet>
      <title>Account credentials - {service.name}</title>
    </Helmet>
    <PageTitle
      title="Account credentials"
      breadcrumbs={BreadBox.GatewaySettings({ service, gatewayAccount })}
    />
    {gatewayAccount.paymentProvider === PaymentProviderLabel.Sandbox && (
      <SandboxCredentialsPage />
    )}
    {gatewayAccount.paymentProvider === PaymentProviderLabel.Bambora &&
      isBamboraCredentials(gatewayAccount, gatewayAccount.credentials) && (
        <BamboraCredentialsPage
          path={path}
          credentials={gatewayAccount.credentials}
        />
      )}
  </>
);

export default CredentialsPage;
