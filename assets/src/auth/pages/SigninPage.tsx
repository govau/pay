import * as React from "react";
import { Helmet } from "react-helmet";
import { TODO, PageTitle, Button } from "@pay/web";

const SigninPage: React.FunctionComponent = () => (
  <>
    <Helmet>
      <title>Sign in</title>
    </Helmet>
    <PageTitle title="Sign in" />
    <TODO>
      <p>
        You can access Pay.gov.au by using single sign on with Google or
        Microsoft.
      </p>
      <Button stretch={true}>Use Google</Button>
      <Button stretch={true} variant="secondary">
        Use Microsoft
      </Button>
    </TODO>
  </>
);

export default SigninPage;
