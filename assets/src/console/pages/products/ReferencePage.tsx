import * as React from "react";
import {
  PageTitle,
  LinkButton,
  Field,
  Checkbox,
  BasicTextInput,
  validators
} from "@pay/web";
import { Values } from "./CreateFormPage";

const DetailsPage: React.FC<{
  path: string;
  values: Pick<Values, "reference_enabled">;
}> = ({ path, values }) => {
  return (
    <>
      <PageTitle title="Do your users already have a payment reference?" />

      <Checkbox<boolean> name="reference_enabled" label="Yes" />

      {values.reference_enabled ? (
        <>
          <Field
            name="reference_label"
            label="Name of payment reference"
            description="For example, “invoice number”"
            validate={validators.required("Enter a payment reference")}
          >
            {({ input, ariaProps, ...rest }) => (
              <BasicTextInput {...input} {...ariaProps} {...rest} />
            )}
          </Field>
          <Field
            name="reference_hint"
            label="Hint text (optional)"
            description="Tell users what the payment reference looks like and where they can find it."
          >
            {({ input, ariaProps, ...rest }) => (
              <BasicTextInput {...input} {...ariaProps} {...rest} />
            )}
          </Field>
        </>
      ) : null}
      <LinkButton to={`${path}/amount`}>Continue</LinkButton>
    </>
  );
};

export default DetailsPage;
