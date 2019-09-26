import * as React from "react";

import { styledComponents, Container, Button, tablet } from "@pay/web";
import { NavLink as ReactRouterNavLink, NavLinkProps } from "react-router-dom";
import { Link as LinkComponent } from "@pay/web/components/Link";

const { styled } = styledComponents;

export const Wrapper = styled.header`
  ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media ${tablet} {
      justify-content: flex-start;
      flex-flow: row nowrap;
    }
  }
`;

export const PrimaryHeader = styled.div`
  background-color: ${props => props.theme.colors.payBlue};
  padding: 1.5rem 0;
`;

export const Navbar = styled.div<{ visible: boolean }>`
  display: ${props => (props.visible ? "inherit" : "none")};
  background-color: ${props => props.theme.colors.payDarkerBlue};
  padding-top: 1.5rem;

  ${Container} {
    padding: 0;

    @media ${tablet} {
      padding: 0 1em;
    }
  }

  @media ${tablet} {
    padding-top: 0;
    display: inherit;
    border-bottom: 8px solid ${props => props.theme.colors.payHeaderBar};
  }
`;

export const Logos = styled.div`
  display: flex;
  align-items: center;
`;

export const Link = styled(LinkComponent)`
  &:hover,
  &:active,
  &:focus {
    color: ${props => props.theme.linkColor};
    text-decoration: none;
  }
`;

export const LinkButton = styled(Link.withComponent(Button))`
  padding: 0;
  color: ${props => props.theme.linkColor};
`;

export const PrimaryNavWrapper = styled.nav`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;

  @media ${tablet} {
    flex-direction: row;
  }

  ${Link}, ${LinkButton} {
    margin-left: 1em;
  }
`;

export const Ul = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  li {
    list-style: none;
  }
`;

const NavLinkActiveClassName = "rr-nav-link--active";

const RRNavLink: React.FC<NavLinkProps> = props => {
  return (
    <ReactRouterNavLink activeClassName={NavLinkActiveClassName} {...props} />
  );
};

export const NavLink = styled(RRNavLink)`
  height: 100%;
  display: block;
  padding: 1em 1em;
  text-decoration: none;
  color: ${props => props.theme.colors.white};
  border-left: 6px solid transparent;

  &:hover {
    color: ${props => props.theme.colors.white};
    background-color: ${props => props.theme.colors.payHeaderBar};
  }

  &.${NavLinkActiveClassName} {
    border-left: 6px solid ${props => props.theme.colors.payHeaderBar};
  }

  @media ${tablet} {
    border-left: none;
    display: inline-block;
    padding: 1em 2em;

    &.${NavLinkActiveClassName} {
      ${props => `
        border-left: none;
        color: ${props.theme.colors.white};
        background-color: ${props.theme.colors.payHeaderBar};
    `}
    }
  }
`;
