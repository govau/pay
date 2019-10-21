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
  createProduct: Service;
};

export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};

export type MutationUpdateServiceArgs = {
  id: Scalars["ID"];
  input: UpdateServiceInput;
};

export type MutationCreateProductArgs = {
  gatewayAccountId: Scalars["ID"];
  input: CreateProductInput;
};

export type Payment = {
  __typename?: "Payment";
  id: Scalars["ID"];
  inserted_at: Scalars["String"];
  status: PaymentStatus;
  amount: Scalars["Int"];
  reference: Scalars["String"];
  description: Scalars["String"];
  email: Scalars["String"];
  card_details?: Maybe<CardDetails>;
  gateway_account: GatewayAccount;
};

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

export type Query = {
  __typename?: "Query";
  getUserServices: Array<Service>;
  getService: Service;
  getServiceGatewayAccounts: Array<GatewayAccount>;
  getGatewayAccount: GatewayAccount;
  getGatewayAccountProducts: Array<Product>;
  getPayments: Array<Payment>;
};

export type QueryGetUserServicesArgs = {
  userId: Scalars["ID"];
};

export type QueryGetServiceArgs = {
  id: Scalars["ID"];
};

export type QueryGetServiceGatewayAccountsArgs = {
  serviceId: Scalars["ID"];
};

export type QueryGetGatewayAccountArgs = {
  id: Scalars["ID"];
};

export type QueryGetGatewayAccountProductsArgs = {
  gatewayAccountId: Scalars["ID"];
};

export type QueryGetPaymentsArgs = {
  gatewayAccountId: Scalars["ID"];
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
          "account_number" | "api_username"
        >);
  };

export type ProductFragment = { __typename?: "Product" } & Pick<
  Product,
  "id" | "name" | "name_slug" | "service_name_slug" | "description"
>;

export type PaymentFragment = { __typename?: "Payment" } & Pick<
  Payment,
  | "id"
  | "inserted_at"
  | "status"
  | "amount"
  | "reference"
  | "description"
  | "email"
> & {
    card_details: Maybe<
      { __typename?: "CardDetails" } & Pick<
        CardDetails,
        | "cardholder_name"
        | "card_brand"
        | "last_digits_card_number"
        | "first_digits_card_number"
      >
    >;
  };

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

export type GetServiceGatewayAccountsQueryVariables = {
  serviceId: Scalars["ID"];
};

export type GetServiceGatewayAccountsQuery = { __typename?: "Query" } & {
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

export type GetGatewayAccountProductsQueryVariables = {
  gatewayAccountId: Scalars["ID"];
};

export type GetGatewayAccountProductsQuery = { __typename?: "Query" } & {
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
        account_number
        api_username
      }
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
    status
    amount
    reference
    description
    email
    card_details {
      cardholder_name
      card_brand
      last_digits_card_number
      first_digits_card_number
    }
  }
