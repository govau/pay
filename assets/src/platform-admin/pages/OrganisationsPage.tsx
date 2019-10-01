import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert } from "@pay/web";

import { useOrganisationsQuery } from "../__generated__/graphql";

const OrganisationsPage: React.FC = () => {
  const { loading, error, data } = useOrganisationsQuery({
    errorPolicy: "all"
  });

  return (
    <>
      <Helmet>
        <title>Organisations</title>
      </Helmet>
      <PageTitle title="Organisations" />
      {loading ? (
        <Loader message="Loading organisations" />
      ) : error || !data ? (
        <ErrorAlert
          title="Unable to retrieve organisations"
          message={error && error.message}
          showError
        />
      ) : (
        <ul>
          {data.organisations.map(o => (
            <li key={o.external_id}>{o.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default OrganisationsPage;
