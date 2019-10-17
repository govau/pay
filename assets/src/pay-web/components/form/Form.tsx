import * as React from "react";
import {
  Form as ReactFinalForm,
  FormProps as ReactFinalFormProps
} from "react-final-form";
import createDecorator from "final-form-focus";
import styled, { css } from "../../styled-components";
import ErrorAlert from "../ErrorAlert";

interface AnyObject {
  [key: string]: any;
}

export type OnSubmitFn = (
  event?: React.SyntheticEvent<HTMLFormElement>
) => Promise<AnyObject | undefined> | undefined;

interface Props<FormValues = AnyObject>
  extends ReactFinalFormProps<FormValues> {
  submitError?: string | null;
  submitErrorTitle?: string;
  column?: boolean;
}

export const FormElement = styled("form")<{ column?: boolean }>`
  ${props =>
    props.column &&
    css`
      input {
        width: 100%;
      }
    `}
`;

const focusOnErrors = createDecorator();

const formatGraphqlError = (message?: string | null) =>
  message ? message.replace("GraphQL error: ", "") : "";

function Form<FormValues = AnyObject>({
  children,
  submitError,
  submitErrorTitle,
  column,
  ...rest
}: Props<FormValues>) {
  return (
    <ReactFinalForm {...rest} decorators={[focusOnErrors]}>
      {({ handleSubmit, ...renderRest }) => (
        <>
          <ErrorAlert
            showError={Boolean(submitError)}
            title={submitErrorTitle || "Submission error"}
            message={
              formatGraphqlError(submitError) ||
              "There was an error submitting the form"
            }
          />
          <FormElement column={column} onSubmit={handleSubmit} noValidate>
            {typeof children === "function"
              ? children({ handleSubmit, ...renderRest })
              : children}
          </FormElement>
        </>
      )}
    </ReactFinalForm>
  );
}

// NakedForm lets the caller provide their own FormElement. This is useful for
// multi-page forms / wizards where you want to have a submit button on each
// page of the form that submits the form naturally.
// NakedForm is a very thin wrapper around Final Form's Form element.
export function NakedForm<FormValues = AnyObject>({
  children,
  submitError,
  submitErrorTitle,
  column,
  ...rest
}: Props<FormValues>) {
  return (
    <ReactFinalForm {...rest} decorators={[focusOnErrors]}>
      {children}
    </ReactFinalForm>
  );
}

export default Form;
