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

export type CheckAuthResponse = {
  __typename?: "CheckAuthResponse";
  is_authenticated: Scalars["Boolean"];
  user?: Maybe<User>;
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
  signout: Scalars["Boolean"];
};

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
  user?: Maybe<User>;
  checkAuth: CheckAuthResponse;
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

export type UserFragment = { __typename?: "User" } & Pick<
  User,
  | "id"
  | "inserted_at"
  | "updated_at"
  | "platform_admin"
  | "name"
  | "email"
  | "telephone_number"
>;

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
    id
    inserted_at
    updated_at
    platform_admin
    name
    email
    telephone_number
  }
`;
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

/**
 * __useCheckAuthQuery__
 *
 * To run a query within a React component, call `useCheckAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckAuthQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CheckAuthQuery,
    CheckAuthQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CheckAuthQuery, CheckAuthQueryVariables>(
    CheckAuthDocument,
    baseOptions
  );
}
export function useCheckAuthLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CheckAuthQuery,
    CheckAuthQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<CheckAuthQuery, CheckAuthQueryVariables>(
    CheckAuthDocument,
    baseOptions
  );
}
export type CheckAuthQueryHookResult = ReturnType<typeof useCheckAuthQuery>;
export type CheckAuthLazyQueryHookResult = ReturnType<
  typeof useCheckAuthLazyQuery
>;
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

/**
 * __useSignoutMutation__
 *
 * To run a mutation, you first call `useSignoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signoutMutation, { data, loading, error }] = useSignoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignoutMutation,
    SignoutMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SignoutMutation,
    SignoutMutationVariables
  >(SignoutDocument, baseOptions);
}
export type SignoutMutationHookResult = ReturnType<typeof useSignoutMutation>;
export type SignoutMutationResult = ApolloReactCommon.MutationResult<
  SignoutMutation
>;
export type SignoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignoutMutation,
  SignoutMutationVariables
>;
