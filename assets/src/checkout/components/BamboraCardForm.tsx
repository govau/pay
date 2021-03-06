import * as React from "react";
import * as CustomCheckout from "@bambora/apac-custom-checkout-sdk-web";
import { generateId } from "@pay/web/lib/utils";
import styled from "@pay/web/styled-components";
import {
  Label,
  FieldError,
  Description,
  BasicTextInput,
  textInputStyles
} from "@pay/web/components/form";

export const classNames: {
  number: CustomCheckout.FieldClasses;
  cvv: CustomCheckout.FieldClasses;
  expiry: CustomCheckout.FieldClasses;
} = {
  number: {
    base: generateId("card-number-"),
    complete: generateId("card-number-complete-"),
    empty: generateId("card-number-empty-"),
    focus: generateId("card-number-focus-"),
    error: generateId("card-number-error-")
  },
  cvv: {
    base: generateId("cvv-"),
    complete: generateId("cvv-complete-"),
    empty: generateId("cvv-empty-"),
    focus: generateId("cvv-focus-"),
    error: generateId("cvv-error-")
  },
  expiry: {
    base: generateId("card-expiry-"),
    complete: generateId("card-expiry-complete-"),
    empty: generateId("card-expiry-empty-"),
    focus: generateId("card-expiry-focus-"),
    error: generateId("card-expiry-error-")
  }
};

const Form = styled.form`
  &
    .${classNames.number.base},
    &
    .${classNames.cvv.base},
    &
    .${classNames.expiry.base} {
    ${textInputStyles.base};

    iframe {
      vertical-align: text-top;
      /* Bambora's iframe height is set dynamically and takes a moment to be set
         so ensure that the height has a minimum to avoid a flicker. */
      min-height: 4.1rem;
    }
  }

  &
    .${classNames.number.focus},
    &
    .${classNames.cvv.focus},
    &
    .${classNames.expiry.focus} {
    ${textInputStyles.focus};
  }

  &
    .${classNames.number.error},
    &
    .${classNames.cvv.error},
    &
    .${classNames.expiry.error} {
    ${textInputStyles.error};
  }

  & .${classNames.cvv.base}, & .${classNames.expiry.base} {
    width: 6em;
  }
`;

const Number = styled.div`
  &.${classNames.number.base} {
    width: 100%;
  }
`;

const CVV = styled.div`
  &.${classNames.cvv.base} {
  }
`;

const Expiry = styled.div`
  &.${classNames.expiry.base} {
  }
`;

interface Props {
  onSubmit(): void;
  fieldIds: Record<CustomCheckout.Field, string>;
  errors: Record<CustomCheckout.Field, string>;
}

const BamboraCardForm: React.FC<Props> = ({
  children,
  onSubmit,
  fieldIds = {},
  errors = {}
}) => {
  const [numberErrorId] = React.useState(generateId("card-number-error-"));
  const [cvvErrorId] = React.useState(generateId("card-cvv-error-"));
  const [expiryErrorId] = React.useState(generateId("card-expiry-error-"));

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <Label>Card number</Label>
      {errors["card-number"] && (
        <FieldError id={numberErrorId}>{errors["card-number"]}</FieldError>
      )}
      <Number id={fieldIds["card-number"]}></Number>

      <Label>Expiry date</Label>
      <Description>
        For example, 10/
        {String(new Date().getFullYear() + 1).substring(2)}
      </Description>
      {errors["expiry"] && (
        <FieldError id={expiryErrorId}>{errors["expiry"]}</FieldError>
      )}
      <Expiry id={fieldIds.expiry}></Expiry>

      <Label>Card security code</Label>
      <Description>The last 3 digits on the back of the card</Description>
      {errors["cvv"] && (
        <FieldError id={cvvErrorId}>{errors["cvv"]}</FieldError>
      )}
      <CVV id={fieldIds.cvv}></CVV>

      <Label>Email</Label>
      <Description>We’ll send your payment confirmation here</Description>
      <BasicTextInput type="email" />

      {children}
    </Form>
  );
};

export default BamboraCardForm;
