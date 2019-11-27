import * as React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { Lozenge, Strong } from "@pay/web";
import {
  Container,
  PageInfo,
  SubNav,
  NavUl,
  NavLink
} from "../layout/Header/PrimaryNav";
import {
  useGetServiceWithGatewayAccountsQuery,
  GatewayAccountType,
  GatewayAccountFragment
} from "./__generated__/graphql";
import { goLiveStageLabel } from "../services";

// ServiceInfoNav is shown when in console, inside the context of a service.
export const ServiceInfoNav: React.FC = () => {
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

  if (loading || error || !data) {
    return null;
  }

  let gatewayAccount: GatewayAccountFragment | null = null;
  if (data.service.gatewayAccounts && data.service.gatewayAccounts.length > 0) {
    const live = data.service.gatewayAccounts.filter(
      ga => ga.type === GatewayAccountType.Live
    );
    if (live.length > 0) {
      gatewayAccount = live[0];
    } else {
      gatewayAccount = data.service.gatewayAccounts[0];
    }
  }

  return (
    <Container>
      <PageInfo>
        <Strong>{data.service.name}</Strong>{" "}
        <Lozenge variant="flair">
          {goLiveStageLabel(data.service.currentGoLiveStage)}
        </Lozenge>
      </PageInfo>
      <SubNav>
        <NavUl>
          <li>
            <NavLink to={url} exact>
              Dashboard
            </NavLink>
          </li>
          {gatewayAccount && (
            <>
              <li>
                <NavLink
                  to={`${url}/gateway-accounts/${gatewayAccount.externalId}/payments`}
                >
                  Transactions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${url}/gateway-accounts/${gatewayAccount.externalId}/products`}
                >
                  Payment links
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to={`${url}/settings`}
              exact
              isActive={(match, location) =>
                [`${url}/settings`, `${url}/edit-name`, `${url}/team`].includes(
                  location.pathname
                ) ||
                (gatewayAccount
                  ? location.pathname.startsWith(
                      `${url}/gateway-accounts/${gatewayAccount.externalId}/credentials`
                    )
                  : false)
              }
            >
              Settings
            </NavLink>
          </li>
        </NavUl>
      </SubNav>
    </Container>
  );
};

// NonServiceInfoNav is shown when in console, outside the context of a service.
export const NonServiceInfoNav: React.FC = () => (
  <Container>
    <PageInfo />
    <SubNav>
      <NavUl>
        <li>
          <NavLink to="/console/services/create" exact>
            Create new service
          </NavLink>
        </li>
      </NavUl>
    </SubNav>
  </Container>
);
