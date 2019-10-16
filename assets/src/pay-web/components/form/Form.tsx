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

interface Props<FormValues = AnyObject>
  extends ReactFinalFormProps<FormValues> {
  submitError?: string | null;
  submitErrorTitle?: string;
  column?: boolean;
}

const FormElem = styled("form")<{ column?: boolean }>`
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
          <FormElem column={column} onSubmit={handleSubmit} noValidate>
            {typeof children === "function"
              ? children({ handleSubmit, ...renderRest })
              : children}
          </FormElem>
        </>
      )}
    </ReactFinalForm>
  );
}

export default Form;
