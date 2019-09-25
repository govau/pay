import {
  Link as ReactRouterLink,
  LinkProps as ReactRouterLinkProps
} from "react-router-dom";

import styled, { css } from "../styled-components";

export interface LinkProps extends ReactRouterLinkProps {}

export const linkCSS = css`
  color: ${props => props.theme.linkColor};
  text-decoration: underline;

  &:hover,
  &:focus {
    color: ${props => props.theme.colors.black};
  }
`;

const Link = styled(ReactRouterLink)`
  ${linkCSS}
`;

export { Link };
