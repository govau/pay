import gql from "graphql-tag";
import * as React from "react";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactComponents from "@apollo/react-components";
import * as ApolloReactHoc from "@apollo/react-hoc";
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

export type CheckAuthResponse = {
  __typename?: "CheckAuthResponse";
  is_authenticated: Scalars["Boolean"];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  signout: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  dummy?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
  checkAuth: CheckAuthResponse;
};

export type User = {
  __typename?: "User";
  external_id: Scalars["ID"];
  inserted_at: Scalars["String"];
  updated_at: Scalars["String"];
  platform_admin: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  telephone_number?: Maybe<Scalars["String"]>;
};
export type UserFragment = { __typename?: "User" } & Pick<
  User,
  | "external_id"
  | "inserted_at"
  | "updated_at"
  | "platform_admin"
  | "name"
  | "email"
  | "telephone_number"
>;

export type UserQueryVariables = {};

export type UserQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & UserFragment>;
};

export type CheckAuthQueryVariables = {};

export type CheckAuthQuery = { __typename?: "Query" } & {
  checkAuth: { __typename?: "CheckAuthResponse" } & Pick<
    CheckAuthResponse,
    "is_authenticated"
  > & { user: Maybe<{ __typename?: "User" } & UserFragment> };
};

export type SignoutMutationVariables = {};

export type SignoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "signout"
>;
export const UserFragmentDoc = gql`
  fragment User on User {
    external_id
    inserted_at
    updated_at
    platform_admin
    name
    email
    telephone_number
  }
`;
export const UserDocument = gql`
  query User {
    user {
      ...User
    }
  }
  ${UserFragmentDoc}
`;
export type UserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UserQuery, UserQueryVariables>,
  "query"
>;

export const UserComponent = (props: UserComponentProps) => (
  <ApolloReactComponents.Query<UserQuery, UserQueryVariables>
    query={UserDocument}
    {...props}
  />
);

export type UserProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  UserQuery,
  UserQueryVariables
> &
  TChildProps;
export function withUser<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UserQuery,
    UserQueryVariables,
    UserProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    UserQuery,
    UserQueryVariables,
    UserProps<TChildProps>
  >(UserDocument, {
    alias: "user",
    ...operationOptions
  });
}
export type UserQueryResult = ApolloReactCommon.QueryResult<
  UserQuery,
  UserQueryVariables
>;
export const CheckAuthDocument = gql`
  query CheckAuth {
    checkAuth
      @rest(type: "CheckAuthResponse", path: "/internal/services/auth/check") {
      is_authenticated
      user @type(name: "User") {
        ...User
      }
    }
  }
  ${UserFragmentDoc}
`;
export type CheckAuthComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    CheckAuthQuery,
    CheckAuthQueryVariables
  >,
  "query"
>;

export const CheckAuthComponent = (props: CheckAuthComponentProps) => (
  <ApolloReactComponents.Query<CheckAuthQuery, CheckAuthQueryVariables>
    query={CheckAuthDocument}
    {...props}
  />
);

export type CheckAuthProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  CheckAuthQuery,
  CheckAuthQueryVariables
> &
  TChildProps;
export function withCheckAuth<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CheckAuthQuery,
    CheckAuthQueryVariables,
    CheckAuthProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    CheckAuthQuery,
    CheckAuthQueryVariables,
    CheckAuthProps<TChildProps>
  >(CheckAuthDocument, {
    alias: "checkAuth",
    ...operationOptions
  });
}
export type CheckAuthQueryResult = ApolloReactCommon.QueryResult<
  CheckAuthQuery,
  CheckAuthQueryVariables
>;
export const SignoutDocument = gql`
  mutation Signout {
    signout
  }
`;
export type SignoutMutationFn = ApolloReactCommon.MutationFunction<
  SignoutMutation,
  SignoutMutationVariables
>;
export type SignoutComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SignoutMutation,
    SignoutMutationVariables
  >,
  "mutation"
>;

export const SignoutComponent = (props: SignoutComponentProps) => (
  <ApolloReactComponents.Mutation<SignoutMutation, SignoutMutationVariables>
    mutation={SignoutDocument}
    {...props}
  />
);

export type SignoutProps<TChildProps = {}> = ApolloReactHoc.MutateProps<
  SignoutMutation,
  SignoutMutationVariables
> &
  TChildProps;
export function withSignout<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignoutMutation,
    SignoutMutationVariables,
    SignoutProps<TChildProps>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SignoutMutation,
    SignoutMutationVariables,
    SignoutProps<TChildProps>
  >(SignoutDocument, {
    alias: "signout",
    ...operationOptions
  });
}
export type SignoutMutationResult = ApolloReactCommon.MutationResult<
  SignoutMutation
>;
export type SignoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignoutMutation,
  SignoutMutationVariables
>;
