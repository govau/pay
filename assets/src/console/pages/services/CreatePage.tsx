import * as React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import { ApolloError } from "apollo-client";
import createDecorator from "final-form-focus";
import {
  PageTitle,
  Form,
  Field,
  BasicTextInput,
  Button,
  validators,
  Loader,
  ErrorAlert
} from "@pay/web";

import {
  CreateServiceMutationFn,
  useCreateServiceMutation
} from "../../__generated__/graphql";
import { isServerError } from "../../../apollo-rest-utils";
import { BreadBox } from "@pay/web/components/Breadcrumb";

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

const handleSubmit = (createService: CreateServiceMutationFn) => {
  return async (values: FormValues) => {
    try {
      const { name } = values;
      await createService({ variables: { input: { name } } });
    } catch (e) {}
  };
};

const decorators = [createDecorator<FormValues>()];

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
        breadcrumbs={BreadBox.CreateService()}
      />
      <Form<FormValues>
        onSubmit={handleSubmit(createService)}
        column
        decorators={decorators}
      >
        {loading ? (
          <Loader message="Creating a new service" />
        ) : data && data.service ? (
          <Redirect to="/console" />
        ) : (
          <>
            <ErrorAlert
              title="Unable to create service"
              message={getErrorMessage(error)}
              showError={Boolean(error)}
            />

            <Field
              name="name"
              label="Service name"
              description="This is what your users will see when making a payment. You can change this later."
              validate={validators.required("Enter a service name")}
            >
              {({ input, ariaProps, ...rest }) => (
                <BasicTextInput {...input} {...ariaProps} {...rest} />
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
