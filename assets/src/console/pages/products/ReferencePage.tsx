import * as React from "react";
import {
  PageTitle,
  LinkButton,
  Field,
  BooleanRadio,
  BasicTextInput,
  validators,
  Callout,
  P
} from "@pay/web";
import { Values } from "./CreateFormPage";

const ReferencePage: React.FC<{
  path: string;
  values: Pick<Values, "reference_enabled">;
}> = ({ path, values }) => {
  return (
    <>
      <PageTitle title="Do your users already have a payment reference?" />
      <BooleanRadio name="reference_enabled" value={true} label="Yes" />
      {values.reference_enabled === true && (
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
      )}
      <BooleanRadio name="reference_enabled" value={false} label="No" />
      {values.reference_enabled === false && (
        <Callout>
          <P>
            Pay.gov.au will create a unique payment reference for each
            transaction.
          </P>
        </Callout>
      )}
      <LinkButton to={`${path}/amount`}>Continue</LinkButton>
    </>
  );
};

export default ReferencePage;
