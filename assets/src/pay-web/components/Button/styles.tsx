import { css } from "../../styled-components";
import { desktop } from "../../media";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "link";

export interface ButtonProps {
  variant?: ButtonVariant;
  stretch?: boolean;
  padded?: boolean;
}

const appearsAsButton = new Set<ButtonVariant>([
  "primary",
  "secondary",
  "tertiary"
]);

const hasButtonAppearance = (variant?: ButtonVariant) =>
  variant ? appearsAsButton.has(variant) : true;

const variantStyles = (props: ButtonProps) => {
  switch (props.variant) {
    case "secondary": {
      return css`
        color: ${props => props.theme.textColor};
        border-color: ${props => props.theme.textColor};
        border-radius: 3px;
        border-width: 3px;
        border-style: solid;
        background: ${props => props.theme.bgColor};

        &:hover,
        &:focus {
          color: ${props => props.theme.textColor};
          border-color: ${props => props.theme.brandPrimary};
          text-decoration: underline;
        }
      `;
    }
    case "tertiary": {
      return css`
        color: ${props => props.theme.linkColor};
        border: none;
        padding: none;

        &:hover,
        &:focus {
          color: ${props => props.theme.textColor};
          text-decoration: none;
        }
        &:active {
          border-color: ${props => props.theme.colors.orange};
          border-radius: 3px;
          border-width: 0.1px;
          border-style: solid;
        }
      `;
    }
    case "link": {
      return css`
        color: ${props => props.theme.linkColor};
        background: none;
        border: none;
        text-decoration: underline;
        &:hover,
        &:focus {
          color: ${props => props.theme.textColor};
        }
        ${props.padded &&
          `
          padding: 8px 30px;
          margin: 30px 0;
        `}
      `;
    }
    default: {
      // Default to primary
      return css`
        color: ${props => props.theme.bgColor};
        background: ${props => props.theme.brandPrimary};
        border: ${props => props.theme.brandPrimary};
        border-radius: 3px;
        border-width: 3px;
        border-style: solid;

        &:hover,
        &:focus {
          color: ${props => props.theme.bgColor};
          border-color: ${props => props.theme.brandSecondary};
          background: ${props => props.theme.brandSecondary};
          text-decoration: underline;
        }
      `;
    }
  }
};

const disabledStyles = css`
  cursor: not-allowed;
  opacity: 0.5;
`;

const ButtonStyles = css<ButtonProps>`
  display: block;
  width: 100%;
  text-align: center;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  padding: 9px 30px;
  margin: 30px 0;
  line-height: inherit;

  @media ${desktop} {
    ${props =>
      props.stretch
        ? css``
        : css`
            display: flex;
            width: auto;
          `}
  }

  &:active {
    box-shadow: 0 0 0 2pt ${props => props.theme.colors.orange};
    outline: 0;
  }

  &:disabled {
    ${disabledStyles};
  }
`;

const Styles = css<ButtonProps>`
  cursor: pointer;
  font-size: 1em;
  font-family: ${props => props.theme.fontFamily};
  text-align: center;
  ${variantStyles}
  ${props => (hasButtonAppearance(props.variant) ? ButtonStyles : css``)};
`;

export { Styles as default, disabledStyles };
