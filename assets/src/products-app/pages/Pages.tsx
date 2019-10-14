import * as React from "react";
import loadable from "@loadable/component";
import { Loader } from "@pay/web";

export const HomePage = loadable(() => import("./HomePage"), {
  fallback: <Loader />
});
export const ProductPage = loadable(() => import("./ProductPage"), {
  fallback: <Loader />
});
