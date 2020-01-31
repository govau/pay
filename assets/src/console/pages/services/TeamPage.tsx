import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert, Link } from "@pay/web";
import * as Table from "@pay/web/components/Table";

import {
  useGetServiceWithUsersQuery,
  ServiceUser
} from "../../__generated__/graphql";
import { BreadBox } from "@pay/web/components/Breadcrumb";
import { usePayUser } from "../../../users";
import { User } from "../../../users/types";
import { SidebarLayout } from "../../../checkout/components/Split";

const MemberTable: React.FC<{
  serviceID: string;
  currentUser: User | undefined;
  users: ServiceUser[];
}> = ({ serviceID, users, currentUser }) => (
  <Table.ResponsiveWrapper>
    <Table.Table>
      <thead>
        <Table.Row>
          <Table.Header>Email address</Table.Header>
          <Table.Header>Role</Table.Header>
          <Table.Header>Last login date</Table.Header>
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
            <Table.Cell>{user.updatedAt}</Table.Cell>
          </Table.Row>
        ))}
      </tbody>
    </Table.Table>
  </Table.ResponsiveWrapper>
);

export interface props {
  service: { externalId: string };
}

const TeamPage: React.FC<props> = ({ service }) => {
  const getQuery = useGetServiceWithUsersQuery({
    variables: { id: service.externalId },
    errorPolicy: "all"
  });

  const user = usePayUser();

  return getQuery.loading ? (
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
        <title>Team members - {getQuery.data.service.name}</title>
      </Helmet>
      <PageTitle
        title="Team members"
        breadcrumbs={BreadBox.TeamSettings({ service })}
      />

      <SidebarLayout sidebar={<Link to="/invite">Invite new user</Link>}>
        <MemberTable
          serviceID={getQuery.data.service.externalId}
          users={getQuery.data.service.users}
          currentUser={user}
        />
      </SidebarLayout>
    </>
  );
};

export default TeamPage;
