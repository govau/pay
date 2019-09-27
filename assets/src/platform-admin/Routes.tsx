import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Pages as CorePages, PageContent } from "@pay/web";

import * as Pages from "./pages/Pages";
import DefaultLayout from "../layout";
import AuthRestrictedPage from "../auth/pages/RestrictedPage";
import RestrictedPage from "./pages/RestrictedPage";

const Routes: React.FC = () => {
  const match = useRouteMatch("");
  if (!match) {
    return null;
  }
  const { url } = match;
  return (
    <DefaultLayout>
      <PageContent>
        <AuthRestrictedPage>
          <RestrictedPage>
            <Switch>
              <Route path={`${url}`} exact strict>
                <Pages.DashboardPage />
              </Route>
              <Route path={`${url}/organisations`} exact strict>
                <Pages.OrganisationsPage />
              </Route>
              <Route path={`${url}/services`} exact strict>
                <Pages.ServicesPage />
              </Route>
              <Route path={`${url}/card-types`} exact strict>
                <Pages.CardTypesPage />
              </Route>
              <Route path="*">
                <CorePages.NotFoundPage />
              </Route>
            </Switch>
          </RestrictedPage>
        </AuthRestrictedPage>
      </PageContent>
    </DefaultLayout>
  );
};

export default Routes;
