import * as React from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import { Lozenge, Strong } from "@pay/web";
import {
  Container,
  PageInfo,
  SubNav,
  NavUl,
  Li,
  NavLink
} from "../layout/Header/PrimaryNav";
import { useGetServiceQuery } from "../console/__generated__/graphql";
import { goLiveStageLabel } from "../services";

// NonServiceInfoNav is shown when in console, inside the context of a service.
export const ServiceInfoNav: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useGetServiceQuery({
    variables: { id },
    errorPolicy: "all"
  });

  const match = useRouteMatch("");
  if (!match) {
    return null;
  }
  const { url } = match;

  if (loading || error || !data) {
    return null;
  }

  return (
    <Container>
      <PageInfo>
        <Strong>{data.service.name}</Strong>{" "}
        <Lozenge variation="flair">
          {goLiveStageLabel(data.service.current_go_live_stage)}
        </Lozenge>
      </PageInfo>
      <SubNav>
        <NavUl>
          <Li>
            <NavLink to={url} exact>
              Dashboard
            </NavLink>
          </Li>
          <Li>
            <NavLink to={`${url}/payments`}>Transactions</NavLink>
          </Li>
          <Li>
            <NavLink to={`${url}/payment-links`}>Payment links</NavLink>
          </Li>
          <Li>
            <NavLink
              to={`${url}/settings`}
              exact
              isActive={(match, location) =>
                [`${url}/settings`, `${url}/edit-name`, `${url}/team`].includes(
                  location.pathname
                )
              }
            >
              Settings
            </NavLink>
          </Li>
        </NavUl>
      </SubNav>
    </Container>
  );
};

// NonServiceInfoNav is shown when in console, outside the context of a service.
export const NonServiceInfoNav: React.FC = () => {
  const match = useRouteMatch("");
  if (!match) {
    return null;
  }
  const { url } = match;

  return (
    <Container>
      <PageInfo />
      <SubNav>
        <NavUl>
          <Li>
            <NavLink to={`${url}/services/create`} exact>
              Create new service
            </NavLink>
          </Li>
        </NavUl>
      </SubNav>
    </Container>
  );
};
