import React from "react";
import { Switch, Route } from "react-router-dom";
import { styledComponents, theme, GlobalStyle } from "@pay/web";

import { AuthProvider } from "./auth/AuthContext";
import { UserProvider } from "./users/UserContext";
import * as Content from "./content";
import * as Auth from "./auth";
import * as Console from "./console";
import * as PlatformAdmin from "./platform-admin";

const { ThemeProvider } = styledComponents;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <UserProvider>
          <GlobalStyle />
          <Switch>
            <Route path="/platform-admin" strict>
              <PlatformAdmin.Routes />
            </Route>
            <Route path="/console" strict>
              <Console.Routes />
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
    </ThemeProvider>
  );
};

export default App;
