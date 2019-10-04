import * as React from "react";
import {
  desktop,
  styled,
  Lozenge,
  Strong,
  Container as ContainerComponent
} from "@pay/web";
import { NavLinkActiveClassName } from "@pay/web/components/Link";
import { css } from "@pay/web/styled-components";
import { Ul, NavLink as NavLinkComponent } from "./components";
import withContext from "../../context/withContext";
import { UserContext, UserContextValues } from "../../users";
import { Switch, Route } from "react-router-dom";

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

// Subnav for when a user is accessing a service
const ServiceInfoNav: React.FC<{
  serviceName: string;
  serviceStage?: "Test" | "Live";
}> = ({ serviceName, serviceStage = "Test" }) => (
  <Container>
    <PageInfo>
      <Strong>{serviceName}</Strong>{" "}
      <Lozenge variation="flair">{serviceStage}</Lozenge>
    </PageInfo>
    <SubNav>
      <NavUl>
        <Li>
          <NavLink to="/TODO">Dashboard</NavLink>
        </Li>
        <Li>
          <NavLink to="/TODO">Transactions</NavLink>
        </Li>
        <Li>
          <NavLink to="/TODO">Payment links</NavLink>
        </Li>
        <Li>
          <NavLink to="/TODO">Settings</NavLink>
        </Li>
      </NavUl>
    </SubNav>
  </Container>
);

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
        <Route>
          <ServiceInfoNav serviceName="Passport renewal" />
        </Route>
      </Switch>
    </Wrapper>
  );
};

export default withContext<PrimaryNavProps>(PrimaryNav, UserContext.Consumer);
