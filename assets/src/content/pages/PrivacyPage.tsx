import * as React from "react";
import Helmet from "react-helmet";
import { PageTitle, Link } from "@pay/web";

const PrivacyPage: React.FunctionComponent = () => (
  <>
    <Helmet>
      <title>Privacy policy</title>
    </Helmet>
    <PageTitle title="Privacy policy" />
    <p>
      All references to “Digital Transformation Agency”, “we”, “us”, or “our” in
      this Privacy policy are references to ....
    </p>
    <p>...</p>
    <p>
      Your continued use of our website will be regarded as acceptance of our
      practices around privacy and personal information. If you have any
      questions about how we handle user data and personal information, feel
      free to <Link to="/contact">contact us</Link>.
    </p>
  </>
);

export default PrivacyPage;
