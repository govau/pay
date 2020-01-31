import "react-app-polyfill/ie11";
import "core-js;
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/browser";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.REACT_APP_SENTRY_ENV || ""
  });
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
