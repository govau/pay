import * as React from "react";
import Error, { ErrorProps } from "./Error";

interface Props extends ErrorProps {
  showError: boolean;
}

const ErrorAlert: React.FC<Props> = ({ title, message, showError }) => {
  const [shouldRenderError, setShouldRenderError] = React.useState(false);

  // The container with [aria-live] needs to exists
  // on the page before any content is rendered within
  // in order for screen-readers to successfully
  // content changes
  React.useLayoutEffect(() => {
    setShouldRenderError(true);
  }, [shouldRenderError]);

  return (
    <div aria-live="assertive" role="alert">
      {shouldRenderError && showError ? (
        <Error title={title} message={message} />
      ) : null}
    </div>
  );
};

export default ErrorAlert;
