import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { Loader, ErrorAlert, Pages as CorePages } from "@pay/web";

import * as Pages from "./pages/Pages";
import {
  Service,
  GatewayAccountFragment,
  useGetServiceWithGatewayAccountsQuery,
  useGetGatewayAccountQuery,
  useGetPaymentQuery
} from "./__generated__/graphql";

const PaymentRoutes: React.FC<{
  service: Service;
  gatewayAccount: GatewayAccountFragment;
}> = ({ service, gatewayAccount }) => {
  const { paymentId } = useParams<{ paymentId: string }>();

  const { loading, error, data } = useGetPaymentQuery({
    variables: { id: paymentId },
    errorPolicy: "all"
  });

  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;

  if (loading) {
    return <Loader message="Loading payment" />;
  }
  if (error || !data) {
    return (
      <ErrorAlert
        title="Unable to retrieve payment"
        message={error && error.message}
        showError
      />
    );
  }

  return (
    <Switch>
      <Route path={`${url}`} exact strict>
        <Pages.Services.GatewayAccounts.Payments.DetailPage
          service={service}
          gatewayAccount={gatewayAccount}
          payment={data.payment}
        />
      </Route>
      <Route path="*">
        <CorePages.NotFoundPage />
      </Route>
    </Switch>
  );
};

const GatewayAccountCredentialsRoutes: React.FC<{
  service: Service;
  gatewayAccount: GatewayAccountFragment;
}> = ({ service, gatewayAccount }) => {
  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url: path } = match;

  return (
    <Switch>
      <Route path={`${path}`} exact strict>
        <Pages.Services.GatewayAccounts.Credentials.IndexPage
          path={path}
          service={service}
          gatewayAccount={gatewayAccount}
        />
      </Route>
      <Route path={`${path}/edit`} exact strict>
        <Pages.Services.GatewayAccounts.Credentials.EditPage
          path={path}
          service={service}
          gatewayAccount={gatewayAccount}
        />
      </Route>
      <Route path="*">
        <CorePages.NotFoundPage />
      </Route>
    </Switch>
  );
};

const GatewayAccountRoutes: React.FC<{
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
      <Route path={`${url}/payments`} strict>
        <Switch>
          <Route path={`${url}/payments`} exact strict>
            <Pages.Services.GatewayAccounts.Payments.ListPage
              path={`${url}/payments`}
              service={service}
              gatewayAccount={data.gatewayAccount}
            />
          </Route>
          <Route
            path={`${url}/payments/:paymentId([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})`}
            strict
          >
            <PaymentRoutes
              service={service}
              gatewayAccount={data.gatewayAccount}
            />
          </Route>
          <Route path="*">
            <CorePages.NotFoundPage />
          </Route>
        </Switch>
      </Route>
      <Route path={`${url}/credentials`} strict>
        <GatewayAccountCredentialsRoutes
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

const ServiceRoutes: React.FC = () => {
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
        <GatewayAccountRoutes service={data.service} />
      </Route>
      <Route path="*">
        <CorePages.NotFoundPage />
      </Route>
    </Switch>
  );
};

export default ServiceRoutes;
