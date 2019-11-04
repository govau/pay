import * as React from "react";
import * as CustomCheckout from "@bambora/apac-custom-checkout-sdk-web";
import { generateId } from "@pay/web/lib/utils";
import styled from "@pay/web/styled-components";
import {
  Label,
  Description,
  BasicTextInput,
  textInputStyles
} from "@pay/web/components/form/inputs";

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
      vertical-align: text-bottom;
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

const CardNumber = styled.div`
  &.${classNames.number.base} {
    width: 100%;
  }
`;

const CVV = styled.div`
  &.${classNames.cvv.base} {
  }
`;

const CardExpiry = styled.div`
  &.${classNames.expiry.base} {
  }
`;

interface Props {
  onSubmit(): void;
  numberId: string;
  cvvId: string;
  expiryId: string;
}

const CardForm: React.FC<Props> = ({
  children,
  onSubmit,
  numberId,
  cvvId,
  expiryId
}) => (
  <Form
    onSubmit={e => {
      e.preventDefault();
      onSubmit();
    }}
  >
    <Label>Card number</Label>
    <CardNumber id={numberId}></CardNumber>

    <Label>Expiry date</Label>
    <Description>
      For example, 10/
      {String(new Date().getFullYear() + 1).substring(2)}
    </Description>
    <CardExpiry id={expiryId}></CardExpiry>

    <Label>Card security code</Label>
    <Description>The last 3 digits on the back of the card</Description>
    <CVV id={cvvId}></CVV>

    <Label>Email</Label>
    <Description>We’ll send your payment confirmation here</Description>
    <BasicTextInput type="email" />

    {children}
  </Form>
);

export default CardForm;
