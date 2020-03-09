import React from "react";
import { Route, Switch } from "react-router-dom";
import { Pages as CorePages } from "@pay/web";

import * as Pages from "./pages/Pages";
import DefaultLayout from "../layout";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact strict>
        <Pages.HomePage />
      </Route>
      <Route path="/terms" exact strict>
        <DefaultLayout>
          <Pages.TermsPage />
        </DefaultLayout>
      </Route>
      <Route path="/privacy" exact strict>
        <DefaultLayout>
          <Pages.PrivacyPage />
        </DefaultLayout>
      </Route>
      <Route path="*">
        <DefaultLayout>
          <CorePages.NotFoundPage />
        </DefaultLayout>
      </Route>
    </Switch>
  );
};

export default Routes;
