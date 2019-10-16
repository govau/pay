import * as React from "react";
import { Helmet } from "react-helmet";
import {
  PageTitle,
  LinkButton,
  P,
  Field,
  BasicTextInput,
  validators
} from "@pay/web";
import { ProductPaymentFragment } from "../__generated__/graphql";

const ReferencePage: React.FC<{
  path: string;
  payment: ProductPaymentFragment;
}> = ({ path, payment }) => {
  return (
    <>
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
        validate={validators.required("This field is required")}
      >
        {({ input, ariaProps, ...rest }) => (
          <BasicTextInput {...input} {...ariaProps} {...rest} />
        )}
      </Field>
      <LinkButton to={`${path}/amount`}>Continue</LinkButton>
    </>
  );
};

export default ReferencePage;
