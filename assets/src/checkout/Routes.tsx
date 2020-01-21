import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Pages as CorePages } from "@pay/web";

import { PaymentFragment } from "./__generated__/graphql";
import Layout from "./Layout";
import PaymentContext from "./PaymentContext";
import PaymentRoutes from "./PaymentRoutes";

const Routes: React.FC = () => {
  const [payment, setPayment] = React.useState<null | PaymentFragment>(null);

  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url: path } = match;

  return (
    <PaymentContext.Provider value={payment}>
      <Layout>
        <Switch>
          <Route
            path={`${path}/:paymentId([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})`}
            strict
          >
            <PaymentRoutes onReceivePayment={setPayment} />
          </Route>
          <Route path="*">
            <CorePages.NotFoundPage />
          </Route>
        </Switch>
      </Layout>
    </PaymentContext.Provider>
  );
};

export default Routes;
