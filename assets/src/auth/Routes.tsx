import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Pages as CorePages, PageContent } from "@pay/web";

import * as Pages from "./pages/Pages";
import { MinimalLayout } from "../layout";

const Routes: React.FC = () => {
  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;
  return (
    <MinimalLayout>
      <PageContent>
        <Switch>
          <Route path={`${url}/signin`} exact strict>
            <Pages.SigninPage />
          </Route>
          <Route path="*">
            <CorePages.NotFoundPage />
          </Route>
        </Switch>
      </PageContent>
    </MinimalLayout>
  );
};

export default Routes;
