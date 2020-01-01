import * as React from "react";
import { TODO, PageTitle, Loader, ErrorAlert, Button, P } from "@pay/web";
import * as Table from "@pay/web/components/Table";

import { useGetUsersQuery } from "../../auth/__generated__/graphql";
import { useAuth0 } from "../../auth/AuthContext";

const HomePage: React.FunctionComponent = () => {
  const { loading, error, data } = useGetUsersQuery({
    errorPolicy: "all"
  });

  const { user } = useAuth0();

  return (
    <>
      <PageTitle title="Home page" />

      <P>start</P>
      {user ? (
        <>
          <P>{user.email}</P>
          <P>{user.email_verified}</P>
          <P>{user.name}</P>
        </>
      ) : null}
      <P>end</P>

      <TODO>
        <p>
          You can emulate signing in as a particular user using the button
          below.
        </p>

        {loading ? (
          <Loader message="Loading users" />
        ) : error || !data ? (
          <ErrorAlert
            title="Unable to retrieve users"
            message={error && error.message}
            showError
          />
        ) : (
          <>
            <Table.ResponsiveWrapper>
              <Table.Table>
                <thead>
                  <Table.Row>
                    <Table.Header scope="col">Name</Table.Header>
                    <Table.Header scope="col">Email</Table.Header>
                    <Table.Header scope="col">Platform admin</Table.Header>
                    <Table.Header scope="col"></Table.Header>
                  </Table.Row>
                </thead>
                <tbody>
                  {data.users.map(u => (
                    <Table.Row key={u.externalId}>
                      <Table.Cell>{u.name}</Table.Cell>
                      <Table.Cell>{u.email}</Table.Cell>
                      <Table.Cell>{u.platformAdmin ? "Yes" : "No"}</Table.Cell>
                      <Table.Cell>
                        {localStorage.token === u.externalId ? (
                          "Signed in"
                        ) : (
                          <Button
                            onClick={() => {
                              localStorage.token = u.externalId;
                              window.location.reload();
                            }}
                          >
                            Sign in
                          </Button>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </tbody>
              </Table.Table>
            </Table.ResponsiveWrapper>
          </>
        )}
      </TODO>
    </>
  );
};

export default HomePage;
