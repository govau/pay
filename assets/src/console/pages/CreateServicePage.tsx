import * as React from "react";
import { Redirect } from "react-router-dom";
import {
  PageContent,
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
} from "../__generated__/graphql";

interface FormValues {
  name: string;
  pushEndpoint: string;
}

const onSubmit = (createService: CreateServiceMutationFn) => {
  return async (values: FormValues) => {
    try {
      const { name } = values;
      await createService({ variables: { input: { service: { name } } } });
    } catch (e) {}
  };
};

const CreateServicePage = () => {
  const [createService, { loading, error, data }] = useCreateServiceMutation({
    errorPolicy: "all"
  });

  return (
    <PageContent>
      <PageTitle
        title="What service will you be taking payments for?"
        grouped
      />
      <Form onSubmit={onSubmit(createService)}>
        {loading ? (
          <Loader message="Creating a new service" />
        ) : data && data.createService ? (
          <Redirect to="/console" />
        ) : (
          <>
            <ErrorAlert
              title="Unable to create service"
              message={error && error.message}
              showError={!!error}
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
    </PageContent>
  );
};

export default CreateServicePage;
