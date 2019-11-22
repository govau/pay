import * as React from "react";
import { TODO, PageTitle, Loader, ErrorAlert, Button } from "@pay/web";
import * as Table from "@pay/web/components/Table";

import { useGetUsersQuery } from "../../auth/__generated__/graphql";

const HomePage: React.FunctionComponent = () => {
  const { loading, error, data } = useGetUsersQuery({
    errorPolicy: "all"
  });

  return (
    <>
      <PageTitle title="Home page" />
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
                    <Table.Row key={u.id}>
                      <Table.Cell>{u.name}</Table.Cell>
                      <Table.Cell>{u.email}</Table.Cell>
                      <Table.Cell>{u.platform_admin ? "Yes" : "No"}</Table.Cell>
                      <Table.Cell>
                        {localStorage.token === u.id ? (
                          "Signed in"
                        ) : (
                          <Button
                            onClick={() => {
                              localStorage.token = u.id;
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
