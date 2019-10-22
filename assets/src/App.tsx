import React from "react";
import { Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { styledComponents, theme, GlobalStyle } from "@pay/web";

import { link as defaultLink } from "./apollo-client";
import { cache as defaultCache } from "./apollo-cache";
import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./users/UserContext";
import * as Content from "./content";
import * as Auth from "./auth";
import * as Console from "./console";
import * as PlatformAdmin from "./platform-admin";
import * as Products from "./products";

const { ThemeProvider } = styledComponents;

const defaultClient = new ApolloClient({
  link: defaultLink,
  cache: defaultCache
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Switch>
          <Route path="/products" strict>
            <ApolloProvider client={Products.apolloClient}>
              <Products.Routes />
            </ApolloProvider>
          </Route>
          <Route path="*">
            <ApolloProvider client={defaultClient}>
              <AuthProvider>
                <UserProvider>
                  <Switch>
                    <Route path="/console" strict>
                      <Console.Routes />
                    </Route>
                    <Route path="/platform-admin" strict>
                      <PlatformAdmin.Routes />
                    </Route>
                    <Route path="/auth" strict>
                      <Auth.Routes />
                    </Route>
                    <Route path="" strict>
                      <Content.Routes />
                    </Route>
                  </Switch>
                </UserProvider>
              </AuthProvider>
            </ApolloProvider>
          </Route>
        </Switch>
      </>
    </ThemeProvider>
  );
};

export default App;
