import * as React from "react";
import { User, emptyUser } from "./types";

interface State {
  user: User;
}

interface UserContextValues extends State {
  setUser(user: User): void;
  clearUser(): void;
}

const initialState: State = {
  user: emptyUser
};

const userContextDefaults: UserContextValues = {
  ...initialState,
  setUser: (user: User) => {},
  clearUser: () => {}
};

const UserContext = React.createContext<UserContextValues>(userContextDefaults);

class UserProvider extends React.Component<{}, State> {
  state = initialState;

  setUser = (user: User) => {
    const currentUser = this.state.user;

    if (user.updatedAt > currentUser.updatedAt) {
      this.setState({ user });
    }
  };

  clearUser = () => {
    this.setState({ user: emptyUser });
  };

  render() {
    const values = {
      setUser: this.setUser,
      clearUser: this.clearUser,
      ...this.state
    };
    return (
      <UserContext.Provider value={values} children={this.props.children} />
    );
  }
}

export { UserContext, UserProvider };
