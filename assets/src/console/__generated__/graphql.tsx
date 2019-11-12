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
  merchant_id?: Maybe<Scalars["String"]>;
  account_number?: Maybe<Scalars["String"]>;
  api_username?: Maybe<Scalars["String"]>;
};

export type CardDetails = {
  __typename?: "CardDetails";
  cardholder_name: Scalars["String"];
  card_number?: Maybe<Scalars["String"]>;
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

export type CreateProductInput = {
  product: CreateProductProduct;
};

export type CreateProductProduct = {
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  reference_enabled: Scalars["Boolean"];
  reference_label?: Maybe<Scalars["String"]>;
  reference_hint?: Maybe<Scalars["String"]>;
  price_fixed: Scalars["Boolean"];
  price?: Maybe<Scalars["Int"]>;
};

export type CreateServiceInput = {
  service: CreateServiceService;
};

export type CreateServiceService = {
  name: Scalars["String"];
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

export type Mutation = {
  __typename?: "Mutation";
  createService: Service;
  updateService: Service;
  updateGatewayAccountCredentials: GatewayAccountCredentials;
  createProduct: Service;
  submitRefund: PaymentRefund;
};

export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};

export type MutationUpdateServiceArgs = {
  id: Scalars["ID"];
  input: UpdateServiceInput;
};

export type MutationUpdateGatewayAccountCredentialsArgs = {
  gatewayAccountId: Scalars["ID"];
  input: UpdateGatewayAccountCredentialsInput;
};

export type MutationCreateProductArgs = {
  gatewayAccountId: Scalars["ID"];
  input: CreateProductInput;
};

export type MutationSubmitRefundArgs = {
  paymentId: Scalars["ID"];
  input: SubmitRefundInput;
};

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
  gateway_account_id: Scalars["ID"];
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

export type PaymentRefund = {
  __typename?: "PaymentRefund";
  id: Scalars["ID"];
  reference: Scalars["String"];
  amount: Scalars["Int"];
  status: PaymentRefundStatus;
  user_external_id: Scalars["ID"];
  gateway_transaction_id: Scalars["ID"];
};

export type PaymentRefundInput = {
  amount: Scalars["Int"];
  reference?: Maybe<Scalars["String"]>;
};

export enum PaymentRefundStatus {
  Created = "created",
  Submitted = "submitted",
  Success = "success",
  Error = "error"
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
  userServices: Array<Service>;
  service: Service;
  gatewayAccounts: Array<GatewayAccount>;
  gatewayAccount: GatewayAccount;
  products: Array<Product>;
  payments: Array<Payment>;
  paymentEvents: Array<PaymentEvent>;
  payment: Payment;
};

export type QueryUserServicesArgs = {
  userId: Scalars["ID"];
};

export type QueryServiceArgs = {
  id: Scalars["ID"];
};

export type QueryGatewayAccountsArgs = {
  serviceId: Scalars["ID"];
};

export type QueryGatewayAccountArgs = {
  id: Scalars["ID"];
};

export type QueryProductsArgs = {
  gatewayAccountId: Scalars["ID"];
};

export type QueryPaymentsArgs = {
  gatewayAccountId: Scalars["ID"];
};

export type QueryPaymentEventsArgs = {
  paymentId: Scalars["ID"];
};

export type QueryPaymentArgs = {
  id: Scalars["ID"];
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

export type SubmitRefundInput = {
  payment_refund: PaymentRefundInput;
};

export type UpdateGatewayAccountBamboraCredentials = {
  merchant_id: Scalars["String"];
  account_number?: Maybe<Scalars["String"]>;
  api_username: Scalars["String"];
};

export type UpdateGatewayAccountCredentialsInput = {
  /**
   * Normally this would be an input union type but GraphQL doesn't support them
   * and we only have Bambora so this is fine for now.
   * See https://github.com/graphql/graphql-spec/issues/488
   **/
  credentials: UpdateGatewayAccountBamboraCredentials;
};

export type UpdateServiceInput = {
  service: UpdateServiceService;
};

export type UpdateServiceService = {
  name: Scalars["String"];
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

export type ServiceFragment = { __typename?: "Service" } & Pick<
  Service,
  "id" | "name" | "current_go_live_stage"
>;

export type GatewayAccountFragment = { __typename?: "GatewayAccount" } & Pick<
  GatewayAccount,
  "id" | "type" | "payment_provider"
> & {
    credentials:
      | { __typename?: "SandboxCredentials" }
      | ({ __typename?: "BamboraCredentials" } & Pick<
          BamboraCredentials,
          "merchant_id" | "account_number" | "api_username"
        >);
  };

type GatewayAccountCredentials_SandboxCredentials_Fragment = {
  __typename?: "SandboxCredentials";
};

type GatewayAccountCredentials_BamboraCredentials_Fragment = {
  __typename?: "BamboraCredentials";
} & Pick<BamboraCredentials, "merchant_id" | "account_number" | "api_username">;

export type GatewayAccountCredentialsFragment =
  | GatewayAccountCredentials_SandboxCredentials_Fragment
  | GatewayAccountCredentials_BamboraCredentials_Fragment;

export type ProductFragment = { __typename?: "Product" } & Pick<
  Product,
  "id" | "name" | "name_slug" | "service_name_slug" | "description"
>;

export type PaymentFragment = { __typename?: "Payment" } & Pick<
  Payment,
  | "id"
  | "inserted_at"
  | "updated_at"
  | "status"
  | "amount"
  | "reference"
  | "description"
  | "email"
  | "gateway_transaction_id"
> & {
    card_details: Maybe<
      { __typename?: "CardDetails" } & Pick<
        CardDetails,
        | "cardholder_name"
        | "card_number"
        | "last_digits_card_number"
        | "first_digits_card_number"
        | "expiry_date"
        | "card_brand"
      >
    >;
  };

export type PaymentEventFragment = { __typename?: "PaymentEvent" } & Pick<
  PaymentEvent,
  "id" | "inserted_at" | "updated_at" | "type" | "status"
>;

export type PaymentRefundFragment = { __typename?: "PaymentRefund" } & Pick<
  PaymentRefund,
  | "id"
  | "reference"
  | "amount"
  | "status"
  | "user_external_id"
  | "gateway_transaction_id"
>;

export type GetUserServicesQueryVariables = {
  userId: Scalars["ID"];
};

export type GetUserServicesQuery = { __typename?: "Query" } & {
  services: Array<{ __typename?: "Service" } & ServiceFragment>;
};

export type GetServiceQueryVariables = {
  id: Scalars["ID"];
};

export type GetServiceQuery = { __typename?: "Query" } & {
  service: { __typename?: "Service" } & ServiceFragment;
};

export type GetServiceWithUsersQueryVariables = {
  id: Scalars["ID"];
};

export type GetServiceWithUsersQuery = { __typename?: "Query" } & {
  service: { __typename?: "Service" } & Pick<Service, "id"> & {
      users: Maybe<
        Array<
          { __typename?: "ServiceUser" } & {
            user: { __typename?: "User" } & Pick<User, "id" | "name" | "email">;
            role: { __typename?: "Role" } & Pick<Role, "name">;
          }
        >
      >;
    } & ServiceFragment;
};

export type GetServiceWithGatewayAccountsQueryVariables = {
  id: Scalars["ID"];
};

export type GetServiceWithGatewayAccountsQuery = { __typename?: "Query" } & {
  service: { __typename?: "Service" } & Pick<Service, "id"> & {
      gateway_accounts: Maybe<
        Array<{ __typename?: "GatewayAccount" } & GatewayAccountFragment>
      >;
    } & ServiceFragment;
};

export type CreateServiceMutationVariables = {
  input: CreateServiceInput;
};

export type CreateServiceMutation = { __typename?: "Mutation" } & {
  service: { __typename?: "Service" } & ServiceFragment;
};

export type UpdateServiceMutationVariables = {
  id: Scalars["ID"];
  input: UpdateServiceInput;
};

export type UpdateServiceMutation = { __typename?: "Mutation" } & {
  service: { __typename?: "Service" } & ServiceFragment;
};

export type SubmitRefundMutationVariables = {
  paymentId: Scalars["ID"];
  input: SubmitRefundInput;
};

export type SubmitRefundMutation = { __typename?: "Mutation" } & {
  refund: { __typename?: "PaymentRefund" } & PaymentRefundFragment;
};

export type GetGatewayAccountsQueryVariables = {
  serviceId: Scalars["ID"];
};

export type GetGatewayAccountsQuery = { __typename?: "Query" } & {
  gatewayAccounts: Array<
    { __typename?: "GatewayAccount" } & GatewayAccountFragment
  >;
};

export type GetGatewayAccountQueryVariables = {
  id: Scalars["ID"];
};

export type GetGatewayAccountQuery = { __typename?: "Query" } & {
  gatewayAccount: { __typename?: "GatewayAccount" } & GatewayAccountFragment;
};

export type UpdateGatewayAccountCredentialsMutationVariables = {
  gatewayAccountId: Scalars["ID"];
  input: UpdateGatewayAccountCredentialsInput;
};

export type UpdateGatewayAccountCredentialsMutation = {
  __typename?: "Mutation";
} & {
  credentials:
    | ({
        __typename?: "SandboxCredentials";
      } & GatewayAccountCredentials_SandboxCredentials_Fragment)
    | ({
        __typename?: "BamboraCredentials";
      } & GatewayAccountCredentials_BamboraCredentials_Fragment);
};

export type GetProductsQueryVariables = {
  gatewayAccountId: Scalars["ID"];
};

export type GetProductsQuery = { __typename?: "Query" } & {
  products: Array<{ __typename?: "Product" } & ProductFragment>;
};

export type CreateProductMutationVariables = {
  gatewayAccountId: Scalars["ID"];
  input: CreateProductInput;
};

export type CreateProductMutation = { __typename?: "Mutation" } & {
  product: { __typename?: "Service" } & ServiceFragment;
};

export type GetPaymentsQueryVariables = {
  gatewayAccountId: Scalars["ID"];
};

export type GetPaymentsQuery = { __typename?: "Query" } & {
  payments: Array<{ __typename?: "Payment" } & PaymentFragment>;
};

export type GetPaymentQueryVariables = {
  id: Scalars["ID"];
};

export type GetPaymentQuery = { __typename?: "Query" } & {
  payment: { __typename?: "Payment" } & PaymentFragment;
};

export type GetPaymentEventsQueryVariables = {
  paymentId: Scalars["ID"];
};

export type GetPaymentEventsQuery = { __typename?: "Query" } & {
  events: Array<{ __typename?: "PaymentEvent" } & PaymentEventFragment>;
};

export const ServiceFragmentDoc = gql`
  fragment Service on Service {
    id
    name
    current_go_live_stage
  }
`;
export const GatewayAccountFragmentDoc = gql`
  fragment GatewayAccount on GatewayAccount {
    id
    type
    payment_provider
    credentials {
      ... on BamboraCredentials {
        merchant_id
        account_number
        api_username
      }
    }
  }
`;
export const GatewayAccountCredentialsFragmentDoc = gql`
  fragment GatewayAccountCredentials on GatewayAccountCredentials {
    ... on BamboraCredentials {
      merchant_id
      account_number
      api_username
    }
  }
`;
export const ProductFragmentDoc = gql`
  fragment Product on Product {
    id
    name
    name_slug
    service_name_slug
    description
  }
`;
export const PaymentFragmentDoc = gql`
  fragment Payment on Payment {
    id
    inserted_at
    updated_at
    status
    amount
    reference
    description
    email
    gateway_transaction_id
    card_details {
      cardholder_name
      card_number
      last_digits_card_number
      first_digits_card_number
      expiry_date
      card_brand
    }
  }
`;
export const PaymentEventFragmentDoc = gql`
  fragment PaymentEvent on PaymentEvent {
    id
    inserted_at
    updated_at
    type
    status
  }
`;
export const PaymentRefundFragmentDoc = gql`
  fragment PaymentRefund on PaymentRefund {
    id
    reference
    amount
    status
    user_external_id
    gateway_transaction_id
  }
`;
export const GetUserServicesDocument = gql`
  query GetUserServices($userId: ID!) {
    services: userServices(userId: $userId)
      @rest(
        type: "Service"
        path: "/internal/services/users/{args.userId}/services"
      ) {
      ...Service
    }
  }
  ${ServiceFragmentDoc}
`;
export type GetUserServicesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetUserServicesQuery,
    GetUserServicesQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetUserServicesQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetUserServicesComponent = (
  props: GetUserServicesComponentProps
) => (
  <ApolloReactComponents.Query<
    GetUserServicesQuery,
    GetUserServicesQueryVariables
  >
    query={GetUserServicesDocument}
    {...props}
  />
);

/**
 * __useGetUserServicesQuery__
 *
 * To run a query within a React component, call `useGetUserServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserServicesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserServicesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUserServicesQuery,
    GetUserServicesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetUserServicesQuery,
    GetUserServicesQueryVariables
  >(GetUserServicesDocument, baseOptions);
}
export function useGetUserServicesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUserServicesQuery,
    GetUserServicesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetUserServicesQuery,
    GetUserServicesQueryVariables
  >(GetUserServicesDocument, baseOptions);
}
export type GetUserServicesQueryHookResult = ReturnType<
  typeof useGetUserServicesQuery
>;
export type GetUserServicesLazyQueryHookResult = ReturnType<
  typeof useGetUserServicesLazyQuery
>;
export type GetUserServicesQueryResult = ApolloReactCommon.QueryResult<
  GetUserServicesQuery,
  GetUserServicesQueryVariables
>;
export const GetServiceDocument = gql`
  query GetService($id: ID!) {
    service(id: $id)
      @rest(type: "Service", path: "/internal/services/services/{args.id}") {
      ...Service
    }
  }
  ${ServiceFragmentDoc}
`;
export type GetServiceComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetServiceQuery,
    GetServiceQueryVariables
  >,
  "query"
> &
  ({ variables: GetServiceQueryVariables; skip?: boolean } | { skip: boolean });

export const GetServiceComponent = (props: GetServiceComponentProps) => (
  <ApolloReactComponents.Query<GetServiceQuery, GetServiceQueryVariables>
    query={GetServiceDocument}
    {...props}
  />
);

/**
 * __useGetServiceQuery__
 *
 * To run a query within a React component, call `useGetServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetServiceQuery,
    GetServiceQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetServiceQuery, GetServiceQueryVariables>(
    GetServiceDocument,
    baseOptions
  );
}
export function useGetServiceLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetServiceQuery,
    GetServiceQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetServiceQuery,
    GetServiceQueryVariables
  >(GetServiceDocument, baseOptions);
}
export type GetServiceQueryHookResult = ReturnType<typeof useGetServiceQuery>;
export type GetServiceLazyQueryHookResult = ReturnType<
  typeof useGetServiceLazyQuery
>;
export type GetServiceQueryResult = ApolloReactCommon.QueryResult<
  GetServiceQuery,
  GetServiceQueryVariables
>;
export const GetServiceWithUsersDocument = gql`
  query GetServiceWithUsers($id: ID!) {
    service(id: $id)
      @rest(type: "Service", path: "/internal/services/services/{args.id}") {
      id @export(as: "id")
      ...Service
      users
        @rest(
          type: "[ServiceUser]"
          path: "/internal/services/services/{exportVariables.id}/service-users"
        ) {
        user {
          id
          name
          email
        }
        role {
          name
        }
      }
    }
  }
  ${ServiceFragmentDoc}
`;
export type GetServiceWithUsersComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetServiceWithUsersQuery,
    GetServiceWithUsersQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetServiceWithUsersQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetServiceWithUsersComponent = (
  props: GetServiceWithUsersComponentProps
) => (
  <ApolloReactComponents.Query<
    GetServiceWithUsersQuery,
    GetServiceWithUsersQueryVariables
  >
    query={GetServiceWithUsersDocument}
    {...props}
  />
);

/**
 * __useGetServiceWithUsersQuery__
 *
 * To run a query within a React component, call `useGetServiceWithUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceWithUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceWithUsersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceWithUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetServiceWithUsersQuery,
    GetServiceWithUsersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetServiceWithUsersQuery,
    GetServiceWithUsersQueryVariables
  >(GetServiceWithUsersDocument, baseOptions);
}
export function useGetServiceWithUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetServiceWithUsersQuery,
    GetServiceWithUsersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetServiceWithUsersQuery,
    GetServiceWithUsersQueryVariables
  >(GetServiceWithUsersDocument, baseOptions);
}
export type GetServiceWithUsersQueryHookResult = ReturnType<
  typeof useGetServiceWithUsersQuery
>;
export type GetServiceWithUsersLazyQueryHookResult = ReturnType<
  typeof useGetServiceWithUsersLazyQuery
>;
export type GetServiceWithUsersQueryResult = ApolloReactCommon.QueryResult<
  GetServiceWithUsersQuery,
  GetServiceWithUsersQueryVariables
>;
export const GetServiceWithGatewayAccountsDocument = gql`
  query GetServiceWithGatewayAccounts($id: ID!) {
    service(id: $id)
      @rest(type: "Service", path: "/internal/services/services/{args.id}") {
      id @export(as: "id")
      ...Service
      gateway_accounts
        @rest(
          type: "[GatewayAccount]"
          path: "/internal/services/services/{exportVariables.id}/gateway-accounts"
        ) {
        ...GatewayAccount
      }
    }
  }
  ${ServiceFragmentDoc}
  ${GatewayAccountFragmentDoc}
`;
export type GetServiceWithGatewayAccountsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetServiceWithGatewayAccountsQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetServiceWithGatewayAccountsComponent = (
  props: GetServiceWithGatewayAccountsComponentProps
) => (
  <ApolloReactComponents.Query<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >
    query={GetServiceWithGatewayAccountsDocument}
    {...props}
  />
);

/**
 * __useGetServiceWithGatewayAccountsQuery__
 *
 * To run a query within a React component, call `useGetServiceWithGatewayAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceWithGatewayAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceWithGatewayAccountsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceWithGatewayAccountsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >(GetServiceWithGatewayAccountsDocument, baseOptions);
}
export function useGetServiceWithGatewayAccountsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >(GetServiceWithGatewayAccountsDocument, baseOptions);
}
export type GetServiceWithGatewayAccountsQueryHookResult = ReturnType<
  typeof useGetServiceWithGatewayAccountsQuery
>;
export type GetServiceWithGatewayAccountsLazyQueryHookResult = ReturnType<
  typeof useGetServiceWithGatewayAccountsLazyQuery
>;
export type GetServiceWithGatewayAccountsQueryResult = ApolloReactCommon.QueryResult<
  GetServiceWithGatewayAccountsQuery,
  GetServiceWithGatewayAccountsQueryVariables
>;
export const CreateServiceDocument = gql`
  mutation CreateService($input: CreateServiceInput!) {
    service: createService(input: $input)
      @rest(
        type: "Service"
        path: "/internal/services/services"
        method: "POST"
      ) {
      ...Service
    }
  }
  ${ServiceFragmentDoc}
`;
export type CreateServiceMutationFn = ApolloReactCommon.MutationFunction<
  CreateServiceMutation,
  CreateServiceMutationVariables
>;
export type CreateServiceComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateServiceMutation,
    CreateServiceMutationVariables
  >,
  "mutation"
>;

export const CreateServiceComponent = (props: CreateServiceComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateServiceMutation,
    CreateServiceMutationVariables
  >
    mutation={CreateServiceDocument}
    {...props}
  />
);

/**
 * __useCreateServiceMutation__
 *
 * To run a mutation, you first call `useCreateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceMutation, { data, loading, error }] = useCreateServiceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateServiceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateServiceMutation,
    CreateServiceMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateServiceMutation,
    CreateServiceMutationVariables
  >(CreateServiceDocument, baseOptions);
}
export type CreateServiceMutationHookResult = ReturnType<
  typeof useCreateServiceMutation
>;
export type CreateServiceMutationResult = ApolloReactCommon.MutationResult<
  CreateServiceMutation
>;
export type CreateServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateServiceMutation,
  CreateServiceMutationVariables
>;
export const UpdateServiceDocument = gql`
  mutation UpdateService($id: ID!, $input: UpdateServiceInput!) {
    service: updateService(id: $id, input: $input)
      @rest(
        type: "Service"
        path: "/internal/services/services/{args.id}"
        method: "PUT"
      ) {
      ...Service
    }
  }
  ${ServiceFragmentDoc}
`;
export type UpdateServiceMutationFn = ApolloReactCommon.MutationFunction<
  UpdateServiceMutation,
  UpdateServiceMutationVariables
>;
export type UpdateServiceComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateServiceMutation,
    UpdateServiceMutationVariables
  >,
  "mutation"
>;

export const UpdateServiceComponent = (props: UpdateServiceComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateServiceMutation,
    UpdateServiceMutationVariables
  >
    mutation={UpdateServiceDocument}
    {...props}
  />
);

/**
 * __useUpdateServiceMutation__
 *
 * To run a mutation, you first call `useUpdateServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceMutation, { data, loading, error }] = useUpdateServiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateServiceMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateServiceMutation,
    UpdateServiceMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateServiceMutation,
    UpdateServiceMutationVariables
  >(UpdateServiceDocument, baseOptions);
}
export type UpdateServiceMutationHookResult = ReturnType<
  typeof useUpdateServiceMutation
>;
export type UpdateServiceMutationResult = ApolloReactCommon.MutationResult<
  UpdateServiceMutation
>;
export type UpdateServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateServiceMutation,
  UpdateServiceMutationVariables
>;
export const SubmitRefundDocument = gql`
  mutation SubmitRefund($paymentId: ID!, $input: SubmitRefundInput!) {
    refund: submitRefund(paymentId: $paymentId, input: $input)
      @rest(
        type: "PaymentRefund"
        path: "/internal/payments/payments/{args.paymentId}/refunds"
        method: "POST"
      ) {
      ...PaymentRefund
    }
  }
  ${PaymentRefundFragmentDoc}
`;
export type SubmitRefundMutationFn = ApolloReactCommon.MutationFunction<
  SubmitRefundMutation,
  SubmitRefundMutationVariables
>;
export type SubmitRefundComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SubmitRefundMutation,
    SubmitRefundMutationVariables
  >,
  "mutation"
>;

export const SubmitRefundComponent = (props: SubmitRefundComponentProps) => (
  <ApolloReactComponents.Mutation<
    SubmitRefundMutation,
    SubmitRefundMutationVariables
  >
    mutation={SubmitRefundDocument}
    {...props}
  />
);

/**
 * __useSubmitRefundMutation__
 *
 * To run a mutation, you first call `useSubmitRefundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitRefundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitRefundMutation, { data, loading, error }] = useSubmitRefundMutation({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitRefundMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SubmitRefundMutation,
    SubmitRefundMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SubmitRefundMutation,
    SubmitRefundMutationVariables
  >(SubmitRefundDocument, baseOptions);
}
export type SubmitRefundMutationHookResult = ReturnType<
  typeof useSubmitRefundMutation
>;
export type SubmitRefundMutationResult = ApolloReactCommon.MutationResult<
  SubmitRefundMutation
>;
export type SubmitRefundMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SubmitRefundMutation,
  SubmitRefundMutationVariables
>;
export const GetGatewayAccountsDocument = gql`
  query GetGatewayAccounts($serviceId: ID!) {
    gatewayAccounts(serviceId: $serviceId)
      @rest(
        type: "[GatewayAccount]"
        path: "/internal/services/services/{args.serviceId}/gateway-accounts"
      ) {
      ...GatewayAccount
    }
  }
  ${GatewayAccountFragmentDoc}
`;
export type GetGatewayAccountsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetGatewayAccountsQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetGatewayAccountsComponent = (
  props: GetGatewayAccountsComponentProps
) => (
  <ApolloReactComponents.Query<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >
    query={GetGatewayAccountsDocument}
    {...props}
  />
);

/**
 * __useGetGatewayAccountsQuery__
 *
 * To run a query within a React component, call `useGetGatewayAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGatewayAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGatewayAccountsQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetGatewayAccountsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >(GetGatewayAccountsDocument, baseOptions);
}
export function useGetGatewayAccountsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >(GetGatewayAccountsDocument, baseOptions);
}
export type GetGatewayAccountsQueryHookResult = ReturnType<
  typeof useGetGatewayAccountsQuery
>;
export type GetGatewayAccountsLazyQueryHookResult = ReturnType<
  typeof useGetGatewayAccountsLazyQuery
>;
export type GetGatewayAccountsQueryResult = ApolloReactCommon.QueryResult<
  GetGatewayAccountsQuery,
  GetGatewayAccountsQueryVariables
>;
export const GetGatewayAccountDocument = gql`
  query GetGatewayAccount($id: ID!) {
    gatewayAccount(id: $id)
      @rest(
        type: "GatewayAccount"
        path: "/internal/payments/gateway-accounts/{args.id}"
      ) {
      ...GatewayAccount
    }
  }
  ${GatewayAccountFragmentDoc}
`;
export type GetGatewayAccountComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetGatewayAccountQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetGatewayAccountComponent = (
  props: GetGatewayAccountComponentProps
) => (
  <ApolloReactComponents.Query<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >
    query={GetGatewayAccountDocument}
    {...props}
  />
);

/**
 * __useGetGatewayAccountQuery__
 *
 * To run a query within a React component, call `useGetGatewayAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGatewayAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGatewayAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetGatewayAccountQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >(GetGatewayAccountDocument, baseOptions);
}
export function useGetGatewayAccountLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >(GetGatewayAccountDocument, baseOptions);
}
export type GetGatewayAccountQueryHookResult = ReturnType<
  typeof useGetGatewayAccountQuery
>;
export type GetGatewayAccountLazyQueryHookResult = ReturnType<
  typeof useGetGatewayAccountLazyQuery
>;
export type GetGatewayAccountQueryResult = ApolloReactCommon.QueryResult<
  GetGatewayAccountQuery,
  GetGatewayAccountQueryVariables
>;
export const UpdateGatewayAccountCredentialsDocument = gql`
  mutation UpdateGatewayAccountCredentials(
    $gatewayAccountId: ID!
    $input: UpdateGatewayAccountCredentialsInput!
  ) {
    credentials: updateGatewayAccountCredentials(
      gatewayAccountId: $gatewayAccountId
      input: $input
    )
      @rest(
        type: "GatewayAccountCredentials"
        path: "/internal/payments/gateway-accounts/{args.gatewayAccountId}/credentials"
        method: "PUT"
      ) {
      ...GatewayAccountCredentials
    }
  }
  ${GatewayAccountCredentialsFragmentDoc}
`;
export type UpdateGatewayAccountCredentialsMutationFn = ApolloReactCommon.MutationFunction<
  UpdateGatewayAccountCredentialsMutation,
  UpdateGatewayAccountCredentialsMutationVariables
>;
export type UpdateGatewayAccountCredentialsComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateGatewayAccountCredentialsMutation,
    UpdateGatewayAccountCredentialsMutationVariables
  >,
  "mutation"
>;

export const UpdateGatewayAccountCredentialsComponent = (
  props: UpdateGatewayAccountCredentialsComponentProps
) => (
  <ApolloReactComponents.Mutation<
    UpdateGatewayAccountCredentialsMutation,
    UpdateGatewayAccountCredentialsMutationVariables
  >
    mutation={UpdateGatewayAccountCredentialsDocument}
    {...props}
  />
);

/**
 * __useUpdateGatewayAccountCredentialsMutation__
 *
 * To run a mutation, you first call `useUpdateGatewayAccountCredentialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGatewayAccountCredentialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGatewayAccountCredentialsMutation, { data, loading, error }] = useUpdateGatewayAccountCredentialsMutation({
 *   variables: {
 *      gatewayAccountId: // value for 'gatewayAccountId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGatewayAccountCredentialsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateGatewayAccountCredentialsMutation,
    UpdateGatewayAccountCredentialsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateGatewayAccountCredentialsMutation,
    UpdateGatewayAccountCredentialsMutationVariables
  >(UpdateGatewayAccountCredentialsDocument, baseOptions);
}
export type UpdateGatewayAccountCredentialsMutationHookResult = ReturnType<
  typeof useUpdateGatewayAccountCredentialsMutation
>;
export type UpdateGatewayAccountCredentialsMutationResult = ApolloReactCommon.MutationResult<
  UpdateGatewayAccountCredentialsMutation
>;
export type UpdateGatewayAccountCredentialsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateGatewayAccountCredentialsMutation,
  UpdateGatewayAccountCredentialsMutationVariables
>;
export const GetProductsDocument = gql`
  query GetProducts($gatewayAccountId: ID!) {
    products(gatewayAccountId: $gatewayAccountId)
      @rest(
        type: "[Product]"
        path: "/internal/products/gateway-accounts/{args.gatewayAccountId}/products"
      ) {
      ...Product
    }
  }
  ${ProductFragmentDoc}
`;
export type GetProductsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetProductsQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetProductsComponent = (props: GetProductsComponentProps) => (
  <ApolloReactComponents.Query<GetProductsQuery, GetProductsQueryVariables>
    query={GetProductsDocument}
    {...props}
  />
);

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      gatewayAccountId: // value for 'gatewayAccountId'
 *   },
 * });
 */
export function useGetProductsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    baseOptions
  );
}
export function useGetProductsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >(GetProductsDocument, baseOptions);
}
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<
  typeof useGetProductsLazyQuery
