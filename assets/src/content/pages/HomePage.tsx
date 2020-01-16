import * as React from "react";
import { P, Link } from "@pay/web";

import { useAuth0 } from "../../auth/AuthContext";
import { Redirect } from "react-router-dom";

const HomePage: React.FunctionComponent = () => {
  const { user } = useAuth0();

  return (
    <>
      {user ? (
        user.email_verified ? (
          <Redirect to="/console" />
        ) : (
          <>
            <P>You've successfully signed up. Just one more thing.</P>
            <P>Please check your email and verify your account to continue.</P>
            <P>
              <Link to={window.location}>Refresh</Link>
            </P>
          </>
        )
      ) : (
        <P>Please sign in to get started</P>
      )}
    </>
  );
};

export default HomePage;
