import * as React from "react";
import { Helmet } from "react-helmet";
import { TODO, PageTitle, P, Link } from "@pay/web";

import { GatewayAccountType } from "../../../__generated__/schema";

export interface props {
  service: { externalId: string; name: string };
  gatewayAccounts: {
    externalId: string;
    type: GatewayAccountType;
  }[];
}

const DashboardPage: React.FC<props> = ({ service, gatewayAccounts }) => (
  <>
    <Helmet>
      <title>{service.name}</title>
    </Helmet>
    <PageTitle title={service.name} />
    <TODO>
      <P>From this service dashboard page you’ll be able to:</P>
      <ul>
        <li>
          View service usage and metrics:
          <ul>
            <li>Across today, last 7 days, last 30 days</li>
            <li>Successful refunds</li>
            <li>Net income</li>
          </ul>
        </li>
        <li>
          <Link to={`/console/services/${service.externalId}/team`}>
            Manage service team members
          </Link>
        </li>
        <li>Request to go live</li>
      </ul>
      <h2>Gateway accounts</h2>
      <ul>
        {gatewayAccounts.map(ga => (
          <li key={ga.externalId}>
            <Link
              to={`/console/services/${service.externalId}/gateway-accounts/${ga.externalId}/payments`}
            >
              {ga.type}
            </Link>
          </li>
        ))}
      </ul>
    </TODO>
  </>
);

export default DashboardPage;
