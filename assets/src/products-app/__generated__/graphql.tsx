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

export type GatewayAccount = {
  __typename?: "GatewayAccount";
  id: Scalars["ID"];
  payment_provider: GatewayAccountPaymentProvider;
  type: GatewayAccountType;
  service_name: Scalars["String"];
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

export type Product = {
  __typename?: "Product";
  id: Scalars["ID"];
  name: Scalars["String"];
  description: Scalars["String"];
  gatewayAccount: GatewayAccount;
};

export type Query = {
  __typename?: "Query";
  product: Product;
};

export type QueryProductArgs = {
  serviceNameSlug: Scalars["String"];
  nameSlug: Scalars["String"];
};

export type SandboxCredentials = {
  __typename?: "SandboxCredentials";
  dummy?: Maybe<Scalars["String"]>;
};

export type ProductFragment = { __typename?: "Product" } & Pick<
  Product,
  "id" | "name"
>;

export type GetProductQueryVariables = {
  serviceNameSlug: Scalars["String"];
  nameSlug: Scalars["String"];
};

export type GetProductQuery = { __typename?: "Query" } & {
  product: { __typename?: "Product" } & ProductFragment;
};

export const ProductFragmentDoc = gql`
  fragment Product on Product {
    id
    name
  }
`;
export const GetProductDocument = gql`
  query GetProduct($serviceNameSlug: String!, $nameSlug: String!) {
    product(serviceNameSlug: $serviceNameSlug, nameSlug: $nameSlug)
      @rest(
        type: "Product"
        path: "/internal/products/products/{args.serviceNameSlug}/{args.nameSlug}"
      ) {
      ...Product
    }
  }
  ${ProductFragmentDoc}
`;
export type GetProductComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetProductQuery,
    GetProductQueryVariables
  >,
  "query"
> &
  ({ variables: GetProductQueryVariables; skip?: boolean } | { skip: boolean });

export const GetProductComponent = (props: GetProductComponentProps) => (
  <ApolloReactComponents.Query<GetProductQuery, GetProductQueryVariables>
    query={GetProductDocument}
    {...props}
  />
);

/**
 * __useGetProductQuery__
 *
 * To run a query within a React component, call `useGetProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductQuery({
 *   variables: {
 *      serviceNameSlug: // value for 'serviceNameSlug'
 *      nameSlug: // value for 'nameSlug'
 *   },
 * });
 */
export function useGetProductQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProductQuery,
    GetProductQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetProductQuery, GetProductQueryVariables>(
    GetProductDocument,
    baseOptions
  );
}
export function useGetProductLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProductQuery,
    GetProductQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetProductQuery,
    GetProductQueryVariables
  >(GetProductDocument, baseOptions);
}
export type GetProductQueryHookResult = ReturnType<typeof useGetProductQuery>;
export type GetProductLazyQueryHookResult = ReturnType<
  typeof useGetProductLazyQuery
>;
export type GetProductQueryResult = ApolloReactCommon.QueryResult<
  GetProductQuery,
  GetProductQueryVariables
>;
