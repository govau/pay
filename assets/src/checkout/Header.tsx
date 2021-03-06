import * as React from "react";
import { styledComponents, Lozenge, Strong } from "@pay/web";
import {
  PrimaryContainer,
  VisibleWrapper,
  HeaderLink,
  CoaLogo,
  Menu,
  Nav,
  Link
} from "../layout/Header";
import { PrimaryHeader, PrimaryNav } from "../layout/Header/components";
import Wordmark from "../layout/Header/Wordmark";
import { Container, PageInfo } from "../layout/Header/PrimaryNav";
import { HamburgerIcon } from "../components/icons/HamburgerIcon";
import { CrossIcon } from "../components/icons/CrossIcon";
import PaymentContext from "./PaymentContext";
import { GatewayAccountType } from "../__generated__/schema";

const { ThemeProvider } = styledComponents;

interface Props {}

const Header: React.FC<Props> = () => {
  const [isNavVisible, setIsNavVisible] = React.useState(false);

  const payment = React.useContext(PaymentContext);

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
            <Nav visible={isNavVisible}>
              <li>
                <Link to="/TODO">Help</Link>
              </li>
            </Nav>
          </PrimaryContainer>
        </PrimaryHeader>

        <PrimaryNav>
          <Container>
            <PageInfo>
              {payment ? (
                <>
                  <Strong>{payment.gatewayAccount.serviceName}</Strong>{" "}
                  {payment.gatewayAccount.type === GatewayAccountType.Test && (
                    <Lozenge variant="flair">Test</Lozenge>
                  )}
                </>
              ) : null}
            </PageInfo>
          </Container>
        </PrimaryNav>
      </>
    </ThemeProvider>
  );
};

export default Header;
