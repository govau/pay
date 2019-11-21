import * as React from "react";
import { Helmet } from "react-helmet";
import { TODO, PageTitle, Loader, ErrorAlert, Link } from "@pay/web";

import { useServicesQuery } from "../__generated__/graphql";

const ServicesPage: React.FC = () => {
  const { loading, error, data } = useServicesQuery({ errorPolicy: "all" });

  return (
    <>
      <Helmet>
        <title>Services</title>
      </Helmet>
      <PageTitle title="Services" />
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
          <ul>
            {data.services.map(s => (
              <li key={s.id}>
                <Link to={`/console/services/${s.id}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </TODO>
    </>
  );
};

export default ServicesPage;
