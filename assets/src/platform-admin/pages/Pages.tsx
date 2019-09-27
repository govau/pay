import * as React from "react";
import loadable from "@loadable/component";
import { Loader } from "@pay/web";

export const DashboardPage = loadable(() => import("./DashboardPage"), {
  fallback: <Loader />
});
export const OrganisationsPage = loadable(() => import("./OrganisationsPage"), {
  fallback: <Loader />
});
export const ServicesPage = loadable(() => import("./ServicesPage"), {
  fallback: <Loader />
});
export const CardTypesPage = loadable(() => import("./CardTypesPage"), {
  fallback: <Loader />
});
