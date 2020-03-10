import * as React from "react";
import { useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Button,
  PageTitle,
  Loader,
  ErrorAlert,
  Link,
  Warning,
  P,
  styled,
  H2,
  Hint
} from "@pay/web";

import {
  useGetUserServicesQuery,
  useAcceptInviteMutation
} from "../__generated__/graphql";

const Ul = styled.ul`
  margin: 0;
  padding: 0;
  li {
    list-style: none;
  }
`;

const Bad = styled(Hint)`
  color: ${props => props.theme.colors.payBadRed};
`;

const DashboardPage: React.FC = () => {
  const { loading, error, data } = useGetUserServicesQuery();

  const [acceptInvite] = useAcceptInviteMutation({
    refetchQueries: ["GetUserServices"]
  });

  const match = useRouteMatch();
  if (!match) {
    return null;
  }

  const { url } = match;

  return (
    <>
      <Helmet>
        <title>Select a service</title>
      </Helmet>
      <PageTitle title="Select a service" />
      {loading ? (
        <Loader message="Loading services" />
      ) : error || !data ? (
        <ErrorAlert
          title="Unable to retrieve services"
          message={error && error.message}
          showError
        />
      ) : (
        <>
          {data.services.length === 0 && (
            <Warning>
              <P>You don’t have access to any services.</P>
              <P>
                <Link to={`${url}/services/create`}>Create a new service</Link>
              </P>
            </Warning>
          )}
          <Ul>
            {data.services.map(s => (
              <li key={s.externalId}>
                <Link to={`/console/services/${s.externalId}`}>{s.name}</Link>
              </li>
            ))}
          </Ul>

          {data.serviceInvites && data.serviceInvites.length > 0 ? (
            <>
              <H2>Pending service invites</H2>
              <Ul>
                {data.serviceInvites.map(invite => (
                  <li key={invite.id}>
                    <section style={{ marginTop: "1em" }}>
                      <header>{invite.serviceName}</header>
                      <Hint>Invited by {invite.invitedBy}</Hint>
                      <br />
                      {invite.isExpired ? (
                        <Bad>Invite has expired</Bad>
                      ) : (
                        <Button
                          style={{ padding: 0 }}
                          variant="link"
                          onClick={() =>
                            acceptInvite({
                              variables: { serviceID: invite.serviceId }
                            })
                          }
                        >
                          Join service
                        </Button>
                      )}
                    </section>
                  </li>
                ))}
              </Ul>
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default DashboardPage;
