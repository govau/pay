import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert } from "@pay/web";

import {
  useGetServiceWithUsersQuery,
  GetServiceWithUsersQuery,
  Service
} from "../../__generated__/graphql";
import { User, partitionByRole } from "./team";

const RoleTable: React.FC<{
  heading: string;
  users: User[];
}> = ({ heading, users }) =>
  users.length ? (
    <>
      <h2>
        {heading} <small>({users.length})</small>
      </h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            <a href={`mailto:${u.email}`}>{u.email}</a>
          </li>
        ))}
      </ul>
    </>
  ) : null;

const renderRoleTables = (data: GetServiceWithUsersQuery) => {
  const partitioned = partitionByRole(data.service.users);

  return (
    <>
      <RoleTable heading="Administrators" users={partitioned.admin.users} />
      <RoleTable
        heading="View and refund"
        users={partitioned.view_and_refund.users}
      />
      <RoleTable heading="View only" users={partitioned.view_only.users} />
    </>
  );
};

const TeamPage: React.FC<{
  service: Service;
}> = ({ service }) => {
  const getQuery = useGetServiceWithUsersQuery({
    variables: { id: service.id },
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
            <title>Team members - {getQuery.data.service.name}</title>
          </Helmet>
          <PageTitle title="Team members" grouped />
          {renderRoleTables(getQuery.data)}
        </>
      )}
    </>
  );
};

export default TeamPage;
