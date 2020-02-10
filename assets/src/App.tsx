import React from "react";
import { Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { styledComponents, theme, GlobalStyle } from "@pay/web";

import { authenticatedLink } from "./apollo-client";
import { cache as defaultCache } from "./apollo-cache";
import { useAuth0 } from "./auth/AuthContext";
import { AuthUserProvider, PayUserProvider } from "./users/UserContext";
import * as Content from "./content";
import * as Auth from "./auth";
import * as Checkout from "./checkout";
import * as Console from "./console";
import * as Docs from "./docs";
import * as PlatformAdmin from "./platform-admin";
import * as Products from "./products";

const { ThemeProvider } = styledComponents;

const tokenizedClient = (token: string | null) =>
  new ApolloClient({
    link: authenticatedLink(token),
    cache: defaultCache
  });

const useIDTokenClaims = () => {
  const [token, setToken] = React.useState<null | string>(null);
  const { user, getIdTokenClaims } = useAuth0();

  if (!token && user) {
    getIdTokenClaims().then(claims => {
      setToken(claims.__raw);
    });
  }

  return token;
};

const AuthenticatedApolloProvider: React.FC<{}> = ({ children }) => {
  const token = useIDTokenClaims();

  return (
    <ApolloProvider client={tokenizedClient(token)}>{children}</ApolloProvider>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthUserProvider>
        <AuthenticatedApolloProvider>
          <>
            <GlobalStyle />
            <Switch>
              <Route path="/pay" strict>
                <ApolloProvider client={Checkout.apolloClient}>
                  <Checkout.Routes />
                </ApolloProvider>
              </Route>
              <Route path="/products" strict>
                <ApolloProvider client={Products.apolloClient}>
                  <Products.Routes />
                </ApolloProvider>
              </Route>
              <Route path="*">
                <PayUserProvider>
                  <Switch>
                    <Route path="/console" strict>
                      <Console.Routes />
                    </Route>
                    <Route path="/docs" strict>
                      <Docs.Routes />
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
                </PayUserProvider>
              </Route>
            </Switch>
          </>
        </AuthenticatedApolloProvider>
      </AuthUserProvider>
    </ThemeProvider>
  );
};

export default App;
