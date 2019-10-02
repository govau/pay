import * as React from "react";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
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
  tablet,
  Warning,
  P
} from "@pay/web";
import styled from "@pay/web/styled-components";

import {
  useGetServiceQuery,
  UpdateServiceMutationFn,
  useUpdateServiceMutation
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

const onSubmit = (id: string, updateService: UpdateServiceMutationFn) => {
  return async (values: FormValues) => {
    try {
      const { name } = values;
      await updateService({ variables: { id, input: { service: { name } } } });
    } catch (e) {}
  };
};

const EditNamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const getQuery = useGetServiceQuery({
    variables: { id },
    errorPolicy: "all"
  });

  const [updateService, updateMutation] = useUpdateServiceMutation({
    errorPolicy: "all"
  });

  return (
    <>
      {getQuery.loading ? (
        <Loader message="Loading service" />
      ) : getQuery.error || !getQuery.data ? (
        <ErrorAlert
          title="Unable to retrieve service"
          message={getQuery.error && getQuery.error.message}
          showError
        />
      ) : (
        <>
          <Helmet>
            <title>Edit name - {getQuery.data.service.name}</title>
          </Helmet>
          <PageTitle title="Edit service name" grouped />
          <Form
            onSubmit={onSubmit(id, updateService)}
            initialValues={{ name: getQuery.data.service.name }}
          >
            {updateMutation.loading ? (
              <Loader message="Updating service name" />
            ) : updateMutation.data && updateMutation.data.service ? (
              <Redirect
                to={`/console/services/${updateMutation.data.service.id}`}
              />
            ) : (
              <>
                <Warning>
                  <P>Take care when changing your service name.</P>
                  <P>
                    Changing your service name affects both live and test
                    environments, including user-facing payment pages and
                    emails.
                  </P>
                </Warning>
                <ErrorAlert
                  title="Unable to update service name"
                  message={getErrorMessage(updateMutation.error)}
                  showError={!!updateMutation.error}
                />
                <Field
                  name="name"
                  label="Service name"
                  description="This is what your users will see when making a payment."
                  validate={validators.required("Enter a service name")}
                >
                  {({ input, ariaProps, ...rest }) => (
                    <InputWrapper>
                      <BasicTextInput {...input} {...ariaProps} {...rest} />
                    </InputWrapper>
                  )}
                </Field>
                <Button type="submit">Save</Button>
              </>
            )}
          </Form>
        </>
      )}
    </>
  );
};

export default EditNamePage;
