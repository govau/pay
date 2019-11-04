import * as React from "react";
import { Form, Field } from "@pay/web";
import styled from "@pay/web/styled-components";
import { BasicTextInput } from "@pay/web/components/form/inputs";

const CVVInputWrapper = styled.div`
  width: 6em;
`;

const ExpiryInputWrapper = styled.div`
  width: 6em;
`;

interface Props {
  onSubmit(): void;
}

const SandboxCardForm: React.FC<Props> = ({ children, onSubmit }) => (
  <Form onSubmit={onSubmit} column>
    <Field name="cardNumber" label="Card number">
      {({ input, ariaProps, ...rest }) => (
        <BasicTextInput {...input} {...ariaProps} {...rest} />
      )}
    </Field>

    <Field
      name="expiryDate"
      label="Expiry date"
      description={`For example, 10/${String(
        new Date().getFullYear() + 1
      ).substring(2)}`}
    >
      {({ input, ariaProps, ...rest }) => (
        <ExpiryInputWrapper>
          <BasicTextInput {...input} {...ariaProps} {...rest} />
        </ExpiryInputWrapper>
      )}
    </Field>

    <Field
      name="cvv"
      label="Card security code"
      description="The last 3 digits on the back of the card"
    >
      {({ input, ariaProps, ...rest }) => (
        <CVVInputWrapper>
          <BasicTextInput {...input} {...ariaProps} {...rest} />
        </CVVInputWrapper>
      )}
    </Field>

    <Field
      name="email"
      label="Email"
      description="We’ll send your payment confirmation here"
    >
      {({ input, ariaProps, ...rest }) => (
        <BasicTextInput {...input} {...ariaProps} {...rest} type="email" />
      )}
    </Field>

    {children}
  </Form>
);

export default SandboxCardForm;
