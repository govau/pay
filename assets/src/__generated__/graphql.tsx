import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as React from "react";
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

export type CardType = {
  __typename?: "CardType";
  id: Scalars["String"];
  brand?: Maybe<Scalars["String"]>;
  label?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type CheckAuthResponse = {
  __typename?: "CheckAuthResponse";
  isAuthenticated: Scalars["Boolean"];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: "Mutation";
  signout: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  checkAuth: CheckAuthResponse;
  cardTypes: Array<CardType>;
};

export type User = {
  __typename?: "User";
  id: Scalars["String"];
  insertedAt: Scalars["String"];
  updatedAt: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  mobilePhone?: Maybe<Scalars["String"]>;
};
export type UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "insertedAt" | "updatedAt" | "name" | "email" | "mobilePhone"
>;

export type SignoutMutationVariables = {};

export type SignoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "signout"
>;

export type UserQueryVariables = {};

export type UserQuery = { __typename?: "Query" } & {
  user: Maybe<{ __typename?: "User" } & UserFragment>;
};

export type CheckAuthQueryVariables = {};

export type CheckAuthQuery = { __typename?: "Query" } & {
  checkAuth: { __typename?: "CheckAuthResponse" } & Pick<
    CheckAuthResponse,
    "isAuthenticated"
  > & { user: Maybe<{ __typename?: "User" } & UserFragment> };
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
export const UserFragmentDoc = gql`
  fragment User on User {
    id
    insertedAt
    updatedAt
    name
    email
    mobilePhone
  }
`;
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
    checkAuth {
      isAuthenticated
      user {
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

export type CardTypesProps<TChildProps = {}> = ApolloReactHoc.DataProps<
  CardTypesQuery,
  CardTypesQueryVariables
> &
  TChildProps;
export function withCardTypes<TProps, TChildProps = {}>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CardTypesQuery,
    CardTypesQueryVariables,
    CardTypesProps<TChildProps>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    CardTypesQuery,
    CardTypesQueryVariables,
    CardTypesProps<TChildProps>
  >(CardTypesDocument, {
    alias: "cardTypes",
    ...operationOptions
  });
}
export type CardTypesQueryResult = ApolloReactCommon.QueryResult<
  CardTypesQuery,
  CardTypesQueryVariables
>;
