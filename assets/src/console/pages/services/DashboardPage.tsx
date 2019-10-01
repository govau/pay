import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Loader, ErrorAlert, P } from "@pay/web";

import { useGetServiceQuery } from "../../__generated__/graphql";
import { useParams } from "react-router";

const DashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useGetServiceQuery({
    variables: { id },
    errorPolicy: "all"
  });

  return (
    <>
      {loading ? (
        <Loader message="Loading service" />
      ) : error || !data ? (
        <ErrorAlert
          title="Unable to retrieve service"
          message={error && error.message}
          showError
        />
      ) : (
        <>
          <Helmet>
            <title>{data.service.name}</title>
          </Helmet>
          <PageTitle title={data.service.name} />
          <P>
            From this service dashboard page and its child pages you’ll be able
            to:
          </P>
          <ul>
            <li>
              View service usage and metrics:
              <ul>
                <li>Across today, last 7 days, last 30 days</li>
                <li>Successful refunds</li>
                <li>Net income</li>
              </ul>
            </li>
            <li>Manage transactions</li>
            <li>Manage service team members</li>
            <li>Adjust service settings</li>
            <li>Manage payment links</li>
            <li>Manage API keys</li>
            <li>Manage payment service provider account credentials</li>
            <li>Manage the cards that you accept</li>
            <li>Request to go live</li>
          </ul>
        </>
      )}
    </>
  );
};

export default DashboardPage;
