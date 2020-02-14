import * as React from "react";
import { Helmet } from "react-helmet";
import {
  PageTitle,
  Radio,
  BasicTextInput,
  Field,
  Button,
  Form,
  Fieldset,
  LinkButton,
  ErrorAlert
} from "@pay/web";

import { BreadBox } from "@pay/web/components/Breadcrumb";
import { useInviteUserMutation } from "../../__generated__/graphql";
import { Redirect } from "react-router-dom";

export interface props {
  service: { id: string; externalId: string; name: string };
  roles: { description: string; name: string }[];
}

interface FormValues {
  email: string;
  role: string;
}

const roleDescriptions = {
  super_admin: (
    <>
      <div>View transactions</div>
      <div>Refund payments</div>
      <div>Manage settings</div>
    </>
  ),
  admin: (
    <>
      <div>View transactions</div>
      <div>Refund payments</div>
      <div>Manage settings</div>
    </>
  ),
  view_and_refund: (
    <>
      <div>View transactions</div>
      <div>Refund payments</div>
      <div>Cannot manage settings</div>
    </>
  ),
  view_only: (
    <>
      <div>View transactions</div>
      <div>Cannot refund payments</div>
      <div>Cannot manage settings</div>
    </>
  )
};

const RoleDescription: React.FC<{ role?: string }> = ({ role }) => {
  return roleDescriptions[role as keyof typeof roleDescriptions] || null;
};

const TeamInvitePage: React.FC<props> = ({ service, roles }) => {
  const [
    inviteUser,
    { data, loading, error: inviteError }
  ] = useInviteUserMutation({
    refetchQueries: ["GetServiceWithGatewayAccounts"]
  });

  return (
    <>
      <Helmet>
        <title>Team members - {service.name}</title>
      </Helmet>
      <PageTitle
        title="Invite a team member"
        breadcrumbs={BreadBox.InviteTeamMember({ service })}
      />

      {inviteError ? (
        <ErrorAlert
          title="Error inviting user"
          message={inviteError && inviteError.message}
          showError
        ></ErrorAlert>
      ) : null}

      <Form<FormValues>
        onSubmit={async ({ email, role }) =>
          await inviteUser({
            variables: { serviceID: service.id, email, role }
          })
        }
        column
      >
        <>
          <Field name="email" label="Email address">
            {({ input, ariaProps, ...rest }) => (
              <BasicTextInput {...input} {...ariaProps} {...rest} />
            )}
          </Field>

          <Fieldset legend="Permission level">
            {roles.map(role => (
              <Radio
                name="role"
                value={role.name}
                label={role.description}
                key={role.name}
                hint={<RoleDescription role={role.name} />}
              />
            ))}
          </Fieldset>
        </>

        <Button type="submit" disabled={loading}>
          Invite user
        </Button>
        <LinkButton
          variant="link"
          to={`/console/services/${service.externalId}/team`}
        >
          Cancel
        </LinkButton>

        {data ? (
          <Redirect to={`/console/services/${service.externalId}/team`} />
        ) : null}
      </Form>
    </>
  );
};

export default TeamInvitePage;
