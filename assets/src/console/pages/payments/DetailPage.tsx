import * as React from "react";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { PageTitle, H2 } from "@pay/web";
import * as Table from "@pay/web/components/Table";

import { paymentProviderLabel, paymentStatusLabel } from "../../payments";
import {
  Service,
  GatewayAccountType,
  PaymentStatus,
  PaymentEventType
} from "../../../__generated__/schema";
import {
  GatewayAccountFragment,
  PaymentFragment,
  PaymentEventFragment
} from "../../__generated__/graphql";

interface Props {
  service: Service;
  gatewayAccount: GatewayAccountFragment;
  payment: PaymentFragment;
}

const optional = (v: string | null | undefined) => v || "Data unavailable";

const DetailPage: React.FC<Props> = ({ service, gatewayAccount, payment }) => {
  const {
    id,
    inserted_at,
    updated_at,
    amount,
    reference,
    description,
    status,
    card_details,
    email,
    gateway_transaction_id
  } = payment;

  const refunded = false; // TODO: from payment
  const refunded_amount = 0; // TODO: from payment

  // TODO: from API
  const events: PaymentEventFragment[] = [
    {
      id: "1",
      inserted_at: String(new Date()),
      updated_at: String(new Date()),
      type: PaymentEventType.Payment,
      status: PaymentStatus.Created
    },
    {
      id: "2",
      inserted_at: String(new Date()),
      updated_at: String(new Date()),
      type: PaymentEventType.Refund,
      status: PaymentStatus.Created
    }
  ];

  return (
    <>
      <Helmet>
        <title>
          Transaction details {reference} - {service.name}{" "}
          {gatewayAccount.type === GatewayAccountType.Test
            ? [gatewayAccount.payment_provider, gatewayAccount.type].join(" ")
            : gatewayAccount.type}
        </title>
      </Helmet>
      <PageTitle title="Transaction detail" />
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
              ${((refunded ? refunded_amount : 0) / 100).toFixed(2)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Header scope="row">Date created</Table.Header>
            <Table.Cell>
              <time dateTime={updated_at || inserted_at}>
                {format(
                  new Date(updated_at || inserted_at),
                  "dd MMM yyyy — HH:mm:ss"
                )}
              </time>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Header scope="row">Provider</Table.Header>
            <Table.Cell>
              {paymentProviderLabel(gatewayAccount.payment_provider)}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Header scope="row">Provider ID</Table.Header>
            <Table.Cell>{optional(gateway_transaction_id)}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Header scope="row">Pay.gov.au payment ID</Table.Header>
            <Table.Cell>{id}</Table.Cell>
          </Table.Row>
        </tbody>
      </Table.Table>
      {card_details && (
        <>
          <H2>Payment method</H2>
          <Table.Table>
            <tbody>
              <Table.Row>
                <Table.Header scope="row">Type</Table.Header>
                <Table.Cell>{optional(card_details.card_brand)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Name on card</Table.Header>
                <Table.Cell>
                  {optional(card_details.cardholder_name)}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Card number</Table.Header>
                <Table.Cell>
                  {card_details.first_digits_card_number}** ****{" "}
                  {card_details.last_digits_card_number}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Card expiry date</Table.Header>
                <Table.Cell>{optional(card_details.expiry_date)}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Header scope="row">Email</Table.Header>
                <Table.Cell>{optional(email)}</Table.Cell>
              </Table.Row>
            </tbody>
          </Table.Table>
        </>
      )}
      {events.length > 0 && (
        <>
          <H2>Transaction events</H2>
          <Table.Table>
            <tbody>
              {events.map(({ id, inserted_at, updated_at, type, status }) => (
                <Table.Row key={id}>
                  <Table.Cell>{paymentStatusLabel(status)}</Table.Cell>
                  <Table.Cell>
                    {type === PaymentEventType.Refund ? "-" : ""}$
                    {(amount / 100).toFixed(2)}
                  </Table.Cell>
                  <Table.NumericCell>
                    <time dateTime={updated_at || inserted_at}>
                      {format(
                        new Date(updated_at || inserted_at),
                        "dd MMM yyyy — HH:mm:ss"
                      )}
                    </time>
                  </Table.NumericCell>
                </Table.Row>
              ))}
            </tbody>
          </Table.Table>
        </>
      )}
    </>
  );
};

export default DetailPage;
