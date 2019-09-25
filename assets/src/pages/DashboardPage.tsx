import * as React from "react";
import Helmet from "react-helmet";

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
      </>
    );
  }
}

export default DashboardPage;
