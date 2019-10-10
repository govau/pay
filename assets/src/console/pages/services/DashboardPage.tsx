import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, P, Link, Loader } from "@pay/web";

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
        <li>Request to go live</li>
      </ul>
      {getGatewayAccountsQuery.loading ? (
        <Loader />
      ) : (
        <>
          <h2>Gateway accounts</h2>
          <ul>
            {getGatewayAccountsQuery.data &&
              getGatewayAccountsQuery.data.gatewayAccounts.map(ga => (
                <li key={ga.id}>
                  <Link
                    to={`/console/services/${service.id}/gateway-accounts/${ga.id}/payments`}
                  >
                    {ga.type}
                  </Link>
                </li>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default DashboardPage;
