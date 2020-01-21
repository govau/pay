import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";

const authLink = (token: string | null) =>
  new ApolloLink((operation, forward) => {
    const auth = token ? { Authorization: `Bearer ${token}` } : {};

    operation.setContext((req: Request) => {
      return {
        headers: {
          ...req.headers,
          ...auth,
          Accept: "application/json"
        }
      };
    });
    return forward(operation);
  });

const httpLink = new HttpLink({
  uri: "/api/v1/internal/graphql"
});

export const link = ApolloLink.from([authLink(null), httpLink]);

export const authenticatedLink = (token: string | null) =>
  ApolloLink.from([authLink(token), httpLink]);
