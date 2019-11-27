import * as React from "react";
import { Helmet } from "react-helmet";
import { TODO, PageTitle, Loader, ErrorAlert } from "@pay/web";

import {
  useGetServiceWithUsersQuery,
  GetServiceWithUsersQuery,
  ServiceUser
} from "../../__generated__/graphql";
import { partitionByRole } from "./team";

const RoleTable: React.FC<{
  heading: string;
  users: ServiceUser[];
}> = ({ heading, users }) =>
  users.length ? (
    <>
      <h2>
        {heading} <small>({users.length})</small>
      </h2>
      <ul>
        {users.map(u => (
          <li key={u.externalId}>
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
      <RoleTable heading="Administrators" users={partitioned.admin} />
      <RoleTable
        heading="View and refund"
        users={partitioned.view_and_refund}
      />
      <RoleTable heading="View only" users={partitioned.view_only} />
    </>
  );
};

export interface props {
  service: { externalId: string };
}

const TeamPage: React.FC<props> = ({ service }) => {
  const getQuery = useGetServiceWithUsersQuery({
    variables: { id: service.externalId },
    errorPolicy: "all"
  });

  return (
    <TODO>
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
          <PageTitle title="Team members" />
          {renderRoleTables(getQuery.data)}
        </>
      )}
    </TODO>
  );
};

export default TeamPage;
