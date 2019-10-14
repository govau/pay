import * as React from "react";
import { Field } from "react-final-form";

import { Props as RadioProps, Wrapper, Checkmark } from "./Radio";

export function BooleanRadio({ label, name, value }: RadioProps<boolean>) {
  return (
    <Wrapper>
      <Field
        name={name}
        value={value}
        component="input"
        type="radio"
        parse={value => {
          if (!value) {
            return value;
          }
          if (value === "true") {
            return true;
          }
          return false;
        }}
      />
      <Checkmark />
      {label}
    </Wrapper>
  );
}

interface Props {
  name: string;
}

const BooleanRadioGroup: React.FC<Props> = ({ name }) => (
  <>
    <BooleanRadio name={name} value={true} label="Yes" />
    <BooleanRadio name={name} value={false} label="No" />
  </>
);

export default BooleanRadioGroup;
