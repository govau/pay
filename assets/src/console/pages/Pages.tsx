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
      CreateStartPage: loadable(() => import("./products/CreateStartPage"), {
        fallback: <Loader />
      }),
      CreateFormPage: loadable(() => import("./products/CreateFormPage"), {
        fallback: <Loader />
      })
    }
  }
};
