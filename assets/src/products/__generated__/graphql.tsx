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

export type CreatePaymentInput = {
  dummy?: Maybe<Scalars["String"]>;
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
  createPayment: ProductPayment;
  updatePayment: ProductPayment;
};

export type MutationCreatePaymentArgs = {
  serviceNameSlug: Scalars["String"];
  nameSlug: Scalars["String"];
  input: CreatePaymentInput;
};

export type MutationUpdatePaymentArgs = {
  id: Scalars["ID"];
  input: UpdatePaymentInput;
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

export type ProductPayment = {
  __typename?: "ProductPayment";
  id: Scalars["ID"];
  product: Product;
  reference: Scalars["String"];
  amount: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  product: Product;
  productPayment: ProductPayment;
};

export type QueryProductArgs = {
  serviceNameSlug: Scalars["String"];
  nameSlug: Scalars["String"];
};

export type QueryProductPaymentArgs = {
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

export type UpdatePaymentInput = {
  payment: UpdatePaymentPayment;
};

export type UpdatePaymentPayment = {
  reference: Scalars["String"];
  amount?: Maybe<Scalars["Int"]>;
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

export type ProductFragment = { __typename?: "Product" } & Pick<
  Product,
  | "id"
  | "name"
  | "name_slug"
  | "description"
  | "service_name_slug"
  | "reference_enabled"
  | "reference_label"
  | "reference_hint"
  | "price_fixed"
  | "price"
> & {
    gateway_account: { __typename?: "GatewayAccount" } & Pick<
      GatewayAccount,
      "id"
    > & { service: { __typename?: "Service" } & Pick<Service, "id" | "name"> };
  };

export type ProductPaymentFragment = { __typename?: "ProductPayment" } & Pick<
  ProductPayment,
  "id" | "reference" | "amount"
> & { product: { __typename?: "Product" } & ProductFragment };

export type GetProductQueryVariables = {
  serviceNameSlug: Scalars["String"];
  nameSlug: Scalars["String"];
};

export type GetProductQuery = { __typename?: "Query" } & {
  product: { __typename?: "Product" } & ProductFragment;
};

export type GetProductPaymentQueryVariables = {
  id: Scalars["ID"];
};

export type GetProductPaymentQuery = { __typename?: "Query" } & {
  productPayment: { __typename?: "ProductPayment" } & ProductPaymentFragment;
};

export type CreatePaymentMutationVariables = {
  serviceNameSlug: Scalars["String"];
  nameSlug: Scalars["String"];
  input: CreatePaymentInput;
};

export type CreatePaymentMutation = { __typename?: "Mutation" } & {
  payment: { __typename?: "ProductPayment" } & ProductPaymentFragment;
};

export type UpdatePaymentMutationVariables = {
  id: Scalars["ID"];
  input: UpdatePaymentInput;
};

export type UpdatePaymentMutation = { __typename?: "Mutation" } & {
  payment: { __typename?: "ProductPayment" } & ProductPaymentFragment;
};

export const ProductFragmentDoc = gql`
  fragment Product on Product {
    id
    name
    name_slug
    description
    service_name_slug
    reference_enabled
    reference_label
    reference_hint
    price_fixed
    price
    gateway_account {
      id
      service {
        id
        name
      }
    }
  }
`;
export const ProductPaymentFragmentDoc = gql`
  fragment ProductPayment on ProductPayment {
    id
    reference
    amount
    product {
      ...Product
    }
  }
  ${ProductFragmentDoc}
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
export const GetProductPaymentDocument = gql`
  query GetProductPayment($id: ID!) {
    productPayment(id: $id)
      @rest(
        type: "ProductPayment"
        path: "/internal/products/product-payments/{args.id}"
      ) {
      ...ProductPayment
    }
  }
  ${ProductPaymentFragmentDoc}
`;
export type GetProductPaymentComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetProductPaymentQuery,
    GetProductPaymentQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetProductPaymentQueryVariables; skip?: boolean }
    | { skip: boolean });

export const GetProductPaymentComponent = (
  props: GetProductPaymentComponentProps
) => (
  <ApolloReactComponents.Query<
    GetProductPaymentQuery,
    GetProductPaymentQueryVariables
  >
    query={GetProductPaymentDocument}
    {...props}
  />
);

/**
 * __useGetProductPaymentQuery__
 *
 * To run a query within a React component, call `useGetProductPaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductPaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductPaymentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProductPaymentQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProductPaymentQuery,
    GetProductPaymentQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetProductPaymentQuery,
    GetProductPaymentQueryVariables
  >(GetProductPaymentDocument, baseOptions);
}
export function useGetProductPaymentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProductPaymentQuery,
    GetProductPaymentQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetProductPaymentQuery,
    GetProductPaymentQueryVariables
  >(GetProductPaymentDocument, baseOptions);
}
export type GetProductPaymentQueryHookResult = ReturnType<
  typeof useGetProductPaymentQuery
>;
export type GetProductPaymentLazyQueryHookResult = ReturnType<
  typeof useGetProductPaymentLazyQuery
>;
export type GetProductPaymentQueryResult = ApolloReactCommon.QueryResult<
  GetProductPaymentQuery,
  GetProductPaymentQueryVariables
>;
export const CreatePaymentDocument = gql`
  mutation CreatePayment(
    $serviceNameSlug: String!
    $nameSlug: String!
    $input: CreatePaymentInput!
  ) {
    payment: createPayment(
      serviceNameSlug: $serviceNameSlug
      nameSlug: $nameSlug
      input: $input
    )
      @rest(
        type: "ProductPayment"
        path: "/internal/products/products/{args.serviceNameSlug}/{args.nameSlug}/payments"
        method: "POST"
      ) {
      ...ProductPayment
    }
  }
  ${ProductPaymentFragmentDoc}
`;
export type CreatePaymentMutationFn = ApolloReactCommon.MutationFunction<
  CreatePaymentMutation,
  CreatePaymentMutationVariables
>;
export type CreatePaymentComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreatePaymentMutation,
    CreatePaymentMutationVariables
  >,
  "mutation"
>;

export const CreatePaymentComponent = (props: CreatePaymentComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreatePaymentMutation,
    CreatePaymentMutationVariables
  >
    mutation={CreatePaymentDocument}
    {...props}
  />
);

/**
 * __useCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPaymentMutation, { data, loading, error }] = useCreatePaymentMutation({
 *   variables: {
 *      serviceNameSlug: // value for 'serviceNameSlug'
 *      nameSlug: // value for 'nameSlug'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePaymentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePaymentMutation,
    CreatePaymentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreatePaymentMutation,
    CreatePaymentMutationVariables
  >(CreatePaymentDocument, baseOptions);
}
export type CreatePaymentMutationHookResult = ReturnType<
  typeof useCreatePaymentMutation
>;
export type CreatePaymentMutationResult = ApolloReactCommon.MutationResult<
  CreatePaymentMutation
>;
export type CreatePaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePaymentMutation,
  CreatePaymentMutationVariables
>;
export const UpdatePaymentDocument = gql`
  mutation UpdatePayment($id: ID!, $input: UpdatePaymentInput!) {
    payment: updatePayment(id: $id, input: $input)
      @rest(
        type: "ProductPayment"
        path: "/internal/products/product-payments/{args.id}"
        method: "PUT"
      ) {
      ...ProductPayment
    }
  }
  ${ProductPaymentFragmentDoc}
`;
export type UpdatePaymentMutationFn = ApolloReactCommon.MutationFunction<
  UpdatePaymentMutation,
  UpdatePaymentMutationVariables
>;
export type UpdatePaymentComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdatePaymentMutation,
    UpdatePaymentMutationVariables
  >,
  "mutation"
>;

export const UpdatePaymentComponent = (props: UpdatePaymentComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdatePaymentMutation,
    UpdatePaymentMutationVariables
  >
    mutation={UpdatePaymentDocument}
    {...props}
  />
);

/**
 * __useUpdatePaymentMutation__
 *
 * To run a mutation, you first call `useUpdatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePaymentMutation, { data, loading, error }] = useUpdatePaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePaymentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdatePaymentMutation,
    UpdatePaymentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdatePaymentMutation,
    UpdatePaymentMutationVariables
  >(UpdatePaymentDocument, baseOptions);
}
export type UpdatePaymentMutationHookResult = ReturnType<
  typeof useUpdatePaymentMutation
>;
export type UpdatePaymentMutationResult = ApolloReactCommon.MutationResult<
  UpdatePaymentMutation
>;
export type UpdatePaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePaymentMutation,
  UpdatePaymentMutationVariables
>;
