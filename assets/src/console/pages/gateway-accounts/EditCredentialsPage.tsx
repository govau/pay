import * as React from "react";
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
  Warning,
  P
} from "@pay/web";

import {
  Service,
  GatewayAccountPaymentProvider,
  BamboraCredentials
} from "../../../__generated__/schema";
import {
  UpdateGatewayAccountCredentialsMutationFn,
  useUpdateGatewayAccountCredentialsMutation,
  GatewayAccountFragment
} from "../../__generated__/graphql";
import { isServerError } from "../../../apollo-rest-utils";
import {
  gatewayAccountFullType,
  isBamboraCredentials
} from "../../../payments";

interface FormValues {
  merchant_id: string;
  account_number: string;
  api_username: string;
  api_password: string;
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

const handleSubmit = (
  id: string,
  updateCredentials: UpdateGatewayAccountCredentialsMutationFn
) => {
  return async (values: FormValues) => {
    try {
      await updateCredentials({
        variables: { gatewayAccountId: id, input: { credentials: values } }
      });
    } catch (e) {}
  };
};

const EditBamboraCredentialsPage: React.FC<{
  path: string;
  service: Service;
  gatewayAccount: Omit<GatewayAccountFragment, "credentials"> & {
    credentials: BamboraCredentials & { api_password?: string };
  };
}> = ({ path, service, gatewayAccount }) => {
  const [
    updateCredentials,
    updateMutation
  ] = useUpdateGatewayAccountCredentialsMutation({
    errorPolicy: "all"
  });

  return (
    <>
      <Helmet>
        <title>
          Edit account credentials - {service.name} -{" "}
          {gatewayAccountFullType(gatewayAccount)}
        </title>
      </Helmet>
      <PageTitle title="Account credentials" />
      <Form
        onSubmit={handleSubmit(gatewayAccount.id, updateCredentials)}
        initialValues={{
          merchant_id: gatewayAccount.credentials.merchant_id || "",
          account_number: gatewayAccount.credentials.account_number || "",
          api_username: gatewayAccount.credentials.api_username || "",
          api_password: gatewayAccount.credentials.api_password || ""
        }}
        column
      >
        {updateMutation.loading ? (
          <Loader message="Updating account credentials" />
        ) : updateMutation.data && updateMutation.data.credentials ? (
          <Redirect to={path} />
        ) : (
          <>
            <Warning>
              <P>Take care when changing your account credentials.</P>
              <P>
                Changing your account credentials affects our ability to process
                payments for your service. Ensure that you enter the correct
                credentials that were given to you by Bambora.
              </P>
            </Warning>
            <ErrorAlert
              title="Unable to update account credentials"
              message={getErrorMessage(updateMutation.error)}
              showError={Boolean(updateMutation.error)}
            />
            <Field
              name="merchant_id"
              label="Merchant ID"
              description="This should be a UUID/GUID. For example, “21019d65-bf62-437b-b51d-30ec2107193f”."
              validate={validators.required("Enter a merchant ID")}
            >
              {({ input, ariaProps, ...rest }) => (
                <BasicTextInput {...input} {...ariaProps} {...rest} />
              )}
            </Field>
            <Field
              name="account_number"
              label="Account number (optional)"
              description="Only required if an account number was given to you by Bambora."
            >
              {({ input, ariaProps, ...rest }) => (
                <BasicTextInput {...input} {...ariaProps} {...rest} />
              )}
            </Field>
            <Field
              name="api_username"
              label="API username"
              description="This is the API username given to you by Bambora. For example, “YourOrg.live.api”."
              validate={validators.required("Enter an API username")}
            >
              {({ input, ariaProps, ...rest }) => (
                <BasicTextInput {...input} {...ariaProps} {...rest} />
              )}
            </Field>
            <Field
              name="api_password"
              label="API password"
              description="This is the API password given to you by Bambora."
              validate={validators.required("Enter an API password")}
              type="password"
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

const EditCredentialsPage: React.FC<{
  path: string;
  service: Service;
  gatewayAccount: GatewayAccountFragment;
}> = ({ path, service, gatewayAccount }) => (
  <>
    {gatewayAccount.payment_provider ===
      GatewayAccountPaymentProvider.Sandbox && <Redirect to={path} />}
    {gatewayAccount.payment_provider ===
      GatewayAccountPaymentProvider.Bambora &&
      isBamboraCredentials(gatewayAccount, gatewayAccount.credentials) && (
        <EditBamboraCredentialsPage
          path={path}
          service={service}
          gatewayAccount={{
            ...gatewayAccount,
            credentials: gatewayAccount.credentials
          }}
        />
      )}
  </>
);

export default EditCredentialsPage;