>;
export type GetProductsQueryResult = ApolloReactCommon.QueryResult<
  GetProductsQuery,
  GetProductsQueryVariables
>;
export const CreateProductDocument = gql`
  mutation CreateProduct($gatewayAccountId: ID!, $input: CreateProductInput!) {
    product: createProduct(gatewayAccountId: $gatewayAccountId, input: $input)
      @rest(
        type: "Product"
        path: "/internal/products/gateway-accounts/{args.gatewayAccountId}/products"
        method: "POST"
      ) {
      ...Service
    }
  }
  ${ServiceFragmentDoc}
`;
export type CreateProductMutationFn = ApolloReactCommon.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export type CreateProductComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >,
  "mutation"
>;

export const CreateProductComponent = (props: CreateProductComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >
    mutation={CreateProductDocument}
    {...props}
  />
);

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      gatewayAccountId: // value for 'gatewayAccountId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument, baseOptions);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult = ApolloReactCommon.MutationResult<
  CreateProductMutation
>;
export type CreateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const GetPaymentsDocument = gql`
  query GetPayments($gatewayAccountId: ID!) {
    payments(gatewayAccountId: $gatewayAccountId)
      @rest(
        type: "[Payment]"
        path: "/internal/services/gateway-accounts/{args.gatewayAccountId}/payments"
      ) {
      ...Payment
    }
  }
  ${PaymentFragmentDoc}
`;
export type GetPaymentsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetPaymentsQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetPaymentsComponent = (props: GetPaymentsComponentProps) => (
  <ApolloReactComponents.Query<GetPaymentsQuery, GetPaymentsQueryVariables>
    query={GetPaymentsDocument}
    {...props}
  />
);

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *      gatewayAccountId: // value for 'gatewayAccountId'
 *   },
 * });
 */
