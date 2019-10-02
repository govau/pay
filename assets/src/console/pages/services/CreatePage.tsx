import * as React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { ApolloError } from "apollo-client";
import {
  PageTitle,
  Form,
  Field,
  BasicTextInput,
  Button,
  validators,
  Loader,
  ErrorAlert,
  tablet
} from "@pay/web";
import styled from "@pay/web/styled-components";

import {
  CreateServiceMutationFn,
  useCreateServiceMutation
} from "../../__generated__/graphql";
import { isServerError } from "../../../apollo-rest-utils";

const InputWrapper = styled.div`
  ${BasicTextInput} {
    @media ${tablet} {
      min-width: 50rem;
    }
  }
`;

interface FormValues {
  name: string;
}

const getErrorMessage = (error?: ApolloError) => {
  if (!error) {
    return "";
  }
  if (error.networkError && isServerError(error.networkError)) {
    const { result } = error.networkError;
    return Object.keys(result.errors)
      .map(key => `${key} ${result.errors[key]}`)
      .join(", ");
  }
  return error.message;
};

const onSubmit = (createService: CreateServiceMutationFn) => {
  return async (values: FormValues) => {
    try {
      const { name } = values;
      await createService({ variables: { input: { service: { name } } } });
    } catch (e) {}
  };
};

const CreatePage = () => {
  const [createService, { loading, error, data }] = useCreateServiceMutation({
    errorPolicy: "all"
  });

  return (
    <>
      <Helmet>
        <title>Create service</title>
      </Helmet>
      <PageTitle
        title="What service will you be taking payments for?"
        grouped
      />
      <Form onSubmit={onSubmit(createService)}>
        {loading ? (
          <Loader message="Creating a new service" />
        ) : data && data.service ? (
          <Redirect to="/console" />
        ) : (
          <>
            <ErrorAlert
              title="Unable to create service"
              message={getErrorMessage(error)}
              showError={!!error}
            />

            <Field
              name="name"
              label="Service name"
              description="This is what your users will see when making a payment. You can change this later."
              validate={validators.required("Enter a service name")}
            >
              {({ input, ariaProps, ...rest }) => (
                <InputWrapper>
                  <BasicTextInput {...input} {...ariaProps} {...rest} />
                </InputWrapper>
              )}
            </Field>
            <Button type="submit">Create</Button>
          </>
        )}
      </Form>
    </>
  );
};

export default CreatePage;
