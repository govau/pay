import { desktop, Container as ContainerComponent } from "@pay/web";
import { NavLinkActiveClassName } from "@pay/web/components/Link";
import styled, { css } from "@pay/web/styled-components";
import { Ul, NavLink as NavLinkComponent } from "./components";

// Visually align things in a row and centered vertically
const centeredStyles = css`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

// flex parameters here force this part of the nav to stay stretched
// instead of collapsing onto multiple lines (text wrap)
export const NavUl = styled(Ul)`
  display: flex;
  flex: 0 0 auto;
`;

// Outer container that flips content from vertical to horizontal as
// screen size increases
export const Container = styled(ContainerComponent)`
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
export const PageInfo = styled.div`
  ${centeredStyles}
  margin-top: 1rem;
  min-height: 5.3rem;

  @media ${desktop} {
    margin-top: 0;
  }
`;

// nav-link section of the nav bar.
// forces contents to scroll on teeny tiny screens (iphone5)
export const SubNav = styled.nav`
  ${centeredStyles}
  overflow-x: auto;
`;

// decoration for active nav link
export const NavLink = styled(NavLinkComponent)`
  font-size: 1.4rem;
  display: block;
  padding: 1em 0;
  border-bottom: 3px solid transparent;

  li + li & {
    margin-left: 1em;
  }

  &.${NavLinkActiveClassName} {
    border-bottom: 3px solid ${props => props.theme.colors.dtaBlue};
  }
`;
