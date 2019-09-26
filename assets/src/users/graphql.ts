import { User as GQLUser } from "../__generated__/graphql";
import { emptyUser, User } from "./types";

export const fromGQLUser = (u: GQLUser | undefined): User => {
  if (!u) {
    return emptyUser;
  }
  const { id, insertedAt, updatedAt, name, email, mobilePhone } = u;
  return {
    id: id || "",
    insertedAt: insertedAt || "",
    updatedAt: updatedAt || "",
    name: name || "",
    email: email || "",
    mobilePhone: mobilePhone || ""
  };
};
