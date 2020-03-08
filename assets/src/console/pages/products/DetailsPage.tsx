import * as React from "react";
import { useHistory } from "react-router-dom";
import slugify from "@sindresorhus/slugify";
import { PageTitle, Button, Callout, Field, BasicTextInput, P } from "@pay/web";
import { FormElement, OnSubmitFn } from "@pay/web/components/form/Form";

import { Values } from "./CreateFormPage";

interface Props {
  serviceName: string;
  title: string;
  values: Pick<Values, "name">;
  onSubmit: OnSubmitFn;
  redirectURL: string;
}

const DetailsPage: React.FC<Props> = ({
  serviceName,
  title,
  values,
  onSubmit,
  redirectURL
}) => {
  const history = useHistory();

  return (
    <FormElement
      column
      onSubmit={async event => {
        const error = await onSubmit(event);
        if (error && (error.name || error.description)) {
          return;
        }
        history.push(redirectURL);
      }}
      noValidate
    >
      <PageTitle title={title} />
      <Field
        name="name"
        label="Title"
        description="Briefly describe what the user is paying for. For example, “Pay for a parking permit”. This will also be your website address."
      >
        {({ input, ariaProps, ...rest }) => (
          <BasicTextInput {...input} {...ariaProps} {...rest} />
        )}
      </Field>
      {values.name && (
        <Callout>
          <h3>The website address for this payment link will look like:</h3>
          <P>
            https://pay.gov.au/payments/{slugify(serviceName)}/
            {slugify(values.name)}
          </P>
        </Callout>
      )}
      <Field
        name="description"
        label="Details (optional)"
        description="Give your users more information. For example, you could tell them how long it takes for their application to be processed."
        parse={value => value}
      >
        {({ input, ariaProps, ...rest }) => (
          <BasicTextInput {...input} {...ariaProps} {...rest} />
        )}
      </Field>
      <Button type="submit">Continue</Button>
    </FormElement>
  );
};

export default DetailsPage;
