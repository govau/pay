import * as React from "react";
import createDecorator from "final-form-focus";
import { Form, Field } from "@pay/web";
import styled from "@pay/web/styled-components";
import { BasicTextInput } from "@pay/web/components/form/inputs";

const CVVInputWrapper = styled.div`
  width: 6em;
`;

const ExpiryInputWrapper = styled.div`
  width: 6em;
`;

const decorators = [createDecorator()];

interface Props {
  onSubmit(): void;
}

const SandboxCardForm: React.FC<Props> = ({ children, onSubmit }) => (
  <Form onSubmit={onSubmit} column decorators={decorators}>
    <Field name="cardNumber" label="Card number">
      {({ input, ariaProps, ...rest }) => (
        <BasicTextInput
          {...input}
          {...ariaProps}
          {...rest}
          inputMode="numeric"
          autoComplete="cc-number"
          autoCorrect="off"
          spellCheck={false}
          pattern="[\d| ]{16,22}"
        />
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
          <BasicTextInput
            {...input}
            {...ariaProps}
            {...rest}
            inputMode="numeric"
            autoComplete="cc-exp"
            autoCorrect="off"
            spellCheck={false}
            pattern="\d\d/\d\d"
          />
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
          <BasicTextInput
            {...input}
            {...ariaProps}
            {...rest}
            inputMode="numeric"
            autoComplete="cc-csc"
            autoCorrect="off"
            spellCheck={false}
            pattern="\d{3,4}"
          />
        </CVVInputWrapper>
      )}
    </Field>

    <Field
      name="email"
      label="Email"
      description="We’ll send your payment confirmation here"
    >
      {({ input, ariaProps, ...rest }) => (
        <BasicTextInput
          {...input}
          {...ariaProps}
          {...rest}
          type="email"
          autoCorrect="off"
          autoComplete="email"
        />
      )}
    </Field>

    {children}
  </Form>
);

export default SandboxCardForm;
