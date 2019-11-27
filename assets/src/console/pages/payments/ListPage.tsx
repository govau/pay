import * as React from "react";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { ErrorAlert, PageTitle, Loader, Warning, P, Link } from "@pay/web";
import * as Table from "@pay/web/components/Table";

import {
  useGetPaymentsQuery,
  GatewayAccountFragment,
  PaymentFragment,
  ServiceFragment
} from "../../__generated__/graphql";
import { paymentStatusLabel } from "../../payments";

const flatMap = <X, Y>(fx: (value: X) => Y[], xs: X[]): Y[] =>
  Array.prototype.concat(...xs.map(fx));

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
      <Table.ResponsiveWrapper>
        <Table.Table>
          <thead>
            <Table.Row>
              <Table.Header scope="col">Reference number</Table.Header>
              <Table.Header scope="col">Email</Table.Header>
              <Table.NumericHeader scope="col">Amount</Table.NumericHeader>
              <Table.Header scope="col">Card brand</Table.Header>
              <Table.Header scope="col">State</Table.Header>
              <Table.NumericHeader scope="col">
                Date created
              </Table.NumericHeader>
            </Table.Row>
          </thead>
          <tbody>
            {payments.map(p => (
              <Table.LinkRow
                key={p.externalId}
                onClick={() => {
                  history.push(`${path}/${p.externalId}`);
                }}
              >
                <Table.Cell>
                  <Link to={`${path}/${p.externalId}`}>{p.reference}</Link>
                </Table.Cell>
                <Table.Cell>{p.email}</Table.Cell>
                <Table.NumericCell>
                  ${(p.amount / 100).toFixed(2)}
                </Table.NumericCell>
                <Table.Cell>
                  {p.cardDetails && p.cardDetails.cardBrand}
                </Table.Cell>
                <Table.Cell>{paymentStatusLabel(p.status)}</Table.Cell>
                <Table.NumericCell>
                  <time dateTime={p.updatedAt || p.insertedAt}>
                    {format(
                      new Date(p.updatedAt || p.insertedAt),
                      "dd MMM yyyy — HH:mm:ss"
                    )}
                  </time>
                </Table.NumericCell>
              </Table.LinkRow>
            ))}
          </tbody>
        </Table.Table>
      </Table.ResponsiveWrapper>
    </>
  );
};

interface Props {
  path: string;
  service: ServiceFragment;
  gatewayAccount: GatewayAccountFragment;
}

const ListPage: React.FC<Props> = ({ path, service, gatewayAccount }) => {
  const { loading, error, data } = useGetPaymentsQuery({
    variables: {
      serviceID: service.externalId
    },
    errorPolicy: "all"
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
        <Payments
          path={path}
          payments={flatMap(
            gatewayAccount => gatewayAccount.payments,
            data.service.gatewayAccounts
          )}
        />
      )}
    </>
  );
};

export default ListPage;
