import "core-js/features/array/find";
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

import { cache } from "./apollo-cache";
import App from "./App";

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENV || ""
  });
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_ENDPOINT || "http://localhost:4001",
  cache,
  credentials: "include"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
