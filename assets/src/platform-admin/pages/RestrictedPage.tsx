import * as React from "react";
import { ErrorAlert, Loader } from "@pay/web";
import { useAuth0 } from "../../auth/AuthContext";

interface Props {
  children: JSX.Element;
}

const RestrictedPage: React.FC<Props> = ({ children }) => {
  const { isInitializing, isAuthenticated } = useAuth0();

  if (isInitializing) return <Loader message="Loading " />;

  if (isAuthenticated) {
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