`;
export const GetUserServicesDocument = gql`
  query GetUserServices($userId: ID!) {
    services: getUserServices(userId: $userId)
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
    service: getService(id: $id)
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
    service: getService(id: $id)
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
    service: getService(id: $id)
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
export const GetServiceGatewayAccountsDocument = gql`
  query GetServiceGatewayAccounts($serviceId: ID!) {
    gatewayAccounts: getServiceGatewayAccounts(serviceId: $serviceId)
      @rest(
        type: "[GatewayAccount]"
        path: "/internal/services/services/{args.serviceId}/gateway-accounts"
      ) {
      ...GatewayAccount
    }
  }
  ${GatewayAccountFragmentDoc}
`;
export type GetServiceGatewayAccountsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetServiceGatewayAccountsQuery,
    GetServiceGatewayAccountsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetServiceGatewayAccountsQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetServiceGatewayAccountsComponent = (
  props: GetServiceGatewayAccountsComponentProps
) => (
  <ApolloReactComponents.Query<
    GetServiceGatewayAccountsQuery,
    GetServiceGatewayAccountsQueryVariables
  >
    query={GetServiceGatewayAccountsDocument}
    {...props}
  />
);

/**
 * __useGetServiceGatewayAccountsQuery__
 *
 * To run a query within a React component, call `useGetServiceGatewayAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceGatewayAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceGatewayAccountsQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetServiceGatewayAccountsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetServiceGatewayAccountsQuery,
    GetServiceGatewayAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetServiceGatewayAccountsQuery,
    GetServiceGatewayAccountsQueryVariables
  >(GetServiceGatewayAccountsDocument, baseOptions);
}
export function useGetServiceGatewayAccountsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetServiceGatewayAccountsQuery,
    GetServiceGatewayAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetServiceGatewayAccountsQuery,
    GetServiceGatewayAccountsQueryVariables
  >(GetServiceGatewayAccountsDocument, baseOptions);
}
export type GetServiceGatewayAccountsQueryHookResult = ReturnType<
  typeof useGetServiceGatewayAccountsQuery
>;
export type GetServiceGatewayAccountsLazyQueryHookResult = ReturnType<
  typeof useGetServiceGatewayAccountsLazyQuery
>;
export type GetServiceGatewayAccountsQueryResult = ApolloReactCommon.QueryResult<
  GetServiceGatewayAccountsQuery,
  GetServiceGatewayAccountsQueryVariables
>;
export const GetGatewayAccountDocument = gql`
  query GetGatewayAccount($id: ID!) {
    gatewayAccount: getGatewayAccount(id: $id)
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
export const GetGatewayAccountProductsDocument = gql`
  query GetGatewayAccountProducts($gatewayAccountId: ID!) {
    products: getGatewayAccountProducts(gatewayAccountId: $gatewayAccountId)
      @rest(
        type: "[Product]"
        path: "/internal/products/gateway-accounts/{args.gatewayAccountId}/products"
      ) {
      ...Product
    }
  }
  ${ProductFragmentDoc}
`;
export type GetGatewayAccountProductsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetGatewayAccountProductsQuery,
    GetGatewayAccountProductsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetGatewayAccountProductsQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetGatewayAccountProductsComponent = (
  props: GetGatewayAccountProductsComponentProps
) => (
  <ApolloReactComponents.Query<
    GetGatewayAccountProductsQuery,
    GetGatewayAccountProductsQueryVariables
  >
    query={GetGatewayAccountProductsDocument}
    {...props}
  />
);

/**
 * __useGetGatewayAccountProductsQuery__
 *
 * To run a query within a React component, call `useGetGatewayAccountProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGatewayAccountProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGatewayAccountProductsQuery({
 *   variables: {
 *      gatewayAccountId: // value for 'gatewayAccountId'
 *   },
 * });
 */
export function useGetGatewayAccountProductsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetGatewayAccountProductsQuery,
    GetGatewayAccountProductsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetGatewayAccountProductsQuery,
    GetGatewayAccountProductsQueryVariables
  >(GetGatewayAccountProductsDocument, baseOptions);
}
export function useGetGatewayAccountProductsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetGatewayAccountProductsQuery,
    GetGatewayAccountProductsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetGatewayAccountProductsQuery,
    GetGatewayAccountProductsQueryVariables
  >(GetGatewayAccountProductsDocument, baseOptions);
}
export type GetGatewayAccountProductsQueryHookResult = ReturnType<
  typeof useGetGatewayAccountProductsQuery
>;
export type GetGatewayAccountProductsLazyQueryHookResult = ReturnType<
  typeof useGetGatewayAccountProductsLazyQuery
>;
export type GetGatewayAccountProductsQueryResult = ApolloReactCommon.QueryResult<
  GetGatewayAccountProductsQuery,
  GetGatewayAccountProductsQueryVariables
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
    payments: getPayments(gatewayAccountId: $gatewayAccountId)
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
