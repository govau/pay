import * as React from "react";
import { ErrorAlert, Loader } from "@pay/web";
import { useAuth0 } from "../../auth/AuthContext";
import { usePayUser } from "../../users";

interface Props {
  children: JSX.Element;
}

const RestrictedPage: React.FC<Props> = ({ children }) => {
  const { isInitializing, isAuthenticated } = useAuth0();
  const user = usePayUser();

  if (isInitializing || (isAuthenticated && !user)) {
    return <Loader message="Loading" />;
  }

  if (user && user.platformAdmin) {
    return children;
  }

  return (
    <ErrorAlert
      title="Permission denied"
      message="Sorry, you don’t have permission to access this page"
      showError
    />
  );
};

export default RestrictedPage;
