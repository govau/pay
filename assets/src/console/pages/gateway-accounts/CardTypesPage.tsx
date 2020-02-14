import * as React from "react";
import { Helmet } from "react-helmet";
import createDecorator from "final-form-focus";

import {
  PageTitle,
  P,
  Checkbox,
  Button,
  Form,
  Hr,
  Strong,
  Loader,
  ErrorAlert
} from "@pay/web";

import {
  GatewayAccountFragment,
  useUpdateGatewayAccountCardTypesMutation,
  GetGatewayAccountDocument,
  CardTypeBrand,
  CardTypeType,
  ServiceFragment
} from "../../__generated__/graphql";
import {
  useCardTypesQuery,
  CardTypesQuery
} from "../../../platform-admin/__generated__/graphql";
import { CardType } from "../../../auth/__generated__/graphql";
import { BreadBox } from "@pay/web/components/Breadcrumb";

interface FormValues {
  cardTypeIds: Array<string>;
}

const decorators = [createDecorator<FormValues>()];

interface Props {
  service: ServiceFragment;
  gatewayAccount: GatewayAccountFragment;
}

const getCardTypeBrand = (cardType: CardType) => {
  if (!cardType.type || !cardType.label) {
    return "";
  }
  return cardType.brand === CardTypeBrand.Visa ||
    cardType.brand === CardTypeBrand.MasterCard
    ? cardType.label + " " + cardType.type.toLowerCase()
    : cardType.label;
};

const getCardTypesList = (data: CardTypesQuery, type: string) => {
  if (!data) {
    return null;
  }
  return data.cardTypes
    .filter(cardType => cardType.type === type)
    .map(cardType => (
      <React.Fragment key={cardType.id}>
        <Checkbox
          name="cardTypeIds"
          label={getCardTypeBrand(cardType)}
          value={cardType.id}
        />
        <Hr />
      </React.Fragment>
    ));
};

const CardTypesPage: React.FC<Props> = ({ service, gatewayAccount }) => {
  const [
    updateGatewayAccountCardTypes
  ] = useUpdateGatewayAccountCardTypesMutation({
    refetchQueries: [
      {
        query: GetGatewayAccountDocument,
        variables: { id: gatewayAccount.externalId }
      }
    ]
  });
  const { loading, error, data } = useCardTypesQuery({ errorPolicy: "all" });

  return (
    <>
      <Helmet>
        <title>Manage payment types</title>
      </Helmet>
      <PageTitle
        title="Manage payment types"
        breadcrumbs={BreadBox.CardTypeSettings({
          service,
          gatewayAccount
        })}
      />
      <P>Choose which credit and debit cards you want to accept.</P>
      <Form<FormValues>
        initialValues={{
          cardTypeIds: gatewayAccount.cardTypes.map(cardType => cardType.id)
        }}
        onSubmit={async values => {
          await updateGatewayAccountCardTypes({
            variables: {
              gatewayAccountId: gatewayAccount.id,
              cardTypeIds: values.cardTypeIds
            }
          });
        }}
        column
        decorators={decorators}
      >
        <React.Fragment>
          <Strong>Debit cards</Strong>
          <Hr />
          {loading ? (
            <Loader message="Loading payment types" />
          ) : error || !data ? (
            <ErrorAlert
              title="Unable to retrieve payment types"
              message={error && error.message}
              showError
            />
          ) : (
            <>
              {getCardTypesList(data, CardTypeType.Debit)}
              <Strong>Credit cards</Strong>
              <Hr />
              {getCardTypesList(data, CardTypeType.Credit)}
            </>
          )}
          <Button type="submit">Save changes</Button>
        </React.Fragment>
      </Form>
    </>
  );
};

export default CardTypesPage;
