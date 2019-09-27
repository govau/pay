import * as React from "react";
import { styledComponents, Container, mobile, tablet } from "@pay/web";
import {
  Wrapper,
  PrimaryHeader,
  Logos,
  Link,
  PrimaryNavWrapper,
  Navbar
} from "./components";
import PrimaryNav from "./PrimaryNav";
import { Wordmark } from "./Wordmark";
import {
  withCheckAuth,
  CheckAuthProps
} from "../../auth/__generated__/graphql";
import SignoutButton from "./SignoutButton";
import Coat from "./Coat";
import { HamburgerIcon } from "../../components/icons/HamburgerIcon";
import { CrossIcon } from "../../components/icons/CrossIcon";
import withContext from "../../context/withContext";
import { UserContext, UserContextValues } from "../../users";
import { fromGQLUser } from "../../users/graphql";
import { BetaTag } from "../../components/BetaTag";

const PrimaryContainer = styledComponents.styled(Container)`
  padding: 0 1rem;
  display: flex;
  justify-content: "space-between";

  @media ${tablet} {
    padding: 0 2rem;
    justify-content: "flex-start";
  }
`;

const HeaderLink = styledComponents.styled(Link)`
  display: flex;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  span {
    @media ${mobile} {
      display: none;
    }
  }
`;

const HamburgerMenu = styledComponents.styled.div`
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

  @media ${tablet} {
    display: none;
  }
`;

const Coa = styledComponents.styled.div`
  display: none;

  @media ${tablet} {
    display: inherit;
  }
`;

const CoaLogo = styledComponents.styled(Coat)`
  height: 6rem;
`;

const CoaText = styledComponents.styled.span`
  color: ${props => props.theme.colors.white};
  border-right: solid 1px ${props => props.theme.colors.white};
  padding: 1.5rem;
  margin-right: 1.5rem;
  align-self: center;
`;

const ButtonGroup = styledComponents.styled.div`
  display: flex;
  align-items: center;

  @media ${tablet} {
    margin-left: auto;
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

  const isAuthenticated =
    data && data.checkAuth && data.checkAuth.is_authenticated;

  return (
    <ThemeProvider
      theme={theme => ({
        ...theme,
        linkColor: theme.colors.white
      })}
    >
      <Wrapper>
        <PrimaryHeader>
          <PrimaryContainer>
            <HamburgerMenu onClick={() => setIsNavVisible(!isNavVisible)}>
              {isNavVisible ? <CrossIcon /> : <HamburgerIcon />}
              {isNavVisible ? "Close" : "Menu"}
            </HamburgerMenu>
            <HeaderLink to="/">
              <Coa>
                <CoaLogo />
                <CoaText>Australian Government</CoaText>
              </Coa>
              <Logos>
                <Wordmark />
                <BetaTag white />
              </Logos>
            </HeaderLink>
            <ButtonGroup>
              {data.loading ? null : isAuthenticated ? (
                <SignoutButton />
              ) : (
                <Link to="/auth/signin">Sign in</Link>
              )}
            </ButtonGroup>
          </PrimaryContainer>
        </PrimaryHeader>

        <Navbar visible={isNavVisible}>
          <Container>
            <PrimaryNavWrapper>
              <PrimaryNav
                authenticated={isAuthenticated}
                onHandleNavigate={() => setIsNavVisible(false)}
              />
            </PrimaryNavWrapper>
          </Container>
        </Navbar>
      </Wrapper>
    </ThemeProvider>
  );
};

export default withContext(
  withCheckAuth<Props>({})(Header),
  UserContext.Consumer
);
