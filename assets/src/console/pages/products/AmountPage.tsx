import * as React from "react";
import {
  PageTitle,
  LinkButton,
  Field,
  Checkbox,
  BasicTextInput,
  validators
} from "@pay/web";
import { Values } from "./CreateFormPage";

const AmountPage: React.FC<{
  path: string;
  values: Pick<Values, "price_fixed">;
}> = ({ path, values }) => {
  return (
    <>
      <PageTitle title="Is the payment for a fixed amount?" />
      <Checkbox<boolean> name="price_fixed" label="Yes" />
      {values.price_fixed ? (
        <Field
          name="price"
          label="Enter the amount"
          validate={validators.required("Enter the amount")}
        >
          {({ input, ariaProps, ...rest }) => (
            <BasicTextInput {...input} {...ariaProps} {...rest} />
          )}
        </Field>
      ) : null}
      <LinkButton to={`${path}/review`}>Continue</LinkButton>
    </>
  );
};

export default AmountPage;
