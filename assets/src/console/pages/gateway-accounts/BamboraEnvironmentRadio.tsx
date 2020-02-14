import * as React from "react";
import { Field } from "react-final-form";
import { Environment as BamboraEnvironment } from "@bambora/apac-custom-checkout-sdk-web";
import { generateId } from "@pay/web/lib/utils";
import {
  Props as RadioProps,
  Wrapper,
  Checkmark
} from "@pay/web/components/form/Radio";
import FieldError from "@pay/web/components/form/FieldError";
import ScreenreaderText from "@pay/web/components/ScreenReaderText";

export default function BamboraEnvironmentRadio({
  label,
  name,
  value,
  first = false
}: RadioProps<BamboraEnvironment>) {
  const [fieldId] = React.useState(generateId(`${name}-`));
  const [errorId] = React.useState(generateId(`${name}-error-`));

  return (
    <Field
      name={name}
      value={value}
      type="radio"
      parse={value => {
        switch (value) {
          case "TEST":
            return BamboraEnvironment.Test;
          case "LIVE":
            return BamboraEnvironment.Live;
          default:
            return value;
        }
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
