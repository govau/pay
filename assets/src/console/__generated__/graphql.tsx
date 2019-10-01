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
};

export type MutationCreateServiceArgs = {
  input: CreateServiceInput;
};

export type Query = {
  __typename?: "Query";
  dummy?: Maybe<Scalars["String"]>;
  services: Array<Service>;
  getService: Service;
};

export type QueryGetServiceArgs = {
  id: Scalars["ID"];
};

export type Service = {
  __typename?: "Service";
  external_id: Scalars["ID"];
  name: Scalars["String"];
};
export type UserServicesQueryVariables = {};

export type UserServicesQuery = { __typename?: "Query" } & {
  services: Array<
    { __typename?: "Service" } & Pick<Service, "external_id" | "name">
  >;
};

export type GetServiceQueryVariables = {
  id: Scalars["ID"];
};

export type GetServiceQuery = { __typename?: "Query" } & {
  service: { __typename?: "Service" } & Pick<Service, "external_id" | "name">;
};

export type CreateServiceMutationVariables = {
  input: CreateServiceInput;
};

export type CreateServiceMutation = { __typename?: "Mutation" } & {
  service: { __typename?: "Service" } & Pick<Service, "external_id" | "name">;
};

export const UserServicesDocument = gql`
  query UserServices {
    services
      @rest(
        type: "Service"
        path: "/internal/services/users/{context.userId}/services"
      ) {
      external_id
      name
    }
  }
`;
export type UserServicesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    UserServicesQuery,
    UserServicesQueryVariables
  >,
  "query"
>;

export const UserServicesComponent = (props: UserServicesComponentProps) => (
  <ApolloReactComponents.Query<UserServicesQuery, UserServicesQueryVariables>
    query={UserServicesDocument}
    {...props}
  />
);

export function useUserServicesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    UserServicesQuery,
    UserServicesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    UserServicesQuery,
    UserServicesQueryVariables
  >(UserServicesDocument, baseOptions);
}
export function useUserServicesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserServicesQuery,
    UserServicesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    UserServicesQuery,
    UserServicesQueryVariables
  >(UserServicesDocument, baseOptions);
}

export type UserServicesQueryHookResult = ReturnType<
  typeof useUserServicesQuery
>;
export type UserServicesQueryResult = ApolloReactCommon.QueryResult<
  UserServicesQuery,
  UserServicesQueryVariables
>;
export const GetServiceDocument = gql`
  query GetService($id: ID!) {
    service: getService(id: $id)
      @rest(type: "Service", path: "/internal/services/services/{args.id}") {
      external_id
      name
    }
  }
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
export const CreateServiceDocument = gql`
  mutation CreateService($input: CreateServiceInput!) {
    service: createService(input: $input)
      @rest(
        type: "Service"
        path: "/internal/services/services"
        method: "POST"
      ) {
      external_id
      name
    }
  }
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
