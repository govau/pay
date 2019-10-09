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
  description: Scalars["String"];
  allow_apple_pay: Scalars["Boolean"];
  allow_google_pay: Scalars["Boolean"];
  allow_zero_amount: Scalars["Boolean"];
  requires_3ds: Scalars["Boolean"];
};

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
};

export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};

export type MutationUpdateServiceArgs = {
  id: Scalars["ID"];
  input: UpdateServiceInput;
};

export type Query = {
  __typename?: "Query";
  dummy?: Maybe<Scalars["String"]>;
  getUserServices: Array<Service>;
  getService: Service;
  getServiceGatewayAccounts: Array<GatewayAccount>;
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

export type Role = {
  __typename?: "Role";
  id: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
};

export type Service = {
  __typename?: "Service";
  id: Scalars["ID"];
  name: Scalars["String"];
  current_go_live_stage: ServiceGoLiveStage;
  users?: Maybe<Array<ServiceUser>>;
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
    { __typename?: "GatewayAccount" } & Pick<GatewayAccount, "id" | "type">
  >;
};

export const ServiceFragmentDoc = gql`
  fragment Service on Service {
    id
    name
    current_go_live_stage
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
      id
      type
    }
  }
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
