import { User as GQLUser } from "../auth/__generated__/graphql";
import { emptyUser, User } from "./types";

export const fromGQLUser = (u: GQLUser | undefined): User => {
  if (!u) {
    return emptyUser;
  }
  const {
    id,
    inserted_at,
    updated_at,
    platform_admin,
    name,
    email,
    telephone_number
  } = u;
  return {
    id: id || "",
    insertedAt: inserted_at || "",
    updatedAt: updated_at || "",
    platformAdmin: platform_admin || false,
    name: name || "",
    email: email || "",
    telephoneNumber: telephone_number || ""
  };
};
