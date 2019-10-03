import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, P, Link } from "@pay/web";

import { Service } from "../../__generated__/graphql";

const DashboardPage: React.FC<{
  service: Service;
}> = ({ service }) => (
  <>
    <Helmet>
      <title>{service.name}</title>
    </Helmet>
    <PageTitle title={service.name} />
    <P>
      From this service dashboard page and its child pages you’ll be able to:
    </P>
    <ul>
      <li>
        View service usage and metrics:
        <ul>
          <li>Across today, last 7 days, last 30 days</li>
          <li>Successful refunds</li>
          <li>Net income</li>
        </ul>
      </li>
      <li>Manage transactions</li>
      <li>
        <Link to={`/console/services/${service.id}/team`}>
          Manage service team members
        </Link>
      </li>
      <li>
        Adjust service settings{" "}
        <ul>
          <li>
            <Link to={`/console/services/${service.id}/edit-name`}>
              Edit name
            </Link>{" "}
          </li>
        </ul>
      </li>
      <li>Manage payment links</li>
      <li>Manage API keys</li>
      <li>Manage payment service provider account credentials</li>
      <li>Manage the cards that you accept</li>
      <li>Request to go live</li>
    </ul>
  </>
);

export default DashboardPage;
