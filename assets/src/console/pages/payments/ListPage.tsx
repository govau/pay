import * as React from "react";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import { format } from "date-fns";
import {
  ErrorAlert,
  PageTitle,
  Loader,
  Link,
  styled,
  desktop,
  Field,
  BasicTextInput,
  Form,
  Label,
  Select,
  Description,
  Option,
  Button,
  ButtonGroup
} from "@pay/web";
import { Field as FinalFormField, useForm } from "react-final-form";
import * as Table from "@pay/web/components/Table";

import {
  useGetPaymentsQuery,
  ServiceFragment
} from "../../__generated__/graphql";
import {
  paymentStatusLabel,
  paymentStatuses,
  statusesForSlug
} from "../../payments";
import {
  PaymentStatus,
  CardTypeBrand
} from "../../../products/__generated__/graphql";

const undefinedIfEmpty = <T,>(xs: T[]): T[] | undefined =>
  xs.length > 0 ? xs : undefined;

const paymentStatusEntries = Object.entries(paymentStatuses);

const Panel = styled.section`
  background-color: ${props => props.theme.colors.payLightGrey};
  padding: 1rem;

  @media ${desktop} {
    padding: 3rem;
  }
`;

const PanelItems = styled.section`
  display: grid;
  row-gap: 2rem;
  column-gap: 5rem;
  grid-template-columns: 1fr 1fr;
`;

const PanelItem = styled.div`
  display: flex;
  flex-flow: column nowrap;

  & ${Label} {
    flex: 1;
  }

  & ${Description} {
    flex: 99;
  }
`;

interface FormValues {
  reference?: string;
  status?: PaymentStatus[];
  emailAddress?: string;
  cardName?: string;
  cardSuffix?: string;
  cardBrand?: CardTypeBrand[];
}

interface Props {
  path: string;
  service: ServiceFragment;
}

const ResetFormButton = () => {
  const form = useForm();

  return (
    <Button variant="link" type="button" onClick={() => form.reset()}>
      Clear filters
    </Button>
  );
};

const ListPage: React.FC<Props> = ({ path, service }) => {
  const serviceID = service.externalId;
  const history = useHistory();
  const [showingOptions, showOptions] = React.useState(false);
  const { loading, error, data, refetch } = useGetPaymentsQuery({
    variables: { serviceID },
    errorPolicy: "all"
  });

  const cardMetadataSupported = false;

  return (
    <>
      <Helmet>
        <title>Transactions - {service.name}</title>
      </Helmet>
      <PageTitle title="Transactions" />

      <Form<FormValues>
        onSubmit={filterBy => {
          const { status = [], cardBrand = [], ...filters } = filterBy;

          refetch({
            serviceID,
            filterBy: {
              ...filters,
              status: undefinedIfEmpty(status.flatMap(statusesForSlug)),
              cardBrand: undefinedIfEmpty(cardBrand.filter(x => !!x))
            }
          });
        }}
      >
        <Panel>
          <PanelItems>
            <PanelItem>
              <Field
                name="reference"
                label="Payment reference number"
                description="Enter full or partial number"
              >
                {({ input, ariaProps, ...rest }) => (
                  <BasicTextInput {...input} {...ariaProps} {...rest} />
                )}
              </Field>
            </PanelItem>

            <PanelItem>
              <Field
                name="emailAddress"
                label="Email address"
                description="Full or partial email address of payer"
              >
                {({ input, ariaProps, ...rest }) => (
                  <BasicTextInput {...input} {...ariaProps} {...rest} />
                )}
              </Field>
            </PanelItem>

            {showingOptions ? (
              <>
                {cardMetadataSupported && (
                  <PanelItem>
                    <Field
                      name="cardName"
                      label="Name on card"
                      description="Full or partial name of card holder"
                    >
                      {({ input, ariaProps, ...rest }) => (
                        <BasicTextInput {...input} {...ariaProps} {...rest} />
                      )}
                    </Field>
                  </PanelItem>
                )}

                {cardMetadataSupported && (
                  <PanelItem>
                    <Field
                      name="cardSuffix"
                      label="Last 4 card numbers"
                      description="The last 4 digits of the card used for payment"
                    >
                      {({ input, ariaProps, ...rest }) => (
                        <BasicTextInput {...input} {...ariaProps} {...rest} />
                      )}
                    </Field>
                  </PanelItem>
                )}

                <PanelItem>
                  <Label>Payment status</Label>
                  <Description>Latest status of the payment</Description>
                  <FinalFormField
                    name="status"
                    type="select"
                    initialValue={[""]}
                    multiple
                    render={({ input }) => (
                      <Select {...input}>
                        <Option value="">All statuses</Option>
                        {paymentStatusEntries.map(([slug, [label]]) => (
                          <Option key={slug} value={slug}>
                            {label}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                </PanelItem>

                {cardMetadataSupported && (
                  <PanelItem>
                    <Label>Card brand</Label>
                    <Description>Brand of card used for payment</Description>
                    <FinalFormField
                      name="cardBrand"
                      type="select"
                      initialValue={[""]}
                      multiple
                      render={({ input }) => (
                        <Select {...input}>
                          <Option value="">All brands</Option>
                          <Option value={CardTypeBrand.Visa}>Visa</Option>
                          <Option value={CardTypeBrand.MasterCard}>
                            Mastercard
                          </Option>
                          <Option value={CardTypeBrand.AmericanExpress}>
                            American Express
                          </Option>
                          <Option value={CardTypeBrand.Discover}>
                            Discover
                          </Option>
                        </Select>
                      )}
                    />
                  </PanelItem>
                )}
              </>
            ) : null}
          </PanelItems>

          {showingOptions ? (
            <Button
              variant="link"
              type="button"
              onClick={() => showOptions(false)}
            >
              - Show fewer options
            </Button>
          ) : (
            <Button
              variant="link"
              type="button"
              onClick={() => showOptions(true)}
            >
              + Show more options
            </Button>
          )}

          <ButtonGroup>
            <Button type="submit">Filter transactions</Button>
            <ResetFormButton />
          </ButtonGroup>
        </Panel>
      </Form>

      {loading ? (
        <Loader />
      ) : error || !data ? (
        <ErrorAlert
          title="Unable to retrieve transactions"
          message={error && error.message}
          showError
        />
      ) : (
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
              {data.service.payments.map(p => (
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
      )}
    </>
  );
};

export default ListPage;
