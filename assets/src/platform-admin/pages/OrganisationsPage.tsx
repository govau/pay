import * as React from "react";
import Helmet from "react-helmet";
import { PageTitle, Loader, ErrorAlert } from "@pay/web";

import { OrganisationsComponent } from "../__generated__/graphql";

interface State {}

class OrganisationsPage extends React.Component<{}, State> {
  render() {
    return (
      <>
        <Helmet>
          <title>Organisations</title>
        </Helmet>
        <PageTitle title="Organisations" />
        <OrganisationsComponent>
          {({ data, loading, error }) => {
            if (loading) {
              return <Loader message="Loading organisations." />;
            }
            if (error || !data) {
              return (
                <ErrorAlert
                  title="Unable to retrieve organisations"
                  message={error && error.message}
                  showError
                />
              );
            }
            return (
              <ul>
                {data.organisations.map(o => (
                  <li key={o.id}>{o.name}</li>
                ))}
              </ul>
            );
          }}
        </OrganisationsComponent>
      </>
    );
  }
}

export default OrganisationsPage;
