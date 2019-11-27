import * as React from "react";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import { useHistory } from "react-router-dom";
import createDecorator from "final-form-focus";
import {
  PageTitle,
  H2,
  BooleanRadio,
  validators,
  Field,
  BasicTextInput,
  Button,
  Form,
  ErrorAlert
} from "@pay/web";
import * as Table from "@pay/web/components/Table";
import * as money from "@pay/web/lib/money";

import { paymentProviderLabel, paymentStatusLabel } from "../../payments";
import {
  GatewayAccountFragment,
  PaymentFragment,
  useSubmitRefundMutation,
  ServiceFragment
} from "../../__generated__/graphql";
import { gatewayAccountFullType } from "../../../payments";

interface FormValues {
  refund_amount: number;
  full_refund: boolean;
}

const decorators = [createDecorator<FormValues>()];

interface Props {
  service: ServiceFragment;
  gatewayAccount: GatewayAccountFragment;
  payment: PaymentFragment;
  redirectURL: string;
}

const optional = (v: string | null | undefined) => v || "Data unavailable";

const RefundPage: React.FC<Props> = ({
  service,
  gatewayAccount,
  payment,
  redirectURL
}) => {
  const [submitRefund, submitRefundResult] = useSubmitRefundMutation();
  const history = useHistory();

  const {
    id,
    insertedAt,
    updatedAt,
    amount,
    reference,
    description,
    status,
    gatewayTransactionId
  } = payment;

  const paymentAmount = `${(amount / 100).toFixed(2)}`;

  return (
    <>
      <Helmet>
        <title>
          Transaction details {reference} - {service.name}{" "}
          {gatewayAccountFullType(gatewayAccount)}
        </title>
      </Helmet>
      <PageTitle title="Refund transaction" />

      {submitRefundResult.error ? (
        <ErrorAlert
          title="Unable to retrieve events"
          message={submitRefundResult.error && submitRefundResult.error.message}
          showError
        />
      ) : null}

      <Form<FormValues>
        initialValues={{ full_refund: true, refund_amount: 0 }}
        onSubmit={async values => {
          const partialRefund = money.parse(String(values.refund_amount));
          const partialRefundAmount =
            partialRefund && partialRefund.getAmount();

          const refundAmount =
            !values.full_refund && partialRefundAmount
              ? partialRefundAmount
              : amount;

          await submitRefund({
            variables: {
              paymentId: payment.externalId,
              amount: refundAmount,
              reference: "TODO"
            }
          });

          history.push(redirectURL);
        }}
        column
        decorators={decorators}
      >
        {params => (
          <React.Fragment>
            <BooleanRadio
              name="full_refund"
              value={true}
              label="Full refund"
              first
            />
            <BooleanRadio
              name="full_refund"
              value={false}
              label="Partial refund"
            />
            {!params.values.full_refund ? (
              <Field
                name="refund_amount"
                label="Refund amount"
                description={`You may issue a partial refund for up to $${paymentAmount}`}
                validate={value => {
                  const amount = money.parse(String(value));

                  return validators.composeValidators(
                    validators.required("Enter an amount to refund"),
                    validators.isLessThan(
                      `Amount is greater than $${paymentAmount}`,
                      {
                        max: payment.amount
                      }
                    )
                  )(amount ? amount.getAmount() : undefined);
                }}
              >
                {({ input, ariaProps, ...rest }) => (
                  <BasicTextInput {...input} {...ariaProps} {...rest} />
                )}
              </Field>
            ) : null}

            <Button type="submit" disabled={submitRefundResult.loading}>
              Submit refund
            </Button>
            <Button variant="link">Cancel</Button>
          </React.Fragment>
        )}
      </Form>

      <H2>Payment summary</H2>
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
              <Table.Cell>${paymentAmount}</Table.Cell>
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
              <Table.Cell>{id}</Table.Cell>
            </Table.Row>
          </tbody>
        </Table.Table>
      </Table.ResponsiveWrapper>
    </>
  );
};

export default RefundPage;
