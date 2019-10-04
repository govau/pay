import * as React from "react";
import loadable from "@loadable/component";
import { Loader } from "@pay/web";

export const HomePage = loadable(() => import("./HomePage"), {
  fallback: <Loader />
});
export const TermsPage = loadable(() => import("./TermsPage"), {
  fallback: <Loader />
});
export const PrivacyPage = loadable(() => import("./PrivacyPage"), {
  fallback: <Loader />
});
export const PaymentPage = loadable(() => import("./PaymentPage"), {
  fallback: <Loader />
});
