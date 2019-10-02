import * as React from "react";
import { BasicTextInput } from "./inputs";
import Field from "./Field";
import validators from "../../lib/validation";

const { required } = validators;

const passwordRequired = "Password is required";

interface Props {
  label: string;
  name: string;
}

const PasswordInput: React.FC<Props> = ({ label, name }) => (
  <Field label={label} name={name} validate={required(passwordRequired)}>
    {({ input, ariaProps, error }) => (
      <BasicTextInput error={error} {...input} {...ariaProps} type="password" />
    )}
  </Field>
);

export default PasswordInput;
