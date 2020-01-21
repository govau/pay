import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import { Pages as CorePages } from "@pay/web";

import Layout from "./Layout";
import MarkdownPage from "./MarkdownPage";

const paths = {
  index: require("./index.md"),
  integrate: {
    index: require("./integrate/index.md")
  },
  optionalFeatures: {
    index: require("./optional-features/index.md"),
    customMetadata: require("./optional-features/custom-metadata.md")
  },
  paymentLinks: {
    index: require("./payment-links/index.md")
  }
};

const Routes: React.FC = () => {
  const match = useRouteMatch();
  if (!match) {
    return null;
  }
  const { url } = match;

  return (
    <Layout>
      <Switch>
        <Route path={url} strict exact>
          <MarkdownPage path={paths.index} />
        </Route>
        <Route path={`${url}/integrate`} strict>
          <MarkdownPage path={paths.integrate.index} />
        </Route>
        <Route path={`${url}/optional-features`} strict exact>
          <MarkdownPage path={paths.optionalFeatures.index} />
        </Route>
        <Route path={`${url}/optional-features`} strict>
          <MarkdownPage path={paths.optionalFeatures.customMetadata} />
        </Route>
        <Route path={`${url}/payment-links`} strict exact>
          <MarkdownPage path={paths.paymentLinks.index} />
        </Route>
        <Route path="*">
          <CorePages.NotFoundPage />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Routes;
