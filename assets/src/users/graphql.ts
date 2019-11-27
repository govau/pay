import { User as GQLUser } from "../auth/__generated__/graphql";
import { emptyUser, User } from "./types";

export const fromGQLUser = (u: GQLUser | undefined): User => {
  if (!u) {
    return emptyUser;
  }
  const {
    id,
    insertedAt,
    updatedAt,
    platformAdmin,
    name,
    email,
    telephoneNumber
  } = u;
  return {
    id: id || "",
    insertedAt: insertedAt || "",
    updatedAt: updatedAt || "",
    platformAdmin: platformAdmin || false,
    name: name || "",
    email: email || "",
    telephoneNumber: telephoneNumber || ""
  };
};
