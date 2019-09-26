import * as React from "react";
import Helmet from "react-helmet";

import PageTitle from "../components/PageTitle";

const TermsPage: React.FunctionComponent = () => (
  <>
    <Helmet>
      <title>Terms of service</title>
    </Helmet>
    <PageTitle title="Terms of service" />
    <p>
      All references to “Digital Transformation Agency”, “we”, “us”, or “our” in
      these Terms of service are references to ....
    </p>
    <h3>1. Terms</h3>
    <p>...</p>
  </>
);

export default TermsPage;
