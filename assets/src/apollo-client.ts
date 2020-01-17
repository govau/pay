import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";

const authLink = (token: string | null) =>
  new ApolloLink((operation, forward) => {
    operation.setContext((req: Request) => {
      return {
        headers: {
          ...req.headers,
          Accept: "application/json",
          Authorization: token ? `Bearer ${token}` : `Bearer abcd`
        }
      };
    });
    return forward(operation).map(result => {
      const { restResponses } = operation.getContext();
      const authTokenResponse =
        restResponses &&
        restResponses.find((res: Response) => res.headers.has("Authorization"));
      if (authTokenResponse) {
        localStorage.setItem(
          "token",
          authTokenResponse.headers.get("Authorization")
        );
      }
      return result;
    });
  });

const httpLink = new HttpLink({
  uri: "/api/v1/internal/graphql"
});

export const link = ApolloLink.from([authLink(null), httpLink]);

export const authenticatedLink = (token: string | null) =>
  ApolloLink.from([authLink(token), httpLink]);
