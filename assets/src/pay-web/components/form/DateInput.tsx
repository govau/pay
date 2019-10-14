import * as React from "react";
import styled from "styled-components";
import { BasicTextInput } from "./inputs";
import Field from "./Field";
import validators from "../../lib/validation";

const { required, isDate, composeValidators } = validators;

const FormatGuide = styled.div`
  color: ${props => props.theme.colors.darkGray};
  margin: 0;
`;

interface Props {
  label: string;
  name: string;
}

const DateInput: React.FunctionComponent<Props> = ({ label, name }) => (
  <Field
    label={label}
    name={name}
    validate={composeValidators(required("Date is required"), isDate())}
  >
    {({ input, ariaProps, error }) => (
      <>
        <FormatGuide>DD/MM/YYYY</FormatGuide>
        <BasicTextInput error={error} {...input} {...ariaProps} />
      </>
    )}
  </Field>
);

export default DateInput;
