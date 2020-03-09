import * as React from "react";
import { Switch, Route } from "react-router-dom";
import {
  styled,
  styledComponents,
  Container,
  Lozenge,
  desktop
} from "@pay/web";
import {
  PrimaryHeader,
  PrimaryNav,
  Link as LinkComponent,
  Button as ButtonComponent
} from "./components";
import Wordmark from "./Wordmark";
import Coat from "./Coat";
import { HamburgerIcon } from "../../components/icons/HamburgerIcon";
import { CrossIcon } from "../../components/icons/CrossIcon";
import { usePayUser } from "../../users";
import { ServiceInfoNav, NonServiceInfoNav } from "../../console/HeaderNav";
import PlatformAdminNav from "../../platform-admin/HeaderNav";
import { useAuth0 } from "../../auth/AuthContext";

const { ThemeProvider } = styledComponents;

export const Link = styled(LinkComponent)`
  font-weight: 700;
  font-size: 1.4rem;
`;

export const Button = styled(ButtonComponent)`
  font-weight: 700;
  font-size: 1.4rem;
`;

// arrange main layout horizontal or vertical based on screen size
export const PrimaryContainer = styled(Container)`
  display: flex;
  flex-flow: column nowrap;

  @media ${desktop} {
    flex-flow: row nowrap;
    justify-content: space-between;
  }
`;

// this part of the header always stays, does not collapse {coa, logo}
export const VisibleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`;

// link around logo
export const HeaderLink = styled(LinkComponent)`
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

export const Nav = styled.ul<NavProps>`
  display: ${props => (props.visible ? "flex" : "none")};
  flex-flow: column nowrap;
  margin: 1.5rem 0 0 0;
  padding: 0;

  @media ${desktop} {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    margin-top: 0;

    > li + li {
      margin-left: 1em;
    }
  }

  > li {
    display: block;
  }
`;

// hide the menu while we're on desktop
export const Menu = styled.div`
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

export const CoaLogo = styled(Coat)`
  width: 71.8438px; /* IE11 inline svg fix */
  height: 5.5rem;
`;

const Header: React.FC = () => {
  const [isNavVisible, setIsNavVisible] = React.useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const userMe = usePayUser();

  const isPlatformAdmin = userMe && userMe.platformAdmin;

  return (
    <ThemeProvider
      theme={theme => ({
        ...theme,
        linkColor: theme.colors.white
      })}
    >
      <>
        <PrimaryHeader>
          <PrimaryContainer>
            <VisibleWrapper>
              <HeaderLink to="/">
                <CoaLogo />
                <Wordmark />
                <Lozenge variant="light">Beta</Lozenge>
              </HeaderLink>

              <Menu onClick={() => setIsNavVisible(!isNavVisible)}>
                {isNavVisible ? <CrossIcon /> : <HamburgerIcon />}
              </Menu>
            </VisibleWrapper>

            {isAuthenticated ? (
              <Nav visible={isNavVisible}>
                <li>
                  <Link to="/console">Services</Link>
                </li>
                <li>
                  <Link to="/console/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/docs">Documentation</Link>
                </li>
                {isPlatformAdmin ? (
                  <li>
                    <Link to="/platform-admin">Platform admin</Link>
                  </li>
                ) : null}
                <li>
                  <Button
                    variant="link"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Sign out
                  </Button>
                </li>
              </Nav>
            ) : (
              <Nav visible={isNavVisible}>
                <li>
                  <Link to="/TODO">About</Link>
                </li>
                <li>
                  <Link to="/TODO">Get started</Link>
                </li>
                <li>
                  <Link to="/docs">Documentation</Link>
                </li>
                <li>
                  <Button variant="link" onClick={() => loginWithRedirect()}>
                    Sign in
                  </Button>
                </li>
              </Nav>
            )}
          </PrimaryContainer>
        </PrimaryHeader>

        {isAuthenticated ? (
          <PrimaryNav>
            <Switch>
              {isPlatformAdmin ? (
                <Route path="/platform-admin">
                  <PlatformAdminNav />
                </Route>
              ) : null}
              <Route path="/console">
                <Switch>
                  <Route path="/console/services/:serviceId([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})">
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
      </>
    </ThemeProvider>
  );
};

export default Header;
