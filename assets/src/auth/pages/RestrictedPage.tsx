import * as React from "react";
import { ErrorAlert, Loader } from "@pay/web";
import { usePayUser } from "../../users";

interface Props {
  children: JSX.Element;
}

const RestrictedPage: React.FC<Props> = ({ children }) => {
  const { isLoading, user } = usePayUser();

  if (isLoading) {
    return <Loader />;
  }

  return user && user.email ? (
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
