import "core-js/features/array/find";
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloLink } from "apollo-link";
import { onError } from "apollo-link-error";
import { RestLink } from "apollo-link-rest";
import ApolloClient from "apollo-client";

import { cache } from "./apollo-cache";
import App from "./App";

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENV || ""
  });
}

const errorLink = onError(({ graphQLErrors, networkError, response }) => {});

const restLink = new RestLink({
  uri: "/v1/api",
  endpoints: { v1: "/v1/api" },
  headers: {
    "Content-Type": "application/json"
  },
  responseTransformer: async response =>
    response.json().then(({ data }: { data: any }) => data)
});

const link = ApolloLink.from([errorLink, restLink]);

const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
