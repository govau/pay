import * as React from "react";
import { BasicTextInput } from "./inputs";
import Field from "./Field";
import validators from "../../lib/validation";

const { required, isEmail, composeValidators } = validators;

const errorMessages = {
  emailRequired: "Email address is required"
};

interface Props {
  label: string;
  name: string;
}

const EmailInput: React.FunctionComponent<Props> = ({ label, name }) => (
  <Field
    label={label}
    name={name}
    validate={composeValidators(
      required(errorMessages.emailRequired),
      isEmail()
    )}
  >
    {({ input, ariaProps, error }) => (
      <BasicTextInput error={error} {...input} {...ariaProps} />
    )}
  </Field>
);

export default EmailInput;
