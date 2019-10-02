import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert, Link } from "@pay/web";

import { useUserServicesQuery } from "../__generated__/graphql";

const DashboardPage: React.FC = () => {
  const { loading, error, data } = useUserServicesQuery({ errorPolicy: "all" });

  const match = useRouteMatch("");
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
      <ul>
        <li>
          <Link to={`${url}/services/create`}>Create a new service</Link>
        </li>
      </ul>
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
          <ul>
            {data.services.map(s => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default DashboardPage;
