import * as React from "react";
import { ErrorAlert } from "@pay/web";

import withContext from "../../context/withContext";
import { UserContext, UserContextValues } from "../../users";

interface Props {
  children: JSX.Element;
}

const RestrictedPage: React.FC<Props & UserContextValues> = ({
  children,
  user: { platformAdmin }
}) => {
  if (platformAdmin) {
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

export default withContext<Props>(RestrictedPage, UserContext.Consumer);
