import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  TODO,
  PageTitle,
  Loader,
  ErrorAlert,
  Link,
  Warning,
  P
} from "@pay/web";

import { useGetUserServicesQuery } from "../__generated__/graphql";

const DashboardPage: React.FC = () => {
  const { loading, error, data } = useGetUserServicesQuery({
    errorPolicy: "all"
  });

  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageTitle title="Dashboard" />
      <TODO>
        {loading ? (
          <Loader message="Loading services" />
        ) : error || !data ? (
          <ErrorAlert
            title="Unable to retrieve services"
            message={error && error.message}
            showError
          />
        ) : (
          <>
            <h2>Services</h2>
            {data.services.length === 0 && (
              <Warning>
                <P>You don’t have access to any services.</P>
                <P>
                  <Link to={`${url}/services/create`}>
                    Create a new service
                  </Link>
                </P>
              </Warning>
            )}
            <ul>
              {data.services.map(s => (
                <li key={s.externalId}>
                  <Link to={`/console/services/${s.externalId}`}>{s.name}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </TODO>
    </>
  );
};

export default DashboardPage;
