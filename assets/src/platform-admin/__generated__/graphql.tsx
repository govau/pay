import gql from "graphql-tag";
import * as React from "react";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactComponents from "@apollo/react-components";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BamboraCredentials = {
  __typename?: "BamboraCredentials";
  account_number?: Maybe<Scalars["String"]>;
  api_username?: Maybe<Scalars["String"]>;
};

export type CardDetails = {
  __typename?: "CardDetails";
  cardholder_name: Scalars["String"];
  last_digits_card_number: Scalars["String"];
  first_digits_card_number: Scalars["String"];
  expiry_date: Scalars["String"];
  card_brand: Scalars["String"];
};

export type CardType = {
  __typename?: "CardType";
  id: Scalars["ID"];
  brand: Scalars["String"];
  label: Scalars["String"];
  type: Scalars["String"];
};

export type GatewayAccount = {
  __typename?: "GatewayAccount";
  id: Scalars["ID"];
  payment_provider: GatewayAccountPaymentProvider;
  type: GatewayAccountType;
  service_name: Scalars["String"];
  service: Service;
  description: Scalars["String"];
  credentials: GatewayAccountCredentials;
  allow_apple_pay: Scalars["Boolean"];
  allow_google_pay: Scalars["Boolean"];
  allow_zero_amount: Scalars["Boolean"];
  requires_3ds: Scalars["Boolean"];
  products?: Maybe<Array<Product>>;
};

export type GatewayAccountCredentials = SandboxCredentials | BamboraCredentials;

export enum GatewayAccountPaymentProvider {
  Sandbox = "sandbox",
  Bambora = "bambora",
  Stripe = "stripe"
}

export enum GatewayAccountType {
  Test = "test",
  Live = "live"
}

export type Organisation = {
  __typename?: "Organisation";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Payment = {
  __typename?: "Payment";
  id: Scalars["ID"];
  inserted_at: Scalars["String"];
  updated_at: Scalars["String"];
  status: PaymentStatus;
  amount: Scalars["Int"];
  reference: Scalars["String"];
  description: Scalars["String"];
  email: Scalars["String"];
  card_details?: Maybe<CardDetails>;
  gateway_transaction_id?: Maybe<Scalars["ID"]>;
  gateway_account: GatewayAccount;
};

export type PaymentEvent = {
  __typename?: "PaymentEvent";
  id: Scalars["ID"];
  inserted_at: Scalars["String"];
  updated_at: Scalars["String"];
  type: PaymentEventType;
  status: PaymentStatus;
};

export enum PaymentEventType {
  Payment = "payment",
  Refund = "refund"
}

export enum PaymentStatus {
  Created = "created",
  Started = "started",
  Submitted = "submitted",
  Capturable = "capturable",
  Success = "success",
  Declined = "declined",
  TimedOut = "timed_out",
  Cancelled = "cancelled",
  Error = "error"
}

export type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  name: Scalars["String"];
  name_slug: Scalars["String"];
  service_name_slug: Scalars["String"];
  description: Scalars["String"];
  reference_enabled: Scalars["Boolean"];
  reference_label: Scalars["String"];
  reference_hint: Scalars["String"];
  price_fixed: Scalars["Boolean"];
  price: Scalars["Int"];
  gateway_account: GatewayAccount;
};

export type ProductPayment = {
  __typename?: "ProductPayment";
  id: Scalars["ID"];
  product: Product;
  reference: Scalars["String"];
  amount: Scalars["Int"];
  status: ProductPaymentStatus;
  next_url: Scalars["String"];
};

export enum ProductPaymentStatus {
  Created = "created",
  Submitted = "submitted",
  Error = "error"
}

export type Query = {
  __typename?: "Query";
  organisations: Array<Organisation>;
  services: Array<Service>;
  cardTypes: Array<CardType>;
};

export type Role = {
  __typename?: "Role";
  id: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
};

export type SandboxCredentials = {
  __typename?: "SandboxCredentials";
  dummy?: Maybe<Scalars["String"]>;
};

export type Service = {
  __typename?: "Service";
  id: Scalars["ID"];
  name: Scalars["String"];
  current_go_live_stage: ServiceGoLiveStage;
  users?: Maybe<Array<ServiceUser>>;
  gateway_accounts?: Maybe<Array<GatewayAccount>>;
};

export enum ServiceGoLiveStage {
  NotStarted = "not_started",
  Live = "live"
}

export type ServiceUser = {
  __typename?: "ServiceUser";
  service: Service;
  user: User;
  role: Role;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  inserted_at: Scalars["String"];
  updated_at: Scalars["String"];
  platform_admin: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  telephone_number?: Maybe<Scalars["String"]>;
};

