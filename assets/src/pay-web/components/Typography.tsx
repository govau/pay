import styled, { css } from "../styled-components";
import spacing from "./spacing";

interface HeadingProps {
  /** groups the heading with the content beneath it */
  grouped?: boolean;
}

const headingStyles = css<HeadingProps>`
  line-height: 1.5;
  font-weight: normal;
  margin: ${spacing.medium} 0;
  max-width: 70rem;
  ${props => {
    if (props.grouped) {
      return `
        margin-bottom: 1rem;
        + * {
          margin-top: 0;
        }
      `;
    }
    return "";
  }}
`;

export const H1 = styled.h1<HeadingProps & { xl?: boolean }>`
  ${headingStyles};
  font-size: ${props => (props.xl ? "4.8" : "4")}rem;
  line-height: 1.25;
`;

export const H2 = styled.h2<HeadingProps>`
  ${headingStyles};
  font-size: 3.2rem;
  line-height: 1.3;
`;

export const H3 = styled.h3<HeadingProps>`
  ${headingStyles};
  font-size: 2.4rem;
  line-height: 1.25;
`;

export const H4 = styled.h4<HeadingProps>`
  ${headingStyles};
  font-size: 2rem;
  line-height: 1.33;
`;

export const P = styled.p`
  max-width: 70rem;
  margin: ${spacing.small} 0;
`;

export const Strong = styled("strong")<{ block?: boolean }>`
  font-weight: bold;
  ${props => (props.block ? "display: block;" : "")}
`;

export const UL = styled.ul`
  margin: 0;
  padding-left: 2.5rem;
  li {
    list-style: none;
    padding-left: 2.5rem;
    position: relative;
    margin-bottom: 1rem;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 1rem;
      height: 4px;
      width: 4px;
      border-radius: 50%;
      background: ${props => props.theme.colors.black};
    }
  }
`;
