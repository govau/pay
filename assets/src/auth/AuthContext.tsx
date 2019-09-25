import * as React from "react";

interface State {
  email: string;
  session: string;
}

export interface AuthContextValues extends State {
  setEmail(email: string): void;
  setSession(session: string): void;
}

const initialState: State = {
  email: "",
  session: ""
};

export const authContextDefaults: AuthContextValues = {
  ...initialState,
  setEmail: (email: string) => {},
  setSession: (session: string) => {}
};

const AuthContext = React.createContext<AuthContextValues>(authContextDefaults);

class AuthProvider extends React.Component<{}, State> {
  state = initialState;

  setEmail = (email: string) => {
    this.setState({ email });
  };

  setSession = (session: string) => {
    this.setState({ session });
  };

  render() {
    const values = {
      setEmail: this.setEmail,
      setSession: this.setSession,
      ...this.state
    };
    return (
      <AuthContext.Provider value={values} children={this.props.children} />
    );
  }
}

export { AuthContext, AuthProvider };
