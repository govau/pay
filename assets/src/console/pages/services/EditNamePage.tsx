import * as React from "react";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  ErrorAlert,
  Warning,
  P
} from "@pay/web";

import {
  UpdateServiceMutationFn,
  useUpdateServiceMutation
} from "../../__generated__/graphql";
import { isServerError } from "../../../apollo-rest-utils";
import { BreadBox } from "@pay/web/components/Breadcrumb";

interface FormValues {
  name: string;
}

export interface props {
  service: { externalId: string; name: string };
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

const handleSubmit = (id: string, updateService: UpdateServiceMutationFn) => {
  return async (values: FormValues) => {
    try {
      const { name } = values;
      await updateService({ variables: { id, input: { name } } });
    } catch (e) {}
  };
};

const decorators = [createDecorator<FormValues>()];

const EditNamePage: React.FC<props> = ({ service }) => {
  const [updateService, updateMutation] = useUpdateServiceMutation({
    errorPolicy: "all"
  });

  return (
    <>
      <Helmet>
        <title>Edit name - {service.name}</title>
      </Helmet>
      <PageTitle
        title="Edit service name"
        breadcrumbs={BreadBox.EditServiceName({ service })}
      />
      <Form<FormValues>
        onSubmit={handleSubmit(service.externalId, updateService)}
        initialValues={{ name: service.name }}
        column
        decorators={decorators}
      >
        {updateMutation.loading ? (
          <Loader message="Updating service name" />
        ) : updateMutation.data && updateMutation.data.service ? (
          <Redirect
            to={`/console/services/${updateMutation.data.service.externalId}`}
          />
        ) : (
          <>
            <Warning>
              <P>Take care when changing your service name.</P>
              <P>
                Changing your service name affects both live and test
                environments, including user-facing payment pages and emails.
              </P>
            </Warning>
            <ErrorAlert
              title="Unable to update service name"
              message={getErrorMessage(updateMutation.error)}
              showError={Boolean(updateMutation.error)}
            />
            <Field
              name="name"
              label="Service name"
              description="This is what your users will see when making a payment."
              validate={validators.required("Enter a service name")}
            >
              {({ input, ariaProps, ...rest }) => (
                <BasicTextInput {...input} {...ariaProps} {...rest} />
              )}
            </Field>
            <Button type="submit">Save</Button>
          </>
        )}
      </Form>
    </>
  );
};

export default EditNamePage;