export type OrganisationFragment = { __typename?: "Organisation" } & Pick<
  Organisation,
  "id" | "name"
>;

export type ServiceFragment = { __typename?: "Service" } & Pick<
  Service,
  "id" | "name"
>;

export type OrganisationsQueryVariables = {};

export type OrganisationsQuery = { __typename?: "Query" } & {
  organisations: Array<{ __typename?: "Organisation" } & OrganisationFragment>;
};

export type ServicesQueryVariables = {};

export type ServicesQuery = { __typename?: "Query" } & {
  services: Array<{ __typename?: "Service" } & ServiceFragment>;
};

export type CardTypesQueryVariables = {};

export type CardTypesQuery = { __typename?: "Query" } & {
  cardTypes: Array<
    { __typename?: "CardType" } & Pick<
      CardType,
      "id" | "brand" | "label" | "type"
    >
  >;
};

export const OrganisationFragmentDoc = gql`
  fragment Organisation on Organisation {
    id
    name
  }
`;
export const ServiceFragmentDoc = gql`
  fragment Service on Service {
    id
    name
  }
`;
export const OrganisationsDocument = gql`
  query Organisations {
    organisations
      @rest(type: "Organisation", path: "/internal/services/organisations") {
      ...Organisation
    }
  }
  ${OrganisationFragmentDoc}
`;
export type OrganisationsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >,
  "query"
>;

export const OrganisationsComponent = (props: OrganisationsComponentProps) => (
  <ApolloReactComponents.Query<OrganisationsQuery, OrganisationsQueryVariables>
    query={OrganisationsDocument}
    {...props}
  />
);

/**
 * __useOrganisationsQuery__
 *
 * To run a query within a React component, call `useOrganisationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganisationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganisationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrganisationsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >(OrganisationsDocument, baseOptions);
}
export function useOrganisationsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >(OrganisationsDocument, baseOptions);
}
export type OrganisationsQueryHookResult = ReturnType<
  typeof useOrganisationsQuery
>;
export type OrganisationsLazyQueryHookResult = ReturnType<
  typeof useOrganisationsLazyQuery
>;
export type OrganisationsQueryResult = ApolloReactCommon.QueryResult<
  OrganisationsQuery,
  OrganisationsQueryVariables
>;
export const ServicesDocument = gql`
  query Services {
    services @rest(type: "Service", path: "/internal/services/services") {
      ...Service
    }
  }
  ${ServiceFragmentDoc}
`;
export type ServicesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ServicesQuery,
    ServicesQueryVariables
  >,
  "query"
>;

export const ServicesComponent = (props: ServicesComponentProps) => (
  <ApolloReactComponents.Query<ServicesQuery, ServicesQueryVariables>
    query={ServicesDocument}
    {...props}
  />
);

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useServicesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ServicesQuery,
    ServicesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ServicesQuery, ServicesQueryVariables>(
    ServicesDocument,
    baseOptions
  );
}
export function useServicesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ServicesQuery,
    ServicesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ServicesQuery, ServicesQueryVariables>(
    ServicesDocument,
    baseOptions
  );
}
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<
  typeof useServicesLazyQuery
>;
export type ServicesQueryResult = ApolloReactCommon.QueryResult<
  ServicesQuery,
  ServicesQueryVariables
>;
export const CardTypesDocument = gql`
  query CardTypes {
    cardTypes @rest(type: "CardType", path: "/internal/payments/card-types") {
      id
      brand
      label
      type
    }
  }
`;
export type CardTypesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    CardTypesQuery,
    CardTypesQueryVariables
  >,
  "query"
>;

export const CardTypesComponent = (props: CardTypesComponentProps) => (
  <ApolloReactComponents.Query<CardTypesQuery, CardTypesQueryVariables>
    query={CardTypesDocument}
    {...props}
  />
);

/**
 * __useCardTypesQuery__
 *
 * To run a query within a React component, call `useCardTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCardTypesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CardTypesQuery,
    CardTypesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CardTypesQuery, CardTypesQueryVariables>(
    CardTypesDocument,
    baseOptions
  );
}
export function useCardTypesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CardTypesQuery,
    CardTypesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<CardTypesQuery, CardTypesQueryVariables>(
    CardTypesDocument,
    baseOptions
  );
}
export type CardTypesQueryHookResult = ReturnType<typeof useCardTypesQuery>;
export type CardTypesLazyQueryHookResult = ReturnType<
  typeof useCardTypesLazyQuery
>;
export type CardTypesQueryResult = ApolloReactCommon.QueryResult<
  CardTypesQuery,
  CardTypesQueryVariables
>;
