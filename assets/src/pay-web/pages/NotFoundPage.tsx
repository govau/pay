import * as React from "react";
import { Helmet } from "react-helmet";

import PageTitle from "../components/PageTitle";
import ErrorAlert from "../components/ErrorAlert";

const NotFoundPage: React.FunctionComponent<{}> = () => (
  <>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <PageTitle title="Page not found" />
    <ErrorAlert
      title="Oops, could not find that page"
      message="Please check the URL but it’s possible the page no longer exists."
      showError
    />
  </>
);

export default NotFoundPage;
