import * as React from "react";
import { ErrorAlert, Loader } from "@pay/web";
import { useAuth0 } from "../../auth/AuthContext";

interface Props {
  children: JSX.Element;
}

const RestrictedPage: React.FC<Props> = ({ children }) => {
  const { isInitializing, isAuthenticated } = useAuth0();

  if (isInitializing) return <Loader message="Loading " />;

  return isAuthenticated ? (
    children
  ) : (
    <ErrorAlert
      title="Unable to authenticate user"
      message="Please log in to continue."
      showError
    />
  );
};

export default RestrictedPage;
