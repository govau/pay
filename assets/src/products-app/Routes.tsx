import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Pages as CorePages, PageContent } from "@pay/web";

import * as Pages from "./pages/Pages";
import DefaultLayout from "../layout";

const Routes: React.FC = () => {
  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;
  return (
    <DefaultLayout>
      <PageContent>
        <Switch>
          <Route path={`${url}`} exact strict>
            <Pages.HomePage />
          </Route>
          <Route path={`${url}/:serviceNameSlug/:nameSlug`} exact strict>
            <Pages.ProductPage />
          </Route>
          <Route path="*">
            <CorePages.NotFoundPage />
          </Route>
        </Switch>
      </PageContent>
    </DefaultLayout>
  );
};

export default Routes;
