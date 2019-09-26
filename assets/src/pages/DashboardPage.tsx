import * as React from "react";
import Helmet from "react-helmet";
import { Loader, ErrorAlert } from "@pay/web";

import { CardTypesComponent } from "../__generated__/graphql";
import PageTitle from "../components/PageTitle";

interface State {}

class DashboardPage extends React.Component<{}, State> {
  render() {
    return (
      <>
        <Helmet>
          <title>Dashboard</title>
        </Helmet>
        <PageTitle title="Dashboard" />
        <CardTypesComponent>
          {({ data, loading, error }) => {
            if (loading) {
              return <Loader message="Loading card types." />;
            }
            if (error || !data) {
              return (
                <ErrorAlert
                  title="Unable to retrieve card types"
                  message={error && error.message}
                  showError
                />
              );
            }
            return (
              <>
                <h2>Card types</h2>
                <ul>
                  {data.cardTypes.map(ct => (
                    <li key={ct.id}>
                      {ct.label}: {ct.brand}
                    </li>
                  ))}
                </ul>
              </>
            );
          }}
        </CardTypesComponent>
      </>
    );
  }
}

export default DashboardPage;
