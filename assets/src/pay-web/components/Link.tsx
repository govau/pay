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

const LinkCSS = css`
  color: ${props => props.theme.linkColor};
  text-decoration: underline;

  &:hover,
  &:focus {
    color: ${props => props.theme.linkColor};
    text-decoration: none;
  }
`;

const Link = styled(ReactRouterLink)`
  ${LinkCSS}
`;

const NavLink = styled(ReactRouterNavLink)`
  ${LinkCSS}
`;

export { Link, NavLink, NavLinkActiveClassName };
