import * as React from "react";
import { useHistory } from "react-router";
import {
  PageTitle,
  Button,
  Field,
  BooleanRadio,
  BasicTextInput,
  Callout,
  P
} from "@pay/web";
import { FormElement, OnSubmitFn } from "@pay/web/components/form/Form";

import { Values } from "./CreateFormPage";

interface Props {
  path: string;
  values: Pick<Values, "reference_enabled">;
  onSubmit: OnSubmitFn;
}

const ReferencePage: React.FC<Props> = ({ path, values, onSubmit }) => {
  const history = useHistory();

  return (
    <FormElement
      column
      onSubmit={async event => {
        const error = await onSubmit(event);
        if (
          error &&
          (error.reference_enabled ||
            error.reference_label ||
            error.reference_hint)
        ) {
          return;
        }
        history.push(`${path}/amount`);
      }}
      noValidate
    >
      <PageTitle title="Do your users already have a payment reference?" />
      <BooleanRadio name="reference_enabled" value={true} label="Yes" first />
      {values.reference_enabled === true && (
        <>
          <Field
            name="reference_label"
            label="Name of payment reference"
            description="For example, “invoice number”"
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
      <Button type="submit">Continue</Button>
    </FormElement>
  );
};

export default ReferencePage;
