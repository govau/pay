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
  input?: Maybe<CreateServiceInput>;
};

export type Query = {
  __typename?: "Query";
  dummy?: Maybe<Scalars["String"]>;
  services: Array<Service>;
};

export type Service = {
  __typename?: "Service";
  id: Scalars["String"];
  name: Scalars["String"];
};
export type UserServicesQueryVariables = {};

export type UserServicesQuery = { __typename?: "Query" } & {
  services: Array<{ __typename?: "Service" } & Pick<Service, "id" | "name">>;
};

export type CreateServiceMutationVariables = {
  input: CreateServiceInput;
};

export type CreateServiceMutation = { __typename?: "Mutation" } & {
  createService: { __typename?: "Service" } & Pick<Service, "id" | "name">;
};

export const UserServicesDocument = gql`
  query UserServices {
    services
      @rest(
        type: "Service"
        path: "/internal/services/users/{context.userId}/services"
      ) {
      id
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
export const CreateServiceDocument = gql`
  mutation CreateService($input: CreateServiceInput!) {
    createService(input: $input)
      @rest(
        type: "Service"
        path: "/internal/services/services"
        method: "POST"
      ) {
      id
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
