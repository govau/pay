import * as React from "react";
import { User } from "./types";
import { Auth0Provider, useAuth0, Auth0User } from "../auth/AuthContext";
import { useCheckAuthQuery } from "../auth/__generated__/graphql";
import { fromGQLUser } from "./graphql";

interface PayUserContext {
  user?: User;
  isLoading: boolean;
}

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

  window.location.href = targetUrl;
};

const AuthUserProvider: React.FC<{}> = ({ children }) => {
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ""}
      client_id={process.env.REACT_APP_AUTH0_CLIENT_ID || ""}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      redirect_uri={window.location.origin}
      onRedirectCallback={onAuthRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

const PayUserContext = React.createContext<Partial<PayUserContext>>({});
const UserContext = React.createContext<
  | {
      authUser: Auth0User;
      payUser: Partial<PayUserContext>;
    }
  | undefined
>(undefined);

const useAuthUser = () => {
  const { user } = useAuth0();
  return user;
};
const usePayUser = () => React.useContext(PayUserContext);
const useUser = () => React.useContext(UserContext);

const PayUserProvider: React.FC<{}> = ({ children }) => {
  const { isInitializing } = useAuth0();
  const { loading, data } = useCheckAuthQuery({});
  const user = data && data.me ? fromGQLUser(data.me) : undefined;
  return (
    <PayUserContext.Provider
      value={{ user, isLoading: isInitializing || loading }}
    >
      {children}
    </PayUserContext.Provider>
  );
};

const CombinedProvider: React.FC<{}> = ({ children }) => {
  const authUser = useAuthUser();
  const payUser = usePayUser();
  const value = authUser && payUser ? { authUser, payUser } : undefined;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const UserProvider: React.FC<{}> = ({ children }) => (
  <AuthUserProvider>
    <PayUserProvider>
      <CombinedProvider>{children}</CombinedProvider>
    </PayUserProvider>
  </AuthUserProvider>
);

export {
  AuthUserProvider,
  PayUserProvider,
  UserProvider,
  useAuthUser,
  usePayUser,
  useUser
};
