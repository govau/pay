import styled, { css } from "../styled-components";
import { desktop } from "@pay/web";
import spacing from "./spacing";

interface HeadingProps {}

const headingStyles = css<HeadingProps>`
  line-height: 1.5;
  font-weight: 700;
  max-width: 70rem;
  margin-bottom: ${spacing.fixed(1.5)};

  * + & {
    margin-top: ${spacing.relative(1)};
  }
`;

export const H1 = styled.h1<HeadingProps>`
  ${headingStyles};
  font-size: 3.2rem;

  @media ${desktop} {
    font-size: 4.8rem;
  }
`;

export const H2 = styled.h2<HeadingProps>`
  ${headingStyles};
  font-size: 2.6rem;

  @media ${desktop} {
    font-size: 3.6rem;
  }
`;

export const H3 = styled.h3<HeadingProps>`
  ${headingStyles};
  font-size: 2.2rem;

  @media ${desktop} {
    font-size: 2.8rem;
  }
`;

export const H4 = styled.h4<HeadingProps>`
  ${headingStyles};
  font-size: 1.8rem;
`;

export const Text = styled.span<{ variant?: "gray" }>`
  color: ${({ theme, variant }) => {
    switch (variant) {
      case "gray":
        return theme.colors.darkGray;
      default:
        return "inherit";
    }
  }};
`;

export const P = styled.p`
  max-width: 70rem;
  margin-bottom: ${spacing.small};

  * + & {
    margin-top: ${spacing.relative(1)};
  }
`;

export const Strong = styled.strong`
  font-weight: 700;
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
