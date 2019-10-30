/**
 * A collection of basic inputs and input styles
 */

import spacing from "../spacing";
import styled, { css } from "../../styled-components";
import { tablet } from "../../media";

export const textInputStyles = {
  base: css`
    padding: 1rem;
    margin-top: 3px;
    box-shadow: none;
    border: 2px solid ${props => props.theme.colors.payDarkGrey};
  `,
  focus: css`
    outline: 2px solid ${props => props.theme.colors.orange};
    outline-offset: 0px;
    border-radius: 0;
  `,
  error: css`
    border-color: ${props => props.theme.colors.red};
  `
};

export const BasicTextInput = styled("input")<{ error?: boolean }>`
  ${textInputStyles.base};
  width: 100%;
  font-size: 1em;
  ${props => (props.error ? textInputStyles.error : "")};

  @media ${tablet} {
    width: auto;
  }

  &:focus {
    ${textInputStyles.focus};
  }
`;

export const Label = styled.label`
  font-weight: 700;
  display: block;

  * + & {
    margin-top: ${spacing.small};
  }
`;

export const Description = styled.div`
  color: ${props => props.theme.colors.payLightBlack};
`;
