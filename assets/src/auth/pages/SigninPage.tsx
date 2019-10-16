import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Button } from "@pay/web";

const SigninPage: React.FunctionComponent = () => (
  <>
    <Helmet>
      <title>Sign in</title>
    </Helmet>
    <PageTitle title="Sign in" />
    <p>
      You can access Pay.gov.au by using single sign on with Google or
      Microsoft.
    </p>
    <Button stretch={true}>Use Google</Button>
    <Button stretch={true} variant="secondary">
      Use Microsoft
    </Button>
  </>
);

export default SigninPage;
