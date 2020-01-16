import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  PageTitle,
  Loader,
  ErrorAlert,
  Link,
  Warning,
  P,
  styled
} from "@pay/web";

import { useGetUserServicesQuery } from "../__generated__/graphql";

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  li {
    list-style: none;
  }
`;

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
        <title>Select a service</title>
      </Helmet>
      <PageTitle title="Select a service" />
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
          {data.services.length === 0 && (
            <Warning>
              <P>You don’t have access to any services.</P>
              <P>
                <Link to={`${url}/services/create`}>Create a new service</Link>
              </P>
            </Warning>
          )}
          <Ul>
            {data.services.map(s => (
              <li key={s.externalId}>
                <Link to={`/console/services/${s.externalId}`}>{s.name}</Link>
              </li>
            ))}
          </Ul>
        </>
      )}
    </>
  );
};

export default DashboardPage;
