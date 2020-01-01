import styled, { css } from "@pay/web/styled-components";
import {
  Link as LinkComponent,
  NavLink as NavLinkComponent
} from "@pay/web/components/Link";
import { Button as ButtonComponent } from "@pay/web";

export const PrimaryHeader = styled.div`
  background-color: ${props => props.theme.colors.payBlue};
  padding: 1.5rem 0;
`;

export const PrimaryNav = styled.div`
  background-color: ${props => props.theme.colors.payDarkerBlue};
`;

// reverses underline from base link for header effect
const linkCSS = css`
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export const Link = styled(LinkComponent)`
  ${linkCSS}
`;

export const NavLink = styled(NavLinkComponent)`
  ${linkCSS}
`;

export const Button = styled(ButtonComponent)`
  ${linkCSS}
  padding: 0;
`;

export const Ul = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  li {
    list-style: none;
  }
`;
