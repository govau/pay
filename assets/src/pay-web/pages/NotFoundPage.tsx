import * as React from "react";
import Helmet from "react-helmet";

import PageTitle from "../components/PageTitle";

const NotFoundPage: React.FunctionComponent<{}> = () => (
  <>
    <Helmet>
      <title>Page not found</title>
    </Helmet>
    <PageTitle title="Page not found" />
    <p>Oops, could not find that page</p>
  </>
);

export default NotFoundPage;
