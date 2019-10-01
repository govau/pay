import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert, Link } from "@pay/web";

import { useServicesQuery } from "../__generated__/graphql";

const ServicesPage: React.FC = () => {
  const { loading, error, data } = useServicesQuery({ errorPolicy: "all" });

  return (
    <>
      <Helmet>
        <title>Services</title>
      </Helmet>
      <PageTitle title="Services" />
      {loading ? (
        <Loader message="Loading services" />
      ) : error || !data ? (
        <ErrorAlert
          title="Unable to retrieve services"
          message={error && error.message}
          showError
        />
      ) : (
        <ul>
          {data.services.map(s => (
            <li key={s.external_id}>
              <Link to={`/console/services/${s.external_id}`}>{s.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ServicesPage;
