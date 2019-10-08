import * as React from "react";
import { Switch, Route } from "react-router-dom";
import {
  styled,
  styledComponents,
  Container,
  Lozenge,
  desktop
} from "@pay/web";
import { PrimaryHeader, PrimaryNav, Link as LinkComponent } from "./components";
import Wordmark from "./Wordmark";
import {
  withCheckAuth,
  CheckAuthProps
} from "../../auth/__generated__/graphql";
import Coat from "./Coat";
import { HamburgerIcon } from "../../components/icons/HamburgerIcon";
import { CrossIcon } from "../../components/icons/CrossIcon";
import withContext from "../../context/withContext";
import { UserContext, UserContextValues } from "../../users";
import { fromGQLUser } from "../../users/graphql";
import { ServiceInfoNav, NonServiceInfoNav } from "../../console/HeaderNav";
import PlatformAdminNav from "../../platform-admin/HeaderNav";

const { ThemeProvider } = styledComponents;

const Link = styled(LinkComponent)`
  font-weight: 700;
  font-size: 1.4rem;
`;

// arrange main layout horizontal or vertical based on screen size
const PrimaryContainer = styled(Container)`
  display: flex;
  flex-flow: column nowrap;

  @media ${desktop} {
    flex-flow: row nowrap;
    justify-content: space-between;
  }
`;

// this part of the header always stays, does not collapse {coa, logo}
const VisibleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

// link around logo
const HeaderLink = styled(LinkComponent)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

interface NavProps {
  visible?: boolean;
}

const Nav = styled.div<NavProps>`
  display: ${props => (props.visible ? "flex" : "none")};
  flex-flow: column nowrap;
  margin-top: 1.5rem;

  @media ${desktop} {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    margin-top: 0;

    ${Link} + ${Link} {
      margin-left: 1em;
    }
  }
`;

// hide the menu while we're on desktop
const Menu = styled.div`
  color: ${props => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.5rem;
  width: 41px;

  svg {
    margin-bottom: 0.3rem;
  }

  &:hover {
    cursor: pointer;
  }

  @media ${desktop} {
    display: none;
  }
`;

const CoaLogo = styled(Coat)`
  height: 5.5rem;
`;

interface Props extends UserContextValues, CheckAuthProps {}

const Header: React.FC<Props> = ({ data, user, setUser }) => {
  const [isNavVisible, setIsNavVisible] = React.useState(false);

  React.useEffect(() => {
    const checkAuthResp = data.checkAuth;

    if (checkAuthResp && checkAuthResp.user) {
      setUser(fromGQLUser(checkAuthResp.user));
    }
  });

  const checkAuth = data && data.checkAuth;

  const isAuthenticated = checkAuth && checkAuth.is_authenticated;

  const isPlatformAdmin =
    checkAuth && checkAuth.user && checkAuth.user.platform_admin;

  return (
    <ThemeProvider
      theme={theme => ({
        ...theme,
        linkColor: theme.colors.white
      })}
    >
      <React.Fragment>
        <PrimaryHeader>
          <PrimaryContainer>
            <VisibleWrapper>
              <HeaderLink to="/">
                <CoaLogo />
                <Wordmark />
                <Lozenge variation="light">Beta</Lozenge>
              </HeaderLink>

              <Menu onClick={() => setIsNavVisible(!isNavVisible)}>
                {isNavVisible ? <CrossIcon /> : <HamburgerIcon />}
              </Menu>
            </VisibleWrapper>

            {isAuthenticated ? (
              <Nav visible={isNavVisible}>
                <Link to="/console">Services</Link>
                <Link to="/console/profile">Profile</Link>
                <Link to="/docs">Documentation</Link>

                {isPlatformAdmin ? (
                  <Link to="/platform-admin">Platform admin</Link>
                ) : null}

                <Link to="/auth/signout">Sign out</Link>
              </Nav>
            ) : (
              <Nav visible={isNavVisible}>
                <Link to="/TODO">About</Link>
                <Link to="/TODO">Get started</Link>
                <Link to="/TODO">Documentation</Link>
                <Link to="/auth/signin">Sign in</Link>
              </Nav>
            )}
          </PrimaryContainer>
        </PrimaryHeader>

        {/* Show the appropriate nav depending on the users' context -- admin, service, signup, ... */}
        {isAuthenticated ? (
          <PrimaryNav>
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
          </PrimaryNav>
        ) : null}
      </React.Fragment>
    </ThemeProvider>
  );
};

export default withContext(
  withCheckAuth<Props>({})(Header),
  UserContext.Consumer
);
