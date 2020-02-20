import * as React from "react";
import {
  Form as ReactFinalForm,
  FormProps as ReactFinalFormProps
} from "react-final-form";

import styled from "../../styled-components";
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

export const FormElement = styled("form")<{ column?: boolean }>``;

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
    <ReactFinalForm {...rest}>
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

export default Form;
