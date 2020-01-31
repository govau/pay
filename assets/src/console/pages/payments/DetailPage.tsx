import * as React from "react";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { PageTitle, H2, Loader, ErrorAlert, Link } from "@pay/web";
import * as Table from "@pay/web/components/Table";

import { paymentProviderLabel, paymentStatusLabel } from "../../payments";
import { PaymentEventType } from "../../../__generated__/schema";
import {
  GatewayAccountFragment,
  PaymentFragment,
  useGetPaymentEventsQuery,
  ServiceFragment,
  useGetPaymentRefundQuery,
  PaymentStatus
} from "../../__generated__/graphql";
import { gatewayAccountFullType } from "../../../payments";
import { useLocation } from "react-router-dom";
import { BreadBox } from "@pay/web/components/Breadcrumb";
import { SidebarLayout } from "../../../checkout/components/Split";

interface Props {
  service: ServiceFragment;
  gatewayAccount: GatewayAccountFragment;
  payment: PaymentFragment;
}

const optional = (v: string | null | undefined) => v || "Data unavailable";

const DetailPage: React.FC<Props> = ({ service, gatewayAccount, payment }) => {
  const paymentEventsQuery = useGetPaymentEventsQuery({
    variables: { id: payment.externalId },
    errorPolicy: "all"
  });

  const paymentRefundQuery = useGetPaymentRefundQuery({
    variables: { id: payment.externalId },
    errorPolicy: "all"
  });

  const {
    externalId,
    insertedAt,
    updatedAt,
    amount,
    reference,
    description,
    status,
    cardDetails,
    email,
    gatewayTransactionId
  } = payment;

  const location = useLocation();

  let refunded = false;
  let refundedAmount = 0;

  if (!paymentRefundQuery.loading && paymentRefundQuery.data) {
    refunded = paymentRefundQuery.data.payment.refunds.length > 0;
    refundedAmount = paymentRefundQuery.data.payment.refunds.reduce(
      (acc, refund) => acc + refund.amount,
      0
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Transaction details {reference} - {service.name}{" "}
          {gatewayAccountFullType(gatewayAccount)}
        </title>
      </Helmet>

      <PageTitle
        title="Transaction detail"
        breadcrumbs={BreadBox.PaymentDetail({
          service,
          gatewayAccount,
          payment
        })}
      />

      <SidebarLayout
        sidebar={
          payment.status === PaymentStatus.Success ? (
            <Link to={`${location.pathname}/refund`}>Refund payment</Link>
          ) : null
        }
      >
        <Table.ResponsiveWrapper>
          <Table.Table>
            <tbody>
              <Table.Row>
                <Table.Header scope="row">Reference number</Table.Header>
                <Table.Cell>{reference}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Description</Table.Header>
                <Table.Cell>{description}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Payment status</Table.Header>
                <Table.Cell>{paymentStatusLabel(status)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Payment amount</Table.Header>
                <Table.Cell>${(amount / 100).toFixed(2)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Refunded amount</Table.Header>
                <Table.Cell>
                  ${((refunded ? refundedAmount : 0) / 100).toFixed(2)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Date created</Table.Header>
                <Table.Cell>
                  <time dateTime={updatedAt || insertedAt}>
                    {format(
                      new Date(updatedAt || insertedAt),
                      "dd MMM yyyy — HH:mm:ss"
                    )}
                  </time>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Provider</Table.Header>
                <Table.Cell>
                  {paymentProviderLabel(gatewayAccount.paymentProvider)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">
                  {paymentProviderLabel(gatewayAccount.paymentProvider)}{" "}
                  transaction ID
                </Table.Header>
                <Table.Cell>{optional(gatewayTransactionId)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Pay.gov.au payment ID</Table.Header>
                <Table.Cell>{externalId}</Table.Cell>
              </Table.Row>
            </tbody>
          </Table.Table>
        </Table.ResponsiveWrapper>
      </SidebarLayout>

      {cardDetails && (
        <>
          <H2>Payment method</H2>
          <Table.ResponsiveWrapper>
            <Table.Table>
              <tbody>
                <Table.Row>
                  <Table.Header scope="row">Type</Table.Header>
                  <Table.Cell>{optional(cardDetails.cardBrand)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Header scope="row">Name on card</Table.Header>
                  <Table.Cell>
                    {optional(cardDetails.cardholderName)}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Header scope="row">Card number</Table.Header>
                  <Table.Cell>
                    {cardDetails.cardNumber
                      ? cardDetails.cardNumber
                      : `${cardDetails.firstDigitsCardNumber}** **** ${cardDetails.lastDigitsCardNumber}`}
                  </Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Header scope="row">Card expiry date</Table.Header>
                  <Table.Cell>{optional(cardDetails.expiryDate)}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Header scope="row">Email</Table.Header>
                  <Table.Cell>{optional(email)}</Table.Cell>
                </Table.Row>
              </tbody>
            </Table.Table>
          </Table.ResponsiveWrapper>
        </>
      )}

      <H2>Transaction events</H2>
      {paymentEventsQuery.loading ? (
        <Loader />
      ) : paymentEventsQuery.error || !paymentEventsQuery.data ? (
        <ErrorAlert
          title="Unable to retrieve events"
          message={paymentEventsQuery.error && paymentEventsQuery.error.message}
          showError
        />
      ) : (
        paymentEventsQuery.data.payment.events.length > 0 && (
          <Table.ResponsiveWrapper>
            <Table.Table>
              <thead>
                <Table.Row>
                  <Table.Header>Status</Table.Header>
                  <Table.NumericHeader>Amount</Table.NumericHeader>
                  <Table.NumericHeader>Date</Table.NumericHeader>
                </Table.Row>
              </thead>
              <tbody>
                {paymentEventsQuery.data.payment.events.map(
                  ({ id, insertedAt, updatedAt, type, status }) => (
                    <Table.Row key={id}>
                      <Table.Cell>{paymentStatusLabel(status)}</Table.Cell>
                      <Table.NumericCell>
                        {type === PaymentEventType.Refund ? "-" : ""}$
                        {(amount / 100).toFixed(2)}
                      </Table.NumericCell>
                      <Table.NumericCell>
                        <time dateTime={updatedAt || insertedAt}>
                          {format(
                            new Date(updatedAt || insertedAt),
                            "dd MMM yyyy — HH:mm:ss"
                          )}
                        </time>
                      </Table.NumericCell>
                    </Table.Row>
                  )
                )}
              </tbody>
            </Table.Table>
          </Table.ResponsiveWrapper>
        )
      )}
    </>
  );
};

export default DetailPage;
