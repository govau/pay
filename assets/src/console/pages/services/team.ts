import { GetServiceWithUsersQuery } from "../../__generated__/graphql";

// Return a type that is the property P from the type T.
type PickProperty<T, P extends keyof T> = T[P];

// Return a type that is the non-array form of the type T.
type NonArray<T> = T extends Array<infer U> ? U : T;

type ServiceUsers = PickProperty<
  PickProperty<GetServiceWithUsersQuery, "service">,
  "users"
>;

export type User = PickProperty<NonNullable<NonArray<ServiceUsers>>, "user">;

type Role = "admin" | "view_and_refund" | "view_only";

type UsersByRole = Record<
  Role,
  {
    users: User[];
  }
> & {
  [key: string]: { users: User[] };
};

export const partitionByRole = (users: ServiceUsers) => {
  const initial: UsersByRole = {
    admin: { users: [] },
    view_and_refund: { users: [] },
    view_only: { users: [] }
  };

  return (users || []).reduce((map, { user, role }) => {
    if (!user || !role) {
      return map;
    }
    map[role.name].users.push(user);
    return map;
  }, initial);
};
