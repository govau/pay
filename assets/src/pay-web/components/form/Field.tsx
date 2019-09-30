/**
 * Field renders an input with a label.
 */

import * as React from "react";
import {
  Field as FinalFormField,
  FieldProps as FinalFormFieldProps,
  FieldRenderProps
} from "react-final-form";
import { generateId } from "../../lib/utils";
import { Label, Description } from "./inputs";
import FieldError from "./FieldError";
import ScreenreaderText from "../ScreenReaderText";

export interface AriaProps {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string;
  spellCheck: boolean;
}

interface ChildRenderProps<FieldValue = any>
  extends FieldRenderProps<FieldValue, HTMLInputElement> {
  ariaProps: AriaProps;
  labelId: string;
  error: boolean;
}

interface FieldProps<FieldValue = any>
  extends FinalFormFieldProps<FieldValue, HTMLInputElement> {
  children: (props: ChildRenderProps) => React.ReactNode;
  name: string;
  label: string;
  /** Sits below the label. Can be used to provide extra information about the field. */
  description?: string;
  ariaLabel?: string;
}

class Field extends React.Component<FieldProps> {
  errorId: string;
  fieldId: string;
  labelId: string;

  constructor(props: FieldProps) {
    super(props);
    this.errorId = generateId(`error-${props.name}-`);
    this.fieldId = generateId(`${props.name}-`);
    this.labelId = generateId(`${props.name}-label-`);
  }

  render() {
    const {
      children,
      label,
      ariaLabel,
      description,
      name,
      ...rest
    } = this.props;
    return (
      <FinalFormField
        name={name}
        render={({ input, meta }) => {
          const showError = Boolean(meta.error && meta.submitFailed);
          const ariaProps = {
            id: this.fieldId,
            "aria-invalid": showError,
            "aria-describedby": this.errorId,
            spellCheck: false
          };

          return (
            <>
              <Label id={this.labelId} htmlFor={this.fieldId}>
                <span aria-hidden={!!ariaLabel}>{label}</span>
                {ariaLabel && <ScreenreaderText>{ariaLabel}</ScreenreaderText>}
              </Label>
              {description && <Description>{description}</Description>}
              {showError && (
                <FieldError id={this.errorId}>{meta.error}</FieldError>
              )}
              {children({
                input,
                meta,
                ariaProps,
                labelId: this.labelId,
                error: showError
              })}
            </>
          );
        }}
        {...rest}
      />
    );
  }
}

export default Field;
