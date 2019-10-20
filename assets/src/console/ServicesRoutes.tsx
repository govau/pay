import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { Loader, ErrorAlert, Pages as CorePages } from "@pay/web";

import * as Pages from "./pages/Pages";
import {
  Service,
  useGetServiceWithGatewayAccountsQuery,
  useGetGatewayAccountQuery
} from "./__generated__/graphql";

const GatewayAccountsRoutes: React.FC<{
  service: Service;
}> = ({ service }) => {
  const { gatewayAccountId } = useParams<{ gatewayAccountId: string }>();

  const { loading, error, data } = useGetGatewayAccountQuery({
    variables: { id: gatewayAccountId },
    errorPolicy: "all"
  });

  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;

  if (loading) {
    return <Loader message="Loading gateway account" />;
  }
  if (error || !data) {
    return (
      <ErrorAlert
        title="Unable to retrieve gateway account"
        message={error && error.message}
        showError
      />
    );
  }

  return (
    <Switch>
      <Route path={`${url}/payments`} exact strict>
        <Pages.Services.GatewayAccounts.PaymentsPage
          service={service}
          gatewayAccount={data.gatewayAccount}
        />
      </Route>
      <Route path={`${url}/credentials`} exact strict>
        <Pages.Services.GatewayAccounts.CredentialsPage
          service={service}
          gatewayAccount={data.gatewayAccount}
        />
      </Route>
      <Route path={`${url}/products`} strict>
        <Switch>
          <Route path={`${url}/products`} exact strict>
            <Pages.Services.GatewayAccounts.Products.ListPage
              service={service}
              gatewayAccount={data.gatewayAccount}
            />
          </Route>
          <Route path={`${url}/products/create`} strict>
            <Switch>
              <Route path={`${url}/products/create`} exact strict>
                <Pages.Services.GatewayAccounts.Products.CreateStartPage />
              </Route>
              <Route path="*">
                <Pages.Services.GatewayAccounts.Products.CreateFormPage
                  serviceName={service.name}
                  gatewayAccountId={gatewayAccountId}
                  productsPath={`${url}/products`}
                  path={`${url}/products/create`}
                />
              </Route>
            </Switch>
          </Route>
          <Route path="*">
            <CorePages.NotFoundPage />
          </Route>
        </Switch>
      </Route>
      <Route path="*">
        <CorePages.NotFoundPage />
      </Route>
    </Switch>
  );
};

const ServicesRoutes: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  const { loading, error, data } = useGetServiceWithGatewayAccountsQuery({
    variables: { id: serviceId },
    errorPolicy: "all"
  });

  const match = useRouteMatch();
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
      <Route path={`${url}/settings`} exact strict>
        <Pages.Services.SettingsPage service={data.service} />
      </Route>
      <Route path={`${url}/edit-name`} exact strict>
        <Pages.Services.EditNamePage service={data.service} />
      </Route>
      <Route path={`${url}/team`} exact strict>
        <Pages.Services.TeamPage service={data.service} />
      </Route>
      <Route
        path={`${url}/gateway-accounts/:gatewayAccountId([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})`}
        strict
      >
        <GatewayAccountsRoutes service={data.service} />
      </Route>
      <Route path="*">
        <CorePages.NotFoundPage />
      </Route>
    </Switch>
  );
};

export default ServicesRoutes;
