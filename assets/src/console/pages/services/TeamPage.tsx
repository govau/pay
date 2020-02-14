import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Link } from "@pay/web";
import * as Table from "@pay/web/components/Table";

import { ServiceUser, ServiceInvite } from "../../__generated__/graphql";
import { BreadBox } from "@pay/web/components/Breadcrumb";
import { usePayUser } from "../../../users";
import { User } from "../../../users/types";
import { SidebarLayout } from "../../../checkout/components/Split";
import { useMatchURL } from "@pay/web/hooks";

const MemberTable: React.FC<{
  serviceID: string;
  currentUser: User | undefined;
  users: ServiceUser[];
  invites: ServiceInvite[];
}> = ({ serviceID, currentUser, users, invites }) => (
  <Table.ResponsiveWrapper>
    <Table.Table>
      <thead>
        <Table.Row>
          <Table.Header>Email address</Table.Header>
          <Table.Header>Role</Table.Header>
          <Table.Header>Status</Table.Header>
        </Table.Row>
      </thead>
      <tbody>
        {users.map(user => (
          <Table.Row key={user.email}>
            <Table.Cell>
              <Link
                to={`/console/services/${serviceID}/manage-user/${user.externalId}`}
              >
                {user.email}
              </Link>
              {currentUser && currentUser.email === user.email
                ? " (you)"
                : null}
            </Table.Cell>
            <Table.Cell>{user.role.description}</Table.Cell>
            <Table.Cell>Active</Table.Cell>
          </Table.Row>
        ))}

        {invites.map(invite => (
          <Table.Row key={`invite-${invite.email}`}>
            <Table.Cell> {invite.email}</Table.Cell>
            <Table.Cell>{invite.role.description}</Table.Cell>
            <Table.Cell>Invited</Table.Cell>
          </Table.Row>
        ))}
      </tbody>
    </Table.Table>
  </Table.ResponsiveWrapper>
);

export interface props {
  service: {
    externalId: string;
    name: string;
    users: ServiceUser[];
    invites: ServiceInvite[];
  };
}

const TeamPage: React.FC<props> = ({ service }) => {
  const user = usePayUser();
  const currentURL = useMatchURL();

  return (
    <>
      <Helmet>
        <title>Team members - {service.name}</title>
      </Helmet>
      <PageTitle
        title="Team members"
        breadcrumbs={BreadBox.TeamSettings({ service })}
      />

      <SidebarLayout
        sidebar={<Link to={`${currentURL}/invite`}>Invite new user</Link>}
      >
        <MemberTable
          serviceID={service.externalId}
          users={service.users}
          invites={service.invites}
          currentUser={user}
        />
      </SidebarLayout>
    </>
  );
};

export default TeamPage;
