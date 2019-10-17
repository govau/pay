import * as React from "react";
import {
  useParams,
  useRouteMatch,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert, Pages as CorePages } from "@pay/web";

import { isServerError } from "../../apollo-rest-utils";
import { useGetPaymentQuery, ProductFragment } from "../__generated__/graphql";
import Form from "./Form";
import ReferencePage from "./ReferencePage";
import AmountPage from "./AmountPage";
import SubmitPage from "./SubmitPage";
import StatusPage from "./StatusPage";

const PaymentRoutes: React.FC<{
  onReceiveProduct(product: ProductFragment): void;
}> = ({ onReceiveProduct }) => {
  const { productPaymentId: id } = useParams<{ productPaymentId: string }>();

  const { loading, error, data } = useGetPaymentQuery({
    variables: { id },
    errorPolicy: "all"
  });

  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url: path } = match;

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

  const payment = data.payment;

  onReceiveProduct(payment.product);

  return (
    <Switch>
      <Route path={`${path}/submit`} exact strict>
        <SubmitPage path={path} payment={payment} />
      </Route>
      <Route path={`${path}/status`} exact strict>
        <StatusPage payment={payment} />
      </Route>
      <Route path="*">
        <Form payment={payment}>
          {({ handleSubmit, values }) => (
            <Switch>
              <Route path={path} exact strict>
                <Redirect to={`${path}/reference`} />
              </Route>
              <Route path={`${path}/reference`} exact strict>
                {payment.product.reference_enabled ? (
                  <ReferencePage
                    path={path}
                    payment={payment}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <Redirect to={`${path}/amount`} />
                )}
              </Route>
              <Route path={`${path}/amount`} exact strict>
                <AmountPage
                  path={path}
                  payment={payment}
                  values={values}
                  onSubmit={handleSubmit}
                />
              </Route>
              <Route path="*">
                <CorePages.NotFoundPage />
              </Route>
            </Switch>
          )}
        </Form>
      </Route>
    </Switch>
  );
};

export default PaymentRoutes;
