import * as React from "react";
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import {
  desktop,
  Lozenge,
  Strong,
  Container as ContainerComponent
} from "@pay/web";
import { NavLinkActiveClassName } from "@pay/web/components/Link";
import styled, { css } from "@pay/web/styled-components";
import { Ul, NavLink as NavLinkComponent } from "./components";
import withContext from "../../context/withContext";
import { UserContext, UserContextValues } from "../../users";
import { useGetServiceQuery } from "../../console/__generated__/graphql";
import { goLiveStageLabel } from "../../services";

interface PrimaryNavProps {
  authenticated?: boolean;
}

interface Props extends UserContextValues, PrimaryNavProps {}

// Visually align things in a row and centered vertically
const centeredStyles = css`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

// flex parameters here force this part of the nav to stay stretched
// instead of collapsing onto multiple lines (text wrap)
const NavUl = styled(Ul)`
  display: flex;
  flex: 0 0 auto;
`;

const Li = styled.li``;

// Outer container that flips content from vertical to horizontal as
// screen size increases
const Container = styled(ContainerComponent)`
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: flex-start;
  flex-flow: column nowrap;

  @media ${desktop} {
    justify-content: space-between;
    flex-flow: row nowrap;
    align-items: center;
  }
`;

// Info section of the nav bar -- service name, etc
const PageInfo = styled.div`
  ${centeredStyles}
  margin-top: 1rem;

  @media ${desktop} {
    margin-top: 0;
  }
`;

// nav-link section of the nav bar.
// forces contents to scroll on teeny tiny screens (iphone5)
const SubNav = styled.nav`
  ${centeredStyles}
  overflow-x: auto;
`;

// Our background that sits outside the container
const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.payDarkerBlue};
`;

// decoration for active nav link
export const NavLink = styled(NavLinkComponent)`
  font-size: 1.4rem;
  display: block;
  padding: 1em 0;
  border-bottom: 3px solid transparent;

  ${Li} + ${Li} & {
    margin-left: 1em;
  }

  &.${NavLinkActiveClassName} {
    border-bottom: 3px solid ${props => props.theme.colors.dtaBlue};
  }
`;

// Change out the nav to this while we're in /platform-admin
const PlatformAdminNav: React.FC = () => (
  <Container>
    <PageInfo>
      <Lozenge variation="pink">
        <Strong>Platform admin</Strong>
      </Lozenge>
    </PageInfo>
    <SubNav>
      <NavUl>
        <Li>
          <NavLink to="/platform-admin/organisations">Organisations</NavLink>
        </Li>
        <Li>
          <NavLink to="/platform-admin/services">Services</NavLink>
        </Li>
        <Li>
          <NavLink to="/platform-admin/card-types">Card types</NavLink>
        </Li>
      </NavUl>
    </SubNav>
  </Container>
);

// NonServiceInfoNav is shown when in console, inside the context of a service.
const ServiceInfoNav: React.FC = () => {
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
            <NavLink to={url}>Dashboard</NavLink>
          </Li>
          <Li>
            <NavLink to={`${url}/payments`}>Transactions</NavLink>
          </Li>
          <Li>
            <NavLink to={`${url}/payment-links`}>Payment links</NavLink>
          </Li>
          <Li>
            <NavLink to={`${url}/settings`}>Settings</NavLink>
          </Li>
        </NavUl>
      </SubNav>
    </Container>
  );
};

// NonServiceInfoNav is shown when in console, outside the context of a service.
const NonServiceInfoNav: React.FC = () => {
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
            <NavLink to={`${url}/services/create`}>Create new service</NavLink>
          </Li>
        </NavUl>
      </SubNav>
    </Container>
  );
};

// Show the appropriate nav depending on the users' context -- admin, service, signup, ...
const PrimaryNav: React.FC<Props> = ({
  authenticated,
  user: { name, platformAdmin }
}) => {
  if (!authenticated) {
    return null;
  }

  return (
    <Wrapper>
      <Switch>
        <Route path="/platform-admin">
          <PlatformAdminNav />
        </Route>
        <Route path="/console">
          <Switch>
            <Route path="/console/services/:id([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})">
              <ServiceInfoNav />
            </Route>
            <Route path="*">
              <NonServiceInfoNav />
            </Route>
          </Switch>
        </Route>
      </Switch>
    </Wrapper>
  );
};

export default withContext<PrimaryNavProps>(PrimaryNav, UserContext.Consumer);
