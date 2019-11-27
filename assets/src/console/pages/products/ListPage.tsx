import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  TODO,
  PageTitle,
  Loader,
  ErrorAlert,
  Link,
  Warning,
  P
} from "@pay/web";

import {
  GatewayAccountFragment,
  useGetProductsQuery
} from "../../__generated__/graphql";

const flatMap = <X, Y>(fx: (value: X) => Y[], xs: X[]): Y[] =>
  Array.prototype.concat(...xs.map(fx));

export interface props {
  service: { externalId: string; name: string };
  gatewayAccount: GatewayAccountFragment;
}

const ListPage: React.FC<props> = ({ service, gatewayAccount }) => {
  const { loading, error, data } = useGetProductsQuery({
    variables: { serviceID: service.externalId },
    errorPolicy: "all"
  });

  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;

  return (
    <>
      <Helmet>
        <title>Payment links - {service.name}</title>
      </Helmet>
      <PageTitle title="Payment links" />
      <TODO>
        {loading ? (
          <Loader message="Loading payment links" />
        ) : error || !data ? (
          <ErrorAlert
            title="Unable to retrieve payment links"
            message={error && error.message}
            showError
          />
        ) : (
          <>
            {flatMap(
              gatewayAccount => gatewayAccount.products,
              data.service.gatewayAccounts
            ).length === 0 && (
              <Warning>
                <P>You don’t have any payment links.</P>
              </Warning>
            )}
            <P>
              <Link to={`${url}/create`}>Create a new payment link</Link>
            </P>
            <ul>
              {flatMap(
                gatewayAccount => gatewayAccount.products,
                data.service.gatewayAccounts
              ).map(({ externalId, name, nameSlug, serviceNameSlug }, _) => (
                <li key={externalId}>
                  <Link
                    to={`/console/services/${service.externalId}/products/${externalId}`}
                  >
                    {name}
                  </Link>
                  —
                  <Link to={`/products/${serviceNameSlug}/${nameSlug}`}>
                    /payments/{serviceNameSlug}/{nameSlug}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </TODO>
    </>
  );
};

export default ListPage;
