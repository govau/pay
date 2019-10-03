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
};

export type QueryGetUserServicesArgs = {
  userId: Scalars["ID"];
};

export type QueryGetServiceArgs = {
  id: Scalars["ID"];
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
  users?: Maybe<Array<ServiceUser>>;
};

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
  email?: Maybe<Scalars["String"]>;
  telephone_number?: Maybe<Scalars["String"]>;
};
export type ServiceFragment = { __typename?: "Service" } & Pick<
  Service,
  "id" | "name"
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
  service: ({ __typename?: "Service" } & Pick<Service, "id"> & {
      users: Maybe<
        Array<
          { __typename?: "ServiceUser" } & {
            user: { __typename?: "User" } & Pick<User, "id" | "name" | "email">;
            role: { __typename?: "Role" } & Pick<Role, "name">;
          }
        >
      >;
    }) &
    ServiceFragment;
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
export const ServiceFragmentDoc = gql`
  fragment Service on Service {
    id
    name
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
