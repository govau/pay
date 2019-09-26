import React from "react";
import { Switch, Route } from "react-router-dom";
import { styledComponents, theme, GlobalStyle } from "@pay/web";

import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./users/UserContext";
import * as Pages from "./pages/Pages";
import DefaultLayout, { MinimalLayout, PageContent } from "./layout";

const { ThemeProvider } = styledComponents;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <GlobalStyle />
          <Switch>
            <Route
              exact={true}
              path="/"
              render={() => (
                <DefaultLayout>
                  <Pages.HomePage />
                </DefaultLayout>
              )}
            />
            <Route
              exact={true}
              path="/signin"
              render={() => (
                <MinimalLayout>
                  <Pages.SigninPage />
                </MinimalLayout>
              )}
            />
            <Route
              exact={true}
              path="/terms"
              component={() => (
                <DefaultLayout>
                  <PageContent>
                    <Pages.TermsPage />
                  </PageContent>
                </DefaultLayout>
              )}
            />
            <Route
              exact={true}
              path="/privacy"
              component={() => (
                <DefaultLayout>
                  <PageContent>
                    <Pages.PrivacyPage />
                  </PageContent>
                </DefaultLayout>
              )}
            />
            {/* TODO PrivateRoute for this */}
            <Route
              exact={true}
              path="/dashboard"
              render={() => (
                <DefaultLayout>
                  <Pages.DashboardPage />
                </DefaultLayout>
              )}
            />
            <Route
              path="*"
              render={() => (
                <DefaultLayout>
                  <PageContent>
                    <Pages.NotFoundPage />
                  </PageContent>
                </DefaultLayout>
              )}
            />
          </Switch>
        </UserProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
