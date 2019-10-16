import * as React from "react";
import slugify from "@sindresorhus/slugify";
import {
  PageTitle,
  LinkButton,
  Callout,
  Field,
  BasicTextInput,
  validators,
  P
} from "@pay/web";

import { Values } from "./CreateFormPage";

const DetailsPage: React.FC<{
  serviceName: string;
  path: string;
  values: Pick<Values, "name">;
}> = ({ serviceName, path, values }) => {
  return (
    <>
      <PageTitle title="Set payment link information" />
      <Field
        name="name"
        label="Title"
        description="Briefly describe what the user is paying for. For example, “Pay for a parking permit”. This will also be your website address."
        validate={validators.required("Enter a payment link title")}
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
      >
        {({ input, ariaProps, ...rest }) => (
          <BasicTextInput {...input} {...ariaProps} {...rest} />
        )}
      </Field>
      <LinkButton to={`${path}/reference`}>Continue</LinkButton>
    </>
  );
};

export default DetailsPage;
