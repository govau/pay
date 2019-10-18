import * as React from "react";
import {
  PageTitle,
  Field,
  BooleanRadio,
  BasicTextInput,
  Button
} from "@pay/web";
import { FormElement, OnSubmitFn } from "@pay/web/components/form/Form";

import { Values } from "./CreateFormPage";
import { useHistory } from "react-router";

interface Props {
  path: string;
  values: Pick<Values, "price_fixed">;
  onSubmit: OnSubmitFn;
}

const AmountPage: React.FC<Props> = ({ path, values, onSubmit }) => {
  const history = useHistory();

  return (
    <FormElement
      column
      onSubmit={async event => {
        const error = await onSubmit(event);
        if (error && (error.price_fixed || error.price)) {
          return;
        }
        history.push(`${path}/review`);
      }}
      noValidate
    >
      <PageTitle title="Is the payment for a fixed amount?" />
      <BooleanRadio name="price_fixed" value={true} label="Yes" first />
      {values.price_fixed ? (
        <Field
          name="price"
          label="Enter the amount"
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
            <BasicTextInput {...input} {...ariaProps} {...rest} />
          )}
        </Field>
      ) : null}
      <BooleanRadio
        name="price_fixed"
        value={false}
        label="No, the user can choose the amount"
      />
      <Button type="submit">Continue</Button>
    </FormElement>
  );
};

export default AmountPage;
