import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { Loader, ErrorAlert, Pages as CorePages } from "@pay/web";

import * as Pages from "./pages/Pages";
import { useGetServiceQuery } from "./__generated__/graphql";

const ServicesRoutes: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useGetServiceQuery({
    variables: { id },
    errorPolicy: "all"
  });

  const match = useRouteMatch("");
  if (!match) {
    return null;
  }
  const { url } = match;

  if (loading) {
    return <Loader message="Loading service" />;
  }
  if (error || !data) {
    return (
      <ErrorAlert
        title="Unable to retrieve service"
        message={error && error.message}
        showError
      />
    );
  }

  return (
    <Switch>
      <Route path={`${url}`} exact strict>
        <Pages.Services.DashboardPage service={data.service} />
      </Route>
      <Route path={`${url}/edit-name`} exact strict>
        <Pages.Services.EditNamePage service={data.service} />
      </Route>
      <Route path={`${url}/team`} exact strict>
        <Pages.Services.TeamPage service={data.service} />
      </Route>
      <Route path="*">
        <CorePages.NotFoundPage />
      </Route>
    </Switch>
  );
};

export default ServicesRoutes;
