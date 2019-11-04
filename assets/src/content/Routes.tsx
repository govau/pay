import React from "react";
import { Route, Switch } from "react-router-dom";
import { Pages as CorePages, PageContent } from "@pay/web";

import * as Pages from "./pages/Pages";
import DefaultLayout from "../layout";

const Routes: React.FC = () => {
  return (
    <DefaultLayout>
      <PageContent>
        <Switch>
          <Route path="/" exact strict>
            <Pages.HomePage />
          </Route>
          <Route path="/terms" exact strict>
            <Pages.TermsPage />
          </Route>
          <Route path="/privacy" exact strict>
            <Pages.PrivacyPage />
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
