/**
 * A collection of basic inputs and input styles
 */

import spacing from "../spacing";
import styled from "../../styled-components";
import { tablet } from "../../media";

export const BasicTextInput = styled("input")<{ error?: boolean }>`
  width: 100%;
  padding: 10px;
  margin-top: 3px;
  box-shadow: none;
  border: 2px solid ${props => props.theme.colors.payDarkGrey};
  font-size: 1em;
  @media ${tablet} {
    width: auto;
  }
  ${props => props.error && `border-color: ${props.theme.colors.red};`}
  &:focus {
    outline: 2px solid ${props => props.theme.colors.orange};
    outline-offset: 0px;
    border-radius: 0;
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
