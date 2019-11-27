import { ServiceUser } from "../../__generated__/graphql";

type Role = "admin" | "view_and_refund" | "view_only";

type UsersByRole = Record<string, ServiceUser[]>;

export const partitionByRole = (users: ServiceUser[]) => {
  const initial: UsersByRole = {
    admin: [],
    view_and_refund: [],
    view_only: []
  };

  return users.reduce((map, serviceUser) => {
    map[serviceUser.role.name].push(serviceUser);
    return map;
  }, initial);
};
