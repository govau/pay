import * as React from "react";
import { Location } from "history";
import { useParams, useRouteMatch, match } from "react-router-dom";
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
  interface Params {
    serviceId: string;
  }

  const { serviceId } = useParams<Params>();

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
  if (
    data.service.gateway_accounts &&
    data.service.gateway_accounts.length > 0
  ) {
    const live = data.service.gateway_accounts.filter(
      ga => ga.type === GatewayAccountType.Live
    );
    if (live.length > 0) {
      gatewayAccount = live[0];
    } else {
      gatewayAccount = data.service.gateway_accounts[0];
    }
  }

  function isActive<Params>(match: match<Params>, location: Location) {
    return (
      [`${url}/settings`, `${url}/edit-name`, `${url}/team`].includes(
        location.pathname
      ) ||
      (gatewayAccount
        ? location.pathname.startsWith(
            `${url}/gateway-accounts/${gatewayAccount.id}/credentials`
          )
        : false)
    );
  }

  return (
    <Container>
      <PageInfo>
        <Strong>{data.service.name}</Strong>{" "}
        <Lozenge variant="flair">
          {goLiveStageLabel(data.service.current_go_live_stage)}
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
                  to={`${url}/gateway-accounts/${gatewayAccount.id}/payments`}
                >
                  Transactions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`${url}/gateway-accounts/${gatewayAccount.id}/products`}
                >
                  Payment links
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to={`${url}/settings`} exact isActive={isActive}>
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
