import * as React from "react";
import loadable from "@loadable/component";
import { Loader } from "@pay/web";

export const SigninPage = loadable(() => import("./SigninPage"), {
  fallback: <Loader />
});
