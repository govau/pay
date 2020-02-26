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
  TeamInvitePage: loadable(() => import("./services/TeamInvitePage"), {
    fallback: <Loader />
  }),
  GatewayAccounts: {
    Payments: {
      ListPage: loadable(() => import("./payments/ListPage"), {
        fallback: <Loader />
      }),
      DetailPage: loadable(() => import("./payments/DetailPage"), {
        fallback: <Loader />
      }),
      RefundPage: loadable(() => import("./payments/RefundPage"), {
        fallback: <Loader />
      })
    },
    Credentials: {
      IndexPage: loadable(() => import("./gateway-accounts/CredentialsPage"), {
        fallback: <Loader />
      }),
      EditPage: loadable(
        () => import("./gateway-accounts/EditCredentialsPage"),
        {
          fallback: <Loader />
        }
      )
    },
    CardTypes: {
      IndexPage: loadable(() => import("./gateway-accounts/CardTypesPage"), {
        fallback: <Loader />
      })
    },
    Products: {
      ListPage: loadable(() => import("./products/ListPage"), {
        fallback: <Loader />
      }),
      CreateStartPage: loadable(() => import("./products/CreateStartPage"), {
        fallback: <Loader />
      }),
      CreateFormPage: loadable(() => import("./products/CreateFormPage"), {
        fallback: <Loader />
      }),
      EditStartPage: loadable(() => import("./products/EditStartPage"), {
        fallback: <Loader />
      }),
      EditFormPage: loadable(() => import("./products/EditFormPage"), {
        fallback: <Loader />
      })
    }
  }
};
