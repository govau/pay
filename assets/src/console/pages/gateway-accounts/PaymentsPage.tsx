import * as React from "react";
import { Helmet } from "react-helmet";
import { PageTitle, Loader } from "@pay/web";

import { Service, GatewayAccountFragment } from "../../__generated__/graphql";

const PaymentsPage: React.FC<{
  service: Service;
  gatewayAccount: GatewayAccountFragment;
}> = ({ service }) => {
  // TODO: real data.
  const getPaymentsQuery = {
    loading: false,
    data: {
      payments: [{ id: 1, amount: 100 }]
    }
  };

  return (
    <>
      <Helmet>
        <title>Payments - {service.name}</title>
      </Helmet>
      <PageTitle title="Payments" />
      {getPaymentsQuery.loading ? (
        <Loader />
      ) : (
        <>
          <h2>Payments</h2>
          <ul>
            {getPaymentsQuery.data &&
              getPaymentsQuery.data.payments.map(p => (
                <li key={p.id}>{JSON.stringify(p)}</li>
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default PaymentsPage;
