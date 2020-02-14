import * as React from "react";
import { Field } from "react-final-form";
import { generateId } from "@pay/web/lib/utils";

import FieldError from "./FieldError";
import ScreenreaderText from "../ScreenReaderText";
import styled from "../../styled-components";

export interface Props<FieldValue = string> {
  label: string;
  name: string;
  hint?: React.ReactNode;
  value?: FieldValue;
  // First indicates this is the first radio in a set. The first radio in the
  // set should be in charge of rendering the error.
  first?: boolean;
}

export const Hint = styled.section`
  color: ${props => props.theme.colors.payLightBlack};
  margin-left: 3.6rem;
`;

export const Wrapper = styled.label`
  display: flex;
  align-items: center;

  * + & {
    margin-top: 2rem;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  input[type="radio"]:checked + span:after {
    content: "";
    display: block;
    width: 1.8rem;
    height: 1.8rem;
    background: ${props => props.theme.colors.black};
    border-radius: 1em;
    margin-left: 3px;
    margin-top: 3px;
  }

  input[type="radio"]:focus + span {
    box-shadow: 0 0 0 2pt ${props => props.theme.colors.orange};
    outline: 0;
  }
`;

export const Checkmark = styled.span`
  height: 2.8rem;
  min-width: 2.8rem;
  background-color: white;
  border: 2px solid ${props => props.theme.colors.black};
  border-radius: 1em;
  margin-right: 0.8rem;
`;

export const Radio: React.FC<Props> = ({
  label,
  name,
  hint,
  value,
  first = false
}) => {
  const [fieldId] = React.useState(generateId(`${name}-`));
  const [errorId] = React.useState(generateId(`${name}-error-`));

  return (
    <Field
      name={name}
      value={value}
      type="radio"
      render={({ input, meta }) => {
        const error = meta.touched ? meta.error || meta.submitError : null;
        const showError = first && Boolean(error);
        const ariaProps = {
          id: fieldId,
          "aria-invalid": Boolean(error),
          "aria-describedby": showError ? errorId : undefined,
          spellCheck: false
        };
        const { value, ...inputRest } = input;

        return (
          <>
            {showError && (
              <>
                <ScreenreaderText>Error: </ScreenreaderText>
                <FieldError id={errorId}>{error}</FieldError>
              </>
            )}
            <Wrapper>
              <input {...inputRest} value={value} {...ariaProps} />
              <Checkmark />
              {label}
            </Wrapper>
            {hint ? <Hint>{hint}</Hint> : null}
          </>
        );
      }}
    />
  );
};

export default Radio;
