import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  PageTitle,
  Loader,
  ErrorAlert,
  Link,
  Warning,
  P,
  styled
} from "@pay/web";

import {
  GatewayAccountFragment,
  useGetProductsQuery
} from "../../__generated__/graphql";
import { SidebarLayout } from "../../../checkout/components/Split";

const flatMap = <X, Y>(fx: (value: X) => Y[], xs: X[]): Y[] =>
  Array.prototype.concat(...xs.map(fx));

export interface props {
  service: { externalId: string; name: string };
  gatewayAccount: GatewayAccountFragment;
}

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Li = styled.li`
  margin: 1rem 0 3rem;
  ${P} {
    font-weight: 700;
    margin-bottom: 0;
  }
`;

const CustomLink = styled(Link)`
  ${Link}
`;

const LinkWrapper = styled.div`
  font-size: 1.3rem;
  ${CustomLink} {
    color: #de0d33;
    margin-right: 2rem;
  }
  ${Link} {
    margin-right: 2rem;
  }
`;

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
      <PageTitle title="Manage payment links" />
      <SidebarLayout
        sidebar={<Link to={`${url}/create`}>Create a payment link</Link>}
      >
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
            ).length === 0 ? (
              <Warning>
                <P>You don’t have any payment links.</P>
              </Warning>
            ) : (
              <>
                <Ul>
                  {flatMap(
                    gatewayAccount => gatewayAccount.products,
                    data.service.gatewayAccounts
                  ).map(
                    ({ externalId, name, nameSlug, serviceNameSlug }, _) => (
                      <Li key={externalId}>
                        <P>{name}</P>
                        <Link to={`/products/${serviceNameSlug}/${nameSlug}`}>
                          https://pay.gov.au/payments/{serviceNameSlug}/
                          {nameSlug}
                        </Link>
                        <LinkWrapper>
                          <Link to={`${url}/edit/${externalId}`}>edit</Link>
                          <CustomLink to="/TODO">disable</CustomLink>
                          <CustomLink to="/TODO">delete</CustomLink>
                        </LinkWrapper>
                      </Li>
                    )
                  )}
                </Ul>
              </>
            )}
          </>
        )}
      </SidebarLayout>
    </>
  );
};

export default ListPage;
