import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Pages as CorePages, PageContent } from "@pay/web";

import { MinimalLayout } from "../layout";

const Routes: React.FC = () => {
  const match = useRouteMatch();
  if (!match) {
    return null;
  }

  return (
    <MinimalLayout>
      <PageContent>
        <CorePages.NotFoundPage />
      </PageContent>
    </MinimalLayout>
  );
};

export default Routes;
