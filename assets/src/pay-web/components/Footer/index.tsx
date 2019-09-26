import * as React from "react";

import styled, { ThemeProvider } from "../../styled-components";
import Container from "../Container";
import { Link, LinkProps } from "../Link";
import { desktop } from "../../media";
import COA from "./Coat";

const FooterElement = styled.footer`
  margin-top: 4rem;
`;

const Wrapper = styled.section`
  padding: 3rem 0 1rem;
  color: ${props => props.theme.footer.textColor};
  background-color: ${props => props.theme.footer.bgColor};
  border-top: 3px solid ${props => props.theme.colors.midGrey};
`;

const SecondWrapper = styled(Wrapper)`
  padding: 3rem 0;
  border-top-width: 1px;
`;

const License = styled.section`
  display: flex;
  flex-flow: column nowrap;

  @media ${desktop} {
    flex-direction: row;
    align-items: center;
  }
`;

const Coat = styled.div`
  flex: 1;

  svg {
    width: 120px;
  }

  svg .a {
    fill: ${props => props.theme.footer.textColor};
  }
`;

const LicenseText = styled.div`
  font-size: 1.4rem;
  flex: 3;
  margin-top: 2rem;

  @media ${desktop} {
    margin-top: 0;
  }
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  column-count: 2;
  column-gap: 0;

  @media ${desktop} {
    column-count: 4;
  }
`;

const NavListItem = styled.li`
  padding-bottom: 2rem;
`;

const NavWrapper = styled.nav``;

const Nav: React.FC<{}> = props => (
  <NavWrapper>
    <NavList {...props} />
  </NavWrapper>
);

const NavItem: React.FC<LinkProps> = props => (
  <NavListItem>
    <Link {...props} />
  </NavListItem>
);

interface Props {}

const Footer: React.FC<Props> = props => (
  <ThemeProvider
    theme={theme => ({
      ...theme,
      linkColor: theme.footer.textColor
    })}
  >
    <FooterElement role="contentinfo">
      <Wrapper>
        <Container>
          <Nav>
            <NavItem to="/">About Pay.gov.au</NavItem>
            <NavItem to="/contact">Contact us</NavItem>
            <NavItem to="/terms">Terms of use</NavItem>
            <NavItem to="/privacy">Privacy</NavItem>
            <NavItem to="/">Copyright</NavItem>
            <NavItem to="/">Security</NavItem>
            <NavItem to="/">Accessibility</NavItem>
            <NavItem to="/">Help</NavItem>
          </Nav>
        </Container>
      </Wrapper>

      <SecondWrapper>
        <Container>
          <License>
            <Coat>
              <COA />
            </Coat>
            <LicenseText>
              © Commonwealth of Australia. With the exception of the
              Commonwealth Coat of Arms and where otherwise noted, this work is
              licensed under the <Link to="/">MIT License</Link>.
            </LicenseText>
          </License>
        </Container>
      </SecondWrapper>
    </FooterElement>
  </ThemeProvider>
);

export default Footer;
