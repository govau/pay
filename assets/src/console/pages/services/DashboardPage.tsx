import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, P, Link } from "@pay/web";

import {
  Service,
  useGetServiceGatewayAccountsQuery
} from "../../__generated__/graphql";

const DashboardPage: React.FC<{
  service: Service;
}> = ({ service }) => {
  const getGatewayAccountsQuery = useGetServiceGatewayAccountsQuery({
    variables: { serviceId: service.id },
    errorPolicy: "all"
  });

  console.log(getGatewayAccountsQuery);

  return (
    <>
      <Helmet>
        <title>{service.name}</title>
      </Helmet>
      <PageTitle title={service.name} />
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
          <Link to={`/console/services/${service.id}/team`}>
            Manage service team members
          </Link>
        </li>
        <li>Manage payment links</li>
        <li>Request to go live</li>
      </ul>
    </>
  );
};

export default DashboardPage;
