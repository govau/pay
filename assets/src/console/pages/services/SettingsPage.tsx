import * as React from "react";
import { Helmet } from "react-helmet";
import { TODO, PageTitle, Link } from "@pay/web";

import { GatewayAccountType } from "../../__generated__/graphql";
import { BreadBox } from "@pay/web/components/Breadcrumb";

export interface props {
  service: { externalId: string; name: string };
  gatewayAccounts: { externalId: string; type: GatewayAccountType }[];
}

const SettingsPage: React.FC<props> = ({ service, gatewayAccounts }) => {
  let gatewayAccount = null;
  if (gatewayAccounts && gatewayAccounts.length > 0) {
    const live = gatewayAccounts.filter(
      ga => ga.type === GatewayAccountType.Live
    );
    if (live.length > 0) {
      gatewayAccount = live[0];
    } else {
      gatewayAccount = gatewayAccounts[0];
    }
  }

  return (
    <>
      <Helmet>
        <title>Settings - {service.name}</title>
      </Helmet>
      <PageTitle
        title="Settings"
        breadcrumbs={BreadBox.Settings({ service })}
      />
      <TODO>
        <ul>
          <li>
            <Link to={`/console/services/${service.externalId}/edit-name`}>
              Edit name
            </Link>{" "}
          </li>
          <li>
            <Link to={`/console/services/${service.externalId}/team`}>
              Manage service team members
            </Link>
          </li>
          <li>Manage API keys</li>
          {gatewayAccount && (
            <li>
              <Link
                to={`/console/services/${service.externalId}/gateway-accounts/${gatewayAccount.externalId}/credentials`}
              >
                Manage payment service provider account credentials
              </Link>
            </li>
          )}
          {gatewayAccount && (
            <li>
              <Link
                to={`/console/services/${service.externalId}/gateway-accounts/${gatewayAccount.externalId}/card-types`}
              >
                Manage the cards that you accept
              </Link>
            </li>
          )}
        </ul>
      </TODO>
    </>
  );
};

export default SettingsPage;
