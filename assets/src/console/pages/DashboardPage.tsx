import * as React from "react";
import Helmet from "react-helmet";
import { PageTitle, Loader, ErrorAlert } from "@pay/web";

import { UserServicesComponent } from "../__generated__/graphql";

interface State {}

class DashboardPage extends React.Component<{}, State> {
  render() {
    return (
      <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <PageTitle title="Dashboard" />
        <UserServicesComponent>
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
              <>
                <h2>Services</h2>
                <ul>
                  {data.services.map(s => (
                    <li key={s.id}>{s.name}</li>
                  ))}
                </ul>
              </>
            );
          }}
        </UserServicesComponent>
      </>
    );
  }
}

export default DashboardPage;
