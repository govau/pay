import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Pages as CorePages, PageContent } from "@pay/web";

import * as Pages from "./pages/Pages";
import DefaultLayout from "../layout";
import RestrictedPage from "../auth/pages/RestrictedPage";

const Routes: React.FC = () => {
  const match = useRouteMatch("");
  if (!match) {
    return null;
  }
  const { url } = match;
  return (
    <DefaultLayout>
      <PageContent>
        <RestrictedPage>
          <Switch>
            <Route path={`${url}`} exact strict>
              <Pages.DashboardPage />
            </Route>
            <Route path="*">
              <CorePages.NotFoundPage />
            </Route>
          </Switch>
        </RestrictedPage>
      </PageContent>
    </DefaultLayout>
  );
};

export default Routes;
