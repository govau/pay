import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Pages as CorePages } from "@pay/web";

import { MinimalLayout } from "../layout";

const Routes: React.FC = () => {
  const match = useRouteMatch();
  if (!match) {
    return null;
  }

  return (
    <MinimalLayout>
      <CorePages.NotFoundPage />
    </MinimalLayout>
  );
};

export default Routes;
