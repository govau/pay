import * as React from "react";
import {
  Form as ReactFinalForm,
  FormProps as ReactFinalFormProps
} from "react-final-form";
import createDecorator from "final-form-focus";
import styled from "../../styled-components";
import ErrorAlert from "../ErrorAlert";

interface FormProps extends ReactFinalFormProps {
  children: React.ReactNode;
  onSubmit: (values: any) => void;
  submitError?: string | null;
  submitErrorTitle?: string;
  initialValues?: {
    [key: string]: string | number | boolean | (string | number)[];
  };
  column?: boolean;
}

const FormElem = styled("form")<{ column?: boolean }>`
  ${props =>
    props.column &&
    `
    input {
      width: 100%;
    }
  `}
`;

const focusOnErrors = createDecorator();

const formatGraphqlError = (message?: string | null) =>
  message ? message.replace("GraphQL error: ", "") : "";

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  submitError,
  submitErrorTitle,
  column,
  ...rest
}) => (
  <ReactFinalForm onSubmit={onSubmit} {...rest} decorators={[focusOnErrors]}>
    {({ handleSubmit }) => (
      <>
        <ErrorAlert
          showError={!!submitError}
          title={submitErrorTitle || "Submission error"}
          message={
            formatGraphqlError(submitError) ||
            "There was an error submitting the form"
          }
        />
        <FormElem column={column} onSubmit={handleSubmit} noValidate>
          {children}
        </FormElem>
      </>
    )}
  </ReactFinalForm>
);

export default Form;
