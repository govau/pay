import * as React from "react";
import loadable from "@loadable/component";
import { Loader } from "@pay/web";

export const NotFoundPage = loadable(() => import("./NotFoundPage"), {
  fallback: <Loader />
});
export const ErrorPage = loadable(() => import("./ErrorPage"), {
  fallback: <Loader />
});
export const HomePage = loadable(() => import("./HomePage"), {
  fallback: <Loader />
});
export const SigninPage = loadable(() => import("./SigninPage"), {
  fallback: <Loader />
});
export const TermsPage = loadable(() => import("./TermsPage"), {
  fallback: <Loader />
});
export const PrivacyPage = loadable(() => import("./PrivacyPage"), {
  fallback: <Loader />
});
export const DashboardPage = loadable(() => import("./DashboardPage"), {
  fallback: <Loader />
});
