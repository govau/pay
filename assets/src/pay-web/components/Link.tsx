import * as React from "react";
import {
  Link as ReactRouterLink,
  NavLink as RawReactRouterNavLink,
  LinkProps as ReactRouterLinkProps,
  NavLinkProps as ReactRouterNavLinkProps
} from "react-router-dom";

import styled, { css } from "../styled-components";

export interface LinkProps extends ReactRouterLinkProps {}
export interface NavLinkProps extends ReactRouterNavLinkProps {}

const NavLinkActiveClassName = "rr-nav-link--active";

const ReactRouterNavLink: React.FC<NavLinkProps> = props => {
  return (
    <RawReactRouterNavLink
      activeClassName={NavLinkActiveClassName}
      {...props}
    />
  );
};

const linkCSS = css`
  color: ${props => props.theme.linkColor};
  text-decoration: underline;

  &:hover,
  &:focus {
    color: ${props => props.theme.linkColor};
    text-decoration: none;
  }
`;

const Link = styled(ReactRouterLink)`
  ${linkCSS}
`;

const NavLink = styled(ReactRouterNavLink)`
  ${linkCSS}
`;

export { Link, NavLink, NavLinkActiveClassName };
