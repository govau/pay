import * as React from "react";
import { ErrorAlert } from "@pay/web";

import { usePayUser } from "../../users";

interface Props {
  children: JSX.Element;
}

const RestrictedPage: React.FC<Props> = ({ children }) => {
  const user = usePayUser();

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
