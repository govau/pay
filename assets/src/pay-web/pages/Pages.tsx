import * as React from "react";
import loadable from "@loadable/component";
import Loader from "../components/Loader";

export const NotFoundPage = loadable(() => import("./NotFoundPage"), {
  fallback: <Loader />
});
