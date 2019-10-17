import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { PageContent, Pages as CorePages } from "@pay/web";

import { ProductFragment } from "./__generated__/graphql";
import Layout from "./Layout";
import ProductContext from "./ProductContext";
import ProductPage from "./products/ProductPage";
import PaymentRoutes from "./payments/PaymentRoutes";

const Routes: React.FC = () => {
  const [product, setProduct] = React.useState<null | ProductFragment>(null);

  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;

  return (
    <ProductContext.Provider value={product}>
      <Layout>
        <PageContent>
          <Switch>
            <Route path={`${url}/pay/:productPaymentId`} strict>
              <PaymentRoutes onReceiveProduct={setProduct} />
            </Route>
            <Route path={`${url}/:serviceNameSlug/:nameSlug`} exact strict>
              <ProductPage />
            </Route>
            <Route path="*">
              <CorePages.NotFoundPage />
            </Route>
          </Switch>
        </PageContent>
      </Layout>
    </ProductContext.Provider>
  );
};

export default Routes;
