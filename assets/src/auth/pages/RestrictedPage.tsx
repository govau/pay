import * as React from "react";
import { Redirect, useLocation } from "react-router-dom";
import { ErrorAlert, Loader } from "@pay/web";

import { CheckAuthComponent } from "../__generated__/graphql";

interface Props {
  children: JSX.Element;
}

const RestrictedPage: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <CheckAuthComponent>
      {({ data, loading, error }) => {
        if (loading) {
          return <Loader message="Checking to see if you are signed in." />;
        }
        if (error || !data) {
          return (
            <ErrorAlert
              title="Unable to authenticate user"
              message={error && error.message}
              showError
            />
          );
        }
        if (data.me && data.me.email) {
          return children;
        }
        return (
          <Redirect
            to={{
              pathname: "/auth/signin",
              search: `?redirect=${encodeURIComponent(location.pathname)}`
            }}
          />
        );
      }}
    </CheckAuthComponent>
  );
};

export default RestrictedPage;
