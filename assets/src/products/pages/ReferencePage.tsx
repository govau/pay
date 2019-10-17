import * as React from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { PageTitle, P, Field, BasicTextInput, Button } from "@pay/web";
import { FormElement, OnSubmitFn } from "@pay/web/components/form/Form";

import { ProductPaymentFragment } from "../__generated__/graphql";

interface Props {
  path: string;
  payment: ProductPaymentFragment;
  onSubmit: OnSubmitFn;
}

const ReferencePage: React.FC<Props> = ({ path, payment, onSubmit }) => {
  const history = useHistory();

  return (
    <FormElement
      column
      onSubmit={async event => {
        const error = await onSubmit(event);
        if (error && error.reference) {
          return;
        }
        history.push(`${path}/amount`);
      }}
      noValidate
    >
      <Helmet>
        <title>
          {payment.product.reference_label} - {payment.product.name}
        </title>
      </Helmet>
      <PageTitle title={payment.product.name} />
      {payment.product.description && <P>{payment.product.description}</P>}
      <Field
        name="reference"
        label={payment.product.reference_label}
        description={payment.product.reference_hint}
      >
        {({ input, ariaProps, ...rest }) => (
          <>
            <BasicTextInput {...input} {...ariaProps} {...rest} />
          </>
        )}
      </Field>
      <Button type="submit">Continue</Button>
    </FormElement>
  );
};

export default ReferencePage;
