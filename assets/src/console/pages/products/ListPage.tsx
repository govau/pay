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
  Service,
  GatewayAccountFragment,
  useGetProductsQuery
} from "../../__generated__/graphql";

const ListPage: React.FC<{
  service: Service;
  gatewayAccount: GatewayAccountFragment;
}> = ({ service, gatewayAccount }) => {
  const { loading, error, data } = useGetProductsQuery({
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
            {data.products.length === 0 && (
              <Warning>
                <P>You don’t have any payment links.</P>
              </Warning>
            )}
            <P>
              <Link to={`${url}/create`}>Create a new payment link</Link>
            </P>
            <ul>
              {data.products.map(
                ({ id, name, name_slug, service_name_slug }, _) => (
                  <li key={id}>
                    <Link to={`/console/services/${service.id}/products/${id}`}>
                      {name}
                    </Link>
                    —
                    <Link to={`/products/${service_name_slug}/${name_slug}`}>
                      /payments/{service_name_slug}/{name_slug}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </TODO>
    </>
  );
};

export default ListPage;
