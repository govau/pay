import * as React from "react";
import loadable from "@loadable/component";
import { Loader } from "@pay/web";
import DefaultLayout from "../../layout";

export const HomePage = loadable(() => import("./HomePage"), {
  // TODO: home page has a different layout so the loader looks weird. For now
  // we wrap the loader in the default layout to fix the issue. A better
  // solution is probably a full screen loader.
  fallback: (
    <DefaultLayout>
      {" "}
      <Loader message="" />
    </DefaultLayout>
  )
});
export const TermsPage = loadable(() => import("./TermsPage"), {
  fallback: <Loader />
});
export const PrivacyPage = loadable(() => import("./PrivacyPage"), {
  fallback: <Loader />
});
