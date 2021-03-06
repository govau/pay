import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Pages as CorePages } from "@pay/web";

import * as Pages from "./pages/Pages";
import DefaultLayout from "../layout";
import RestrictedPage from "../auth/pages/RestrictedPage";
import ServiceRoutes from "./ServiceRoutes";

const Routes: React.FC = () => {
  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;
  return (
    <DefaultLayout>
      <RestrictedPage>
        <Switch>
          <Route path={`${url}`} exact strict>
            <Pages.DashboardPage />
          </Route>
          <Route
            path={`${url}/services/:serviceId([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})`}
            strict
          >
            <ServiceRoutes />
          </Route>
          <Route path={`${url}/services/create`} exact strict>
            <Pages.Services.CreatePage />
          </Route>
          <Route path="*">
            <CorePages.NotFoundPage />
          </Route>
        </Switch>
      </RestrictedPage>
    </DefaultLayout>
  );
};

export default Routes;
