import * as React from "react";

interface Props {
  showAlert?: boolean;
}

/** Announces content to screen reader on mount */
const Alert: React.FC<Props> = ({ children, showAlert = true }) => {
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
      {shouldRenderError && showAlert ? children : null}
    </div>
  );
};

export default Alert;