export function useGetPaymentsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
    GetPaymentsDocument,
    baseOptions
  );
}
export function useGetPaymentsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >(GetPaymentsDocument, baseOptions);
}
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>;
export type GetPaymentsLazyQueryHookResult = ReturnType<
  typeof useGetPaymentsLazyQuery
>;
export type GetPaymentsQueryResult = ApolloReactCommon.QueryResult<
  GetPaymentsQuery,
  GetPaymentsQueryVariables
>;
export const GetPaymentDocument = gql`
  query GetPayment($id: ID!) {
    payment(id: $id)
      @rest(type: "Payment", path: "/internal/payments/payments/{args.id}") {
      ...Payment
    }
  }
  ${PaymentFragmentDoc}
`;
export type GetPaymentComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetPaymentQuery,
    GetPaymentQueryVariables
  >,
  "query"
> &
  ({ variables: GetPaymentQueryVariables; skip?: boolean } | { skip: boolean });

export const GetPaymentComponent = (props: GetPaymentComponentProps) => (
  <ApolloReactComponents.Query<GetPaymentQuery, GetPaymentQueryVariables>
    query={GetPaymentDocument}
    {...props}
  />
);

/**
 * __useGetPaymentQuery__
 *
 * To run a query within a React component, call `useGetPaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPaymentQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPaymentQuery,
    GetPaymentQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetPaymentQuery, GetPaymentQueryVariables>(
    GetPaymentDocument,
    baseOptions
  );
}
export function useGetPaymentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentQuery,
    GetPaymentQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPaymentQuery,
    GetPaymentQueryVariables
  >(GetPaymentDocument, baseOptions);
}
export type GetPaymentQueryHookResult = ReturnType<typeof useGetPaymentQuery>;
export type GetPaymentLazyQueryHookResult = ReturnType<
  typeof useGetPaymentLazyQuery
>;
export type GetPaymentQueryResult = ApolloReactCommon.QueryResult<
  GetPaymentQuery,
  GetPaymentQueryVariables
>;
export const GetPaymentEventsDocument = gql`
  query GetPaymentEvents($paymentId: ID!) {
    events: paymentEvents(paymentId: $paymentId)
      @rest(
        type: "[PaymentEvent]"
        path: "/internal/payments/payments/{args.paymentId}/events"
      ) {
      ...PaymentEvent
    }
  }
  ${PaymentEventFragmentDoc}
`;
export type GetPaymentEventsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetPaymentEventsQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetPaymentEventsComponent = (
  props: GetPaymentEventsComponentProps
) => (
  <ApolloReactComponents.Query<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >
    query={GetPaymentEventsDocument}
    {...props}
  />
);

/**
 * __useGetPaymentEventsQuery__
 *
 * To run a query within a React component, call `useGetPaymentEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentEventsQuery({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *   },
 * });
 */
export function useGetPaymentEventsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >(GetPaymentEventsDocument, baseOptions);
}
export function useGetPaymentEventsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >(GetPaymentEventsDocument, baseOptions);
}
export type GetPaymentEventsQueryHookResult = ReturnType<
  typeof useGetPaymentEventsQuery
>;
export type GetPaymentEventsLazyQueryHookResult = ReturnType<
  typeof useGetPaymentEventsLazyQuery
>;
export type GetPaymentEventsQueryResult = ApolloReactCommon.QueryResult<
  GetPaymentEventsQuery,
  GetPaymentEventsQueryVariables
>;
