import React from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  PageContent,
  PageTitle,
  Loader,
  ErrorAlert,
  Pages as CorePages
} from "@pay/web";

import {
  useGetProductPaymentQuery,
  ProductFragment
} from "./__generated__/graphql";
import { isServerError } from "../apollo-rest-utils";
import * as Pages from "./pages/Pages";
import Layout from "./Layout";
import ProductContext from "./ProductContext";

const PayRoutes: React.FC<{
  onReceiveProduct(product: ProductFragment): void;
}> = ({ onReceiveProduct }) => {
  const { productPaymentId: id } = useParams<{ productPaymentId: string }>();

  const { loading, error, data } = useGetProductPaymentQuery({
    variables: { id },
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

  const is404 =
    error &&
    error.networkError &&
    isServerError(error.networkError) &&
    error.networkError.statusCode === 404;

  if (is404) {
    return <CorePages.NotFoundPage />;
  }

  if (error || !data) {
    return (
      <>
        <Helmet>
          <title>Something went wrong</title>
        </Helmet>
        <PageTitle title="Something went wrong" />
        <ErrorAlert
          title="Unable to retrieve that payment"
          message={error && error.message}
          showError
        />
      </>
    );
  }

  onReceiveProduct(data.productPayment.product);

  return <Pages.PayFormPage path={url} payment={data.productPayment} />;
};

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
            <Route path={`${url}`} exact strict>
              <Pages.HomePage />
            </Route>
            <Route path={`${url}/pay/:productPaymentId`} strict>
              <PayRoutes onReceiveProduct={setProduct} />
            </Route>
            <Route path={`${url}/:serviceNameSlug/:nameSlug`} exact strict>
              <Pages.ProductPage />
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
