/**
 * A collection of basic inputs and input styles
 */

import spacing from "../spacing";
import styled, { css } from "../../styled-components";
import { tablet } from "../../media";
import { P } from "../Typography";

export const textInputStyles = {
  base: css`
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
  display: block;
  padding: 1rem;
  width: 100%;
  font-size: 1em;
  ${props => (props.error ? textInputStyles.error : "")};

  @media ${tablet} {
    max-width: 52rem;
  }

  &:focus {
    ${textInputStyles.focus};
  }

  &:invalid {
    ${textInputStyles.error};
  }
`;

export const Label = styled.label`
  font-weight: 700;
  display: block;

  * + & {
    margin-top: ${spacing.small};
  }
`;

export const Select = styled.select`
  display: block;
  appearance: none;
  ${textInputStyles.base};
  padding: 1rem;
  width: 100%;
  font-size: 1em;
  border-radius: 0;

  &:focus {
    ${textInputStyles.focus};
  }
`;

export const Option = styled.option``;

export const Description = styled(P)`
  color: ${props => props.theme.colors.payLightBlack};
`;
