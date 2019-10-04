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
  let { url } = match;
  url = url.endsWith("/") ? url.slice(0, -1) : url;
  return (
    <DefaultLayout>
      <PageContent>
        <Switch>
          <Route path={`${url}/`} exact strict>
            <Pages.HomePage />
          </Route>
          <Route path={`${url}/terms`} exact strict>
            <Pages.TermsPage />
          </Route>
          <Route path={`${url}/privacy`} exact strict>
            <Pages.PrivacyPage />
          </Route>
          <Route path={`${url}/pay`} exact strict>
            <Pages.PaymentPage />
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
