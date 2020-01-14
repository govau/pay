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
  ServiceFragment,
  useSubmitCardTypeMutation
} from "../../__generated__/graphql";
import { useCardTypesQuery } from "../../../platform-admin/__generated__/graphql";

interface FormValues {
  cardTypes: Array<string>;
}

const decorators = [createDecorator<FormValues>()];

interface Props {
  service: ServiceFragment;
  gatewayAccount: GatewayAccountFragment;
}

const CardsPage: React.FC<Props> = ({ service, gatewayAccount }) => {
  const [submitCardType] = useSubmitCardTypeMutation();
  const { loading, error, data } = useCardTypesQuery({ errorPolicy: "all" });

  return (
    <>
      <Helmet>
        <title>Manage payment types</title>
      </Helmet>
      <PageTitle title="Manage payment types" />
      <P>Choose which credit and debit cards you want to accept</P>
      <Form<FormValues> //TODO: Refactor this code with Fieldset
        initialValues={{
          cardTypes: gatewayAccount.cardTypes.map(card => card.id)
        }}
        onSubmit={async values => {
          await submitCardType({
            variables: {
              gatewayAccountId: gatewayAccount.id,
              cardTypeIds: values.cardTypes
            }
          });
        }}
        column
        decorators={decorators}
      >
        <React.Fragment>
          <Strong>Debit Cards</Strong>
          {loading ? (
            <Loader message="Loading payment card types" />
          ) : error || !data ? (
            <ErrorAlert
              title="Unable to retrieve card types"
              message={error && error.message}
              showError
            />
          ) : (
            data.cardTypes
              .filter(card => card.type === "DEBIT")
              .map(card => {
                return (
                  <>
                    <Hr />
                    <Checkbox
                      name="cardTypes"
                      label={
                        (card.label === "Visa" || card.label === "Mastercard"
                          ? card.label + " " + card.type!.toLowerCase()
                          : card.label)!
                      }
                      key={card.id}
                      value={card.id}
                    />
                  </>
                );
              })
          )}
          <Strong>Credit Cards</Strong>
          {data &&
            data.cardTypes
              .filter(card => card.type === "CREDIT")
              .map(card => {
                return (
                  <>
                    <Hr />
                    <Checkbox
                      name="cardTypes"
                      label={
                        (card.label === "Visa" || card.label === "Mastercard"
                          ? card.label + " " + card.type!.toLowerCase()
                          : card.label)!
                      }
                      key={card.id}
                      value={card.id}
                    />
                  </>
                );
              })}
          <Button type="submit">Save Changes</Button>
        </React.Fragment>
      </Form>
    </>
  );
};

export default CardsPage;
