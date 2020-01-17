import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { styledComponents, theme, GlobalStyle } from "@pay/web";

import { authenticatedLink } from "./apollo-client";
import { cache as defaultCache } from "./apollo-cache";
import { Auth0Provider, useAuth0 } from "./auth/AuthContext";
import { UserProvider } from "./users/UserContext";
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
    cache: defaultCache,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache"
      }
    }
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
  const history = useHistory();

  const onAuthRedirectCallback = (redirectResult?: RedirectLoginResult) => {
    console.log(
      "auth0 onRedirectCallback called with redirectState %o",
      redirectResult
    );

    // Clears auth0 query string parameters from url
    const targetUrl =
      redirectResult &&
      redirectResult.appState &&
      redirectResult.appState.targetUrl
        ? redirectResult.appState.targetUrl
        : window.location.pathname;

    history.push(targetUrl);
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN || ""}
          client_id={process.env.REACT_APP_AUTH0_CLIENT_ID || ""}
          audience={process.env.REACT_APP_AUTH0_AUDIENCE}
          redirect_uri={window.location.origin}
          onRedirectCallback={onAuthRedirectCallback}
        >
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
              <AuthenticatedApolloProvider>
                <UserProvider>
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
                </UserProvider>
              </AuthenticatedApolloProvider>
            </Route>
          </Switch>
        </Auth0Provider>
      </>
    </ThemeProvider>
  );
};

export default App;
