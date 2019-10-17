import * as React from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  PageTitle,
  Field,
  BasicTextInput,
  Callout,
  P,
  Strong,
  Label,
  styled,
  Button
} from "@pay/web";
import { FormElement, OnSubmitFn } from "@pay/web/components/form/Form";
import { generateId } from "@pay/web/lib/utils";
import { ProductPaymentFragment } from "../__generated__/graphql";
import { Values } from "./PayFormPage";

const PriceInputWrapper = styled.div`
  position: relative;

  &:before {
    position: absolute;
    bottom: 3px;
    content: "$";
    padding: 1rem;
    font-weight: bold;
  }

  > input {
    padding-left: 2rem;
  }
`;

interface Props {
  path: string;
  payment: ProductPaymentFragment;
  values: Pick<Values, "amount">;
  onSubmit: OnSubmitFn;
}

// The title and description are only shown on the first page of the form.
// If the user does not have to provide a reference then this would be the first
// page of the form, so show them.
const AmountPage: React.FC<Props> = ({ path, payment, values, onSubmit }) => {
  const [labelId] = React.useState(generateId("payment-amount-label-"));
  const [fieldId] = React.useState(generateId("payment-amount-"));

  const history = useHistory();

  return (
    <FormElement
      column
      onSubmit={async event => {
        const error = await onSubmit(event);
        if (error && error.amount) {
          return;
        }
        history.push(`${path}/submit`);
      }}
      noValidate
    >
      <Helmet>
        <title>
          {payment.product.price_fixed
            ? "Confirm amount"
            : "Enter amount in dollars"}{" "}
          - {payment.product.name}
        </title>
      </Helmet>
      {!payment.product.reference_enabled && (
        <>
          <PageTitle title={payment.product.name} />
          {payment.product.description && <P>{payment.product.description}</P>}
        </>
      )}
      {payment.product.price_fixed ? (
        <>
          <Label id={labelId} htmlFor={fieldId}>
            Payment amount
          </Label>
          <Callout id={fieldId}>
            <P>
              <Strong>${(payment.product.price / 100).toFixed(2)}</Strong>
            </P>
          </Callout>
        </>
      ) : (
        <>
          <Field
            name="amount"
            label="Payment amount"
            // TODO: fix format and parse functions.
            format={value => {
              if (!value) {
                return "";
              }
              return value;
            }}
            parse={value => {
              if (!value) {
                return 0;
              }
              if (/[\d.]+/.test(value)) {
                return Number(value);
              }
              return value;
            }}
          >
            {({ input, ariaProps, ...rest }) => (
              <PriceInputWrapper>
                <BasicTextInput
                  {...input}
                  {...ariaProps}
                  {...rest}
                  inputMode="numeric"
                  aria-label="Enter amount in dollars"
                />
              </PriceInputWrapper>
            )}
          </Field>
          {values.amount > 0 && (
            <Callout>
              <P>
                Amount to pay: <Strong>${values.amount.toFixed(2)}</Strong>
              </P>
            </Callout>
          )}
        </>
      )}
      <Button type="submit">Proceed to payment</Button>
    </FormElement>
  );
};

export default AmountPage;
