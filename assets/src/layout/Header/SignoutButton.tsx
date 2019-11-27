import * as React from "react";
import styled from "@pay/web/styled-components";
import {
  SignoutMutationFn,
  SignoutComponent,
  CheckAuthDocument,
  CheckAuthQuery
} from "../../auth/__generated__/graphql";
import { cache } from "../../apollo-cache";
import { UserContext } from "../../users";

const Button = styled.button`
  margin-left: 0;
  border-color: ${props => props.theme.colors.white};
  border: 2px solid;
  border-radius: 2rem;
  padding: 8px 10px;
  background: transparent;
  color: ${props => props.theme.colors.white};
  padding: 8px 20px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const SignoutButton: React.FC = () => {
  const { clearUser } = React.useContext(UserContext);

  const handleSubmit = async (signout: SignoutMutationFn) => {
    await signout();
    await cache.reset();
    await clearUser();
  };

  return (
    <SignoutComponent
      update={(cache, { data }) => {
        if (data && data.signout) {
          cache.writeQuery<CheckAuthQuery>({
            query: CheckAuthDocument,
            data: {
              me: null
            }
          });
        }
      }}
    >
      {signOut => (
        <Button onClick={() => handleSubmit(signOut)}>Sign out</Button>
      )}
    </SignoutComponent>
  );
};

export default SignoutButton;
