import * as React from "react";
import Helmet from "react-helmet";
import { PageTitle, Loader, ErrorAlert } from "@pay/web";

import { ServicesComponent } from "../__generated__/graphql";

interface State {}

class ServicesPage extends React.Component<{}, State> {
  render() {
    return (
      <>
        <Helmet>
          <title>Services</title>
        </Helmet>
        <PageTitle title="Services" />
        <ServicesComponent>
          {({ data, loading, error }) => {
            if (loading) {
              return <Loader message="Loading services." />;
            }
            if (error || !data) {
              return (
                <ErrorAlert
                  title="Unable to retrieve services"
                  message={error && error.message}
                  showError
                />
              );
            }
            return (
              <ul>
                {data.services.map(s => (
                  <li key={s.id}>{s.name}</li>
                ))}
              </ul>
            );
          }}
        </ServicesComponent>
      </>
    );
  }
}

export default ServicesPage;
