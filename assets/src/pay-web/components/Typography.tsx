import styled, { css } from "../styled-components";
import { desktop } from "@pay/web";
import spacing from "./spacing";

interface HeadingProps {}

const headingStyles = css<HeadingProps>`
  line-height: 1.1;
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

export const Pre = styled.pre`
  position: relative;
  background: #011628bf;
  overflow-x: auto;
  font-size: 1.3rem;
  line-height: 1.9rem;
  border-radius: 4px;
  margin-bottom: 0;

  &:not(:first-child) {
    margin-top: 0;
  }

  &:not(:last-child) {
    margin-bottom: 1.6rem;
  }

  code {
    display: inline-block;
    position: relative;
    min-width: 100%;
    padding: 12px 14px 12px 64px;
    z-index: 2;
    color: #f5fbff;
    font-weight: 500;
  }
`;

export const PreLineNumbers = styled.span`
  z-index: 2;
  position: absolute;
  pointer-events: none;
  top: 12px;
  left: 29px;
  width: 16px;
  counter-reset: linenumber;
  line-height: 1.9rem;

  > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;

    &:before {
      content: counter(linenumber);
      color: #bec5ca;
      display: block;
      font-size: 1.3rem;
      text-align: right;
      user-select: none;
    }
  }
`;

export const P = styled.p`
  max-width: 70rem;
  margin-bottom: ${spacing.small};
  line-height: 1.3;

  * + & {
    margin-top: ${spacing.relative(1)};
  }

  code {
    font-size: 1.5rem;
    border-radius: 4px;
    color: #3c4257;
    font-weight: 500;
    background: #f7fafc;
    border: 1px solid #e3e8ee;
    padding: 1px 2px;
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

    ul {
      margin-top: 1rem;
    }
  }
`;
