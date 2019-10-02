import { RestLink } from "apollo-link-rest";

export const isServerError = (
  networkError?: Error | null
): networkError is RestLink.ServerError => {
  if (!networkError) {
    return false;
  }
  return (networkError as RestLink.ServerError).statusCode !== undefined;
};
