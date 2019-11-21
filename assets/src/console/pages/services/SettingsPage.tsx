import * as React from "react";
import { Helmet } from "react-helmet";
import { TODO, PageTitle, Link } from "@pay/web";

import { Service, GatewayAccountType } from "../../__generated__/graphql";

const SettingsPage: React.FC<{
  service: Service;
}> = ({ service }) => {
  let gatewayAccount = null;
  if (service.gateway_accounts && service.gateway_accounts.length > 0) {
    const live = service.gateway_accounts.filter(
      ga => ga.type === GatewayAccountType.Live
    );
    if (live.length > 0) {
      gatewayAccount = live[0];
    } else {
      gatewayAccount = service.gateway_accounts[0];
    }
  }

  return (
    <>
      <Helmet>
        <title>Settings - {service.name}</title>
      </Helmet>
      <PageTitle title="Settings" />
      <TODO>
        <ul>
          <li>
            <Link to={`/console/services/${service.id}/edit-name`}>
              Edit name
            </Link>{" "}
          </li>
          <li>
            <Link to={`/console/services/${service.id}/team`}>
              Manage service team members
            </Link>
          </li>
          <li>Manage API keys</li>
          {gatewayAccount && (
            <li>
              <Link
                to={`/console/services/${service.id}/gateway-accounts/${gatewayAccount.id}/credentials`}
              >
                Manage payment service provider account credentials
              </Link>
            </li>
          )}
          <li>Manage the cards that you accept</li>
        </ul>
      </TODO>
    </>
  );
};

export default SettingsPage;
