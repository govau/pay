import * as React from "react";
import {
  PageTitle,
  LinkButton,
  Field,
  BooleanRadio,
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
      <BooleanRadio name="price_fixed" value={true} label="Yes" />
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
      <BooleanRadio name="price_fixed" value={false} label="No" />
      <LinkButton to={`${path}/review`}>Continue</LinkButton>
    </>
  );
};

export default AmountPage;
