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
import { Label, Description } from "@pay/web/components/form";
import { Environment as BamboraEnvironment } from "@bambora/apac-custom-checkout-sdk-web";
import {
  PaymentProviderLabel,
  BamboraCredentials
} from "../../../__generated__/schema";
import {
  GetGatewayAccountDocument,
  UpdateGatewayAccountCredentialsMutationFn,
  useUpdateGatewayAccountCredentialsMutation,
  GatewayAccountFragment,
  ServiceFragment
} from "../../__generated__/graphql";
import { isServerError } from "../../../apollo-rest-utils";
import {
  gatewayAccountFullType,
  isBamboraCredentials
} from "../../../payments";
import BamboraEnvironmentRadio from "./BamboraEnvironmentRadio";

interface FormValues {
  environment: string; // TODO: want to use BamboraEnvironment not string
  merchantId: string;
  accountNumber: string;
  apiUsername: string;
  apiPassword: string;
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
        variables: { gatewayAccountId: id, input: values },
        refetchQueries: [
          {
            query: GetGatewayAccountDocument,
            variables: { id }
          }
        ]
      });
    } catch (e) {}
  };
};

const decorators = [createDecorator<FormValues>()];

const EditBamboraCredentialsPage: React.FC<{
  path: string;
  service: ServiceFragment;
  gatewayAccount: Omit<GatewayAccountFragment, "credentials"> & {
    credentials: BamboraCredentials & { apiPassword?: string };
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
      <Form<FormValues>
        onSubmit={handleSubmit(gatewayAccount.externalId, updateCredentials)}
        initialValues={{
          environment:
            gatewayAccount.credentials.environment || BamboraEnvironment.Live,
          merchantId: gatewayAccount.credentials.merchantId || "",
          accountNumber: gatewayAccount.credentials.accountNumber || "",
          apiUsername: gatewayAccount.credentials.apiUsername || "",
          apiPassword: gatewayAccount.credentials.apiPassword || ""
        }}
        column
        decorators={decorators}
      >
        {updateMutation.loading ? (
          <Loader message="Updating account credentials" />
        ) : updateMutation.data &&
          updateMutation.data.gatewayAccount.credentials ? (
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
            <Label>Environment</Label>
            <Description>
              This is the type of environment that Bambora created for you. If
              you are unsure, choose the live environment.
            </Description>
            <BamboraEnvironmentRadio
              name="environment"
              value={BamboraEnvironment.Test}
              label="Test"
              first
            />
            <BamboraEnvironmentRadio
              name="environment"
              value={BamboraEnvironment.Live}
              label="Live"
            />
            <Field
              name="merchantId"
              label="Merchant ID"
              description="This should be a UUID/GUID. For example, “21019d65-bf62-437b-b51d-30ec2107193f”."
              validate={validators.required("Enter a merchant ID")}
            >
              {({ input, ariaProps, ...rest }) => (
                <BasicTextInput {...input} {...ariaProps} {...rest} />
              )}
            </Field>
            <Field
              name="accountNumber"
              label="Account number (optional)"
              description="Only required if an account number was given to you by Bambora."
            >
              {({ input, ariaProps, ...rest }) => (
                <BasicTextInput {...input} {...ariaProps} {...rest} />
              )}
            </Field>
            <Field
              name="apiUsername"
              label="API username"
              description="This is the API username given to you by Bambora. For example, “YourOrg.live.api”."
              validate={validators.required("Enter an API username")}
            >
              {({ input, ariaProps, ...rest }) => (
                <BasicTextInput {...input} {...ariaProps} {...rest} />
              )}
            </Field>
            <Field
              name="apiPassword"
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
  service: ServiceFragment;
  gatewayAccount: GatewayAccountFragment;
}> = ({ path, service, gatewayAccount }) => (
  <>
    {gatewayAccount.paymentProvider === PaymentProviderLabel.Sandbox && (
      <Redirect to={path} />
    )}
    {gatewayAccount.paymentProvider === PaymentProviderLabel.Bambora &&
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
