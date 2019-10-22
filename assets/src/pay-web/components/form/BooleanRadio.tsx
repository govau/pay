import * as React from "react";
import { Field } from "react-final-form";
import { generateId } from "@pay/web/lib/utils";

import { Props as RadioProps, Wrapper, Checkmark } from "./Radio";
import FieldError from "./FieldError";
import ScreenreaderText from "../ScreenReaderText";

export default function BooleanRadio({
  label,
  name,
  value,
  first = false
}: RadioProps<boolean>) {
  const [fieldId] = React.useState(generateId(`${name}-`));
  const [errorId] = React.useState(generateId(`${name}-error-`));

  return (
    <Field
      name={name}
      value={value}
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
      render={({ input, meta }) => {
        const error = meta.touched ? meta.error || meta.submitError : null;
        const showError = first && Boolean(error);
        const ariaProps = {
          id: fieldId,
          "aria-invalid": Boolean(error),
          "aria-describedby": showError ? errorId : undefined,
          spellCheck: false
        };
        const { value, ...inputRest } = input;

        return (
          <>
            {showError && (
              <>
                <ScreenreaderText>Error: </ScreenreaderText>
                <FieldError id={errorId}>{error}</FieldError>
              </>
            )}
            <Wrapper>
              <input {...inputRest} value={String(value)} {...ariaProps} />
              <Checkmark />
              {label}
            </Wrapper>
          </>
        );
      }}
    />
  );
}
