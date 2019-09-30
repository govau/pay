import * as React from "react";
import { BasicTextInput } from "./inputs";
import Field from "./Field";
import validators from "../../lib/validation";

const { required, isLocalMobileNumber, composeValidators } = validators;

interface Props {
  label: string;
  name: string;
}

const MobileNumberInput: React.FunctionComponent<Props> = ({ label, name }) => (
  <Field
    label={label}
    name={name}
    validate={composeValidators(
      required("Mobile number is required"),
      isLocalMobileNumber()
    )}
  >
    {({ input, ariaProps, error }) => (
      <BasicTextInput error={error} {...input} {...ariaProps} />
    )}
  </Field>
);

export default MobileNumberInput;
