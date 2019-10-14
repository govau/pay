import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert, Link, Warning, P } from "@pay/web";

import {
  Service,
  GatewayAccountFragment,
  useGetGatewayAccountProductsQuery
} from "../../__generated__/graphql";

const ListPage: React.FC<{
  service: Service;
  gatewayAccount: GatewayAccountFragment;
}> = ({ service, gatewayAccount }) => {
  const { loading, error, data } = useGetGatewayAccountProductsQuery({
    variables: { gatewayAccountId: gatewayAccount.id },
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
          {data.products.length === 0 && (
            <Warning>
              <P>You don’t have any payment links.</P>
            </Warning>
          )}
          <P>
            <Link to={`${url}/create`}>Create a new payment link</Link>
          </P>
          <ul>
            {data.products.map(p => (
              <li key={p.id}>
                <Link to={`/console/services/${service.id}/products/${p.id}`}>
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default ListPage;
