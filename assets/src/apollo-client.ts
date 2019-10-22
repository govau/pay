import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { RestLink } from "apollo-link-rest";

import { typePatchers as paymentsTypePatchers } from "./gql/payments";
import { typePatchers as productsTypePatchers } from "./gql/products";
import { typePatchers as servicesTypePatchers } from "./gql/services";

const errorLink = onError(({ graphQLErrors, networkError, response }) => {});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((req: Request) => {
    const token = localStorage.getItem("token") || "";
    return {
      headers: {
        ...req.headers,
        Accept: "application/json",
        Authorization: token
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

class NotFoundError extends Error {
  public readonly statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

const restLink = new RestLink({
  uri: "/api/v1",
  endpoints: { v1: "/api/v1" },
  headers: {
    "Content-Type": "application/json"
  },
  responseTransformer: async response => {
    // https://github.com/apollographql/apollo-link-rest/blob/4ed4e83a4818bba7c053291d385919de135450a0/src/restLink.ts#L1050
    if (response === null) {
      return Promise.reject(new NotFoundError("Resource not found"));
    }
    if (!response) {
      return Promise.reject(new Error("Received empty response"));
    }
    if (
      response.headers
        .get("Content-Type")
        .toLowerCase()
        .startsWith("application/json")
    ) {
      return response.json().then(({ data }: { data: any }) => data);
    }
    return response
      .text()
      .then((text: string) =>
        Promise.reject(new Error(`Received unexpected response: ${text}`))
      );
  },
  typePatcher: {
    ...paymentsTypePatchers,
    ...productsTypePatchers,
    ...servicesTypePatchers
  }
});

export const link = ApolloLink.from([authLink, restLink, errorLink]);
