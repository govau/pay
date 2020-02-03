import React from "react";
import {
  Route,
  Switch,
  useParams,
  useLocation,
  useRouteMatch,
  Redirect
} from "react-router-dom";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert, Pages as CorePages } from "@pay/web";

import { isServerError } from "../apollo-rest-utils";
import {
  PaymentFragment,
  useGetPaymentQuery,
  PaymentStatus,
  PaymentProviderLabel
} from "./__generated__/graphql";
import { isBamboraGatewayAccount } from "../payments";
import BamboraPayPage from "./pages/BamboraPayPage";
import SandboxPayPage from "./pages/SandboxPayPage";
import SuccessPage from "./pages/SuccessPage";

interface Props {
  onReceivePayment(payment: PaymentFragment): void;
}

const PaymentRoutes: React.FC<Props> = ({ onReceivePayment }) => {
  const { paymentId } = useParams<{ paymentId: string }>();
  const location = useLocation();

  const { loading, error, data } = useGetPaymentQuery({
    variables: { id: paymentId },
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

  const { payment, cardTypes } = data;

  onReceivePayment(payment);

  if (payment.status === PaymentStatus.Success && location.pathname === path) {
    return <Redirect to={`${path}/success`} />;
  }

  return (
    <Switch>
      <Route path={`${path}`} exact strict>
        {payment.gatewayAccount.paymentProvider ===
          PaymentProviderLabel.Bambora &&
          isBamboraGatewayAccount(payment.gatewayAccount) && (
            <BamboraPayPage
              path={path}
              gatewayAccount={payment.gatewayAccount}
              payment={payment}
              cardTypes={cardTypes}
            />
          )}
        {payment.gatewayAccount.paymentProvider ===
          PaymentProviderLabel.Sandbox && (
          <SandboxPayPage path={path} payment={payment} />
        )}
      </Route>
      <Route path={`${path}/success`} exact strict>
        <SuccessPage payment={payment} />
      </Route>
      <Route path="*">
        <CorePages.NotFoundPage />
      </Route>
    </Switch>
  );
};

export default PaymentRoutes;
