import * as React from "react";
import { Menu, MenuButton, State } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { ArrowIcon, styledComponents, Container, mobile } from "@pay/web";
import {
  Wrapper,
  PrimaryHeader,
  Link,
  PrimaryNavWrapper,
  Navbar
} from "./components";
import COA from "./CoatWithText";
import { withCheckAuth, CheckAuthProps } from "../../__generated__/graphql";
import SignoutButton from "./SignoutButton";
import { MessagesIcon } from "../../components/icons/MessagesIcon";
import { ServicesIcon } from "../../components/icons/ServicesIcon";
import { UserIcon } from "../../components/icons/UserIcon";

import { Brand } from "./Brand";
import withContext from "../../context/withContext";
import { UserContext, UserContextValues } from "../../users";

const PrimaryContainer = styledComponents.styled(Container)`
  padding: 0;
`;

const WordmarkLink = styledComponents.styled(Link)`
  text-decoration: none;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto 1rem 0;

  &:hover {
    text-decoration: none;
  }

  span {
    @media ${mobile} {
      display: none;
    }
  }
`;

const StyledMenuButton = styledComponents.styled(MenuButton)`
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.black};
  padding: 0 2rem;
  border: none;
  border-left: 1px solid ${props => props.theme.colors.darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;
  }

  svg {
    margin-right: 0.5rem;
  }

  ${ArrowIcon} {
    margin-top: 0.8rem;
    margin-left: 0.2rem;
  }
`;

const ButtonGroup = styledComponents.styled.div`
  display: flex;
  align-items: center;
`;

const { ThemeProvider } = styledComponents;

interface Props extends UserContextValues, CheckAuthProps {}

const Header: React.FC<Props> = ({ data }) => {
  const isAuthenticated =
    data && data.checkAuth && data.checkAuth.isAuthenticated;

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
            <WordmarkLink to="/">
              <COA stretched />
            </WordmarkLink>

            <Menu>
              {({ isOpen }: State) => (
                <>
                  <StyledMenuButton>
                    <MessagesIcon />
                    Messages
                  </StyledMenuButton>
                </>
              )}
            </Menu>

            <Menu>
              {({ isOpen }: State) => (
                <>
                  <StyledMenuButton>
                    <ServicesIcon />
                    Services
                  </StyledMenuButton>
                </>
              )}
            </Menu>

            {isAuthenticated && (
              <Menu>
                {({ isOpen }: State) => (
                  <>
                    <StyledMenuButton>
                      <UserIcon />
                      Alex
                    </StyledMenuButton>
                  </>
                )}
              </Menu>
            )}
            <ButtonGroup>
              {data.loading ? null : isAuthenticated ? (
                <SignoutButton />
              ) : (
                <Link to="/signin">Sign in</Link>
              )}
            </ButtonGroup>
          </PrimaryContainer>
        </PrimaryHeader>

        <Navbar visible={true}>
          <Container>
            <PrimaryNavWrapper>
              <Brand />
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
