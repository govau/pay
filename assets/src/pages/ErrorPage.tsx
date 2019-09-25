import * as React from "react";
import { ErrorAlert } from "@pay/web";
import PageContent from "../layout/PageContent";

interface Props {
  title?: string;
  message?: string;
}

const ErrorPage: React.FC<Props> = ({ title, message }) => {
  return (
    <PageContent>
      <ErrorAlert
        title={title || "There was an error loading this page"}
        message={message || "We’re working on it"}
        showError
      />
    </PageContent>
  );
};

export default ErrorPage;
