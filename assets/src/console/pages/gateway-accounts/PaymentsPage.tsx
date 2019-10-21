import * as React from "react";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { ErrorAlert, PageTitle, Loader, Warning, P, Link } from "@pay/web";
import * as Table from "@pay/web/components/Table";

import {
  useGetPaymentsQuery,
  Service,
  GatewayAccountFragment,
  PaymentFragment
} from "../../__generated__/graphql";
import { paymentStatusLabel } from "../../payments";

const Payments: React.FC<{
  path: string;
  payments: PaymentFragment[];
}> = ({ path, payments }) => {
  const history = useHistory();

  if (payments.length === 0) {
    return (
      <Warning>
        <P>There are no transactions at the moment.</P>
      </Warning>
    );
  }
  return (
    <>
      <P>
        {payments.length} {payments.length > 1 ? "transactions" : "transaction"}
      </P>
      <Table.Table>
        <thead>
          <Table.Row>
            <Table.Header scope="col">Reference number</Table.Header>
            <Table.Header scope="col">Email</Table.Header>
            <Table.NumericHeader scope="col">Amount</Table.NumericHeader>
            <Table.Header scope="col">Card brand</Table.Header>
            <Table.Header scope="col">State</Table.Header>
            <Table.NumericHeader scope="col">Date created</Table.NumericHeader>
          </Table.Row>
        </thead>
        <tbody>
          {payments.map(p => (
            <Table.LinkRow
              key={p.id}
              onClick={() => {
                history.push(`${path}/${p.id}`);
              }}
            >
              <Table.Cell>
                <Link to={`${path}/${p.id}`}>{p.reference}</Link>
              </Table.Cell>
              <Table.Cell>{p.email}</Table.Cell>
              <Table.NumericCell>
                ${(p.amount / 100).toFixed(2)}
              </Table.NumericCell>
              <Table.Cell>
                {p.card_details && p.card_details.card_brand}
              </Table.Cell>
              <Table.Cell>{paymentStatusLabel(p.status)}</Table.Cell>
              <Table.NumericCell>
                <time dateTime={p.inserted_at}>
                  {format(new Date(p.inserted_at), "dd MMM yyyy — HH:mm:ss")}
                </time>
              </Table.NumericCell>
            </Table.LinkRow>
          ))}
        </tbody>
      </Table.Table>
    </>
  );
};

interface Props {
  path: string;
  service: Service;
  gatewayAccount: GatewayAccountFragment;
}

const PaymentsPage: React.FC<Props> = ({ path, service, gatewayAccount }) => {
  const { loading, error, data } = useGetPaymentsQuery({
    variables: {
      gatewayAccountId: gatewayAccount.id
    }
  });

  return (
    <>
      <Helmet>
        <title>Transactions - {service.name}</title>
      </Helmet>
      <PageTitle title="Transactions" />
      {loading ? (
        <Loader />
      ) : error || !data ? (
        <ErrorAlert
          title="Unable to retrieve transactions"
          message={error && error.message}
          showError
        />
      ) : (
        <Payments path={path} payments={data.payments} />
      )}
    </>
  );
};

export default PaymentsPage;
