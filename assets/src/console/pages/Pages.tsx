import * as React from "react";
import loadable from "@loadable/component";
import { Loader } from "@pay/web";

export const DashboardPage = loadable(() => import("./DashboardPage"), {
  fallback: <Loader />
});

export const Services = {
  CreatePage: loadable(() => import("./services/CreatePage"), {
    fallback: <Loader />
  }),
  DashboardPage: loadable(() => import("./services/DashboardPage"), {
    fallback: <Loader />
  }),
  SettingsPage: loadable(() => import("./services/SettingsPage"), {
    fallback: <Loader />
  }),
  EditNamePage: loadable(() => import("./services/EditNamePage"), {
    fallback: <Loader />
  }),
  TeamPage: loadable(() => import("./services/TeamPage"), {
    fallback: <Loader />
  }),
  GatewayAccounts: {
    PaymentsPage: loadable(() => import("./gateway-accounts/PaymentsPage"), {
      fallback: <Loader />
    }),
    CredentialsPage: loadable(
      () => import("./gateway-accounts/CredentialsPage"),
      {
        fallback: <Loader />
      }
    ),
    Products: {
      ListPage: loadable(() => import("./products/ListPage"), {
        fallback: <Loader />
      }),
      CreatePage: loadable(() => import("./products/CreatePage"), {
        fallback: <Loader />
      }),
      DetailsPage: loadable(() => import("./products/DetailsPage"), {
        fallback: <Loader />
      })
    }
  }
};
