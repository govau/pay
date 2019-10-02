import * as React from "react";
import { styled, styledComponents, Container, Strong, desktop } from "@pay/web";
import { SecondaryLozenge } from "@pay/web/components/Lozenge";
import { PrimaryHeader, Link as LinkComponent } from "./components";
import PrimaryNav from "./PrimaryNav";
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

// the wordmark is just pixel-pushed text for now
const Wordmark = styled.div`
  margin-top: -5px;
  font-size: 3rem;

  * + & {
    margin-left: 1em;
  }
`;

const { ThemeProvider } = styledComponents;

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
                <Wordmark>
                  <Strong>pay</Strong>.gov.au
                </Wordmark>
                <SecondaryLozenge>Beta</SecondaryLozenge>
              </HeaderLink>

              <Menu onClick={() => setIsNavVisible(!isNavVisible)}>
                {isNavVisible ? <CrossIcon /> : <HamburgerIcon />}
              </Menu>
            </VisibleWrapper>

            {isAuthenticated ? (
              <Nav visible={isNavVisible}>
                <Link to="/console">Console</Link>
                <Link to="/TODO">Services</Link>
                <Link to="/TODO">Profile</Link>
                <Link to="/TODO">Documentation</Link>

                {isPlatformAdmin ? (
                  <Link to="/platform-admin">Platform admin</Link>
                ) : null}

                <Link to="/TODO">Sign out</Link>
              </Nav>
            ) : (
              <Nav visible={isNavVisible}>
                <Link to="/TODO">About</Link>
                <Link to="/TODO">Get started</Link>
                <Link to="/TODO">Documentation</Link>
                <Link to="/TODO">Sign in</Link>
              </Nav>
            )}
          </PrimaryContainer>
        </PrimaryHeader>

        <PrimaryNav authenticated={isAuthenticated} />
      </React.Fragment>
    </ThemeProvider>
  );
};

export default withContext(
  withCheckAuth<Props>({})(Header),
  UserContext.Consumer
);
