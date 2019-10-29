import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as React from "react";
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

export type CardType = {
  __typename?: "CardType";
  id: Scalars["ID"];
  brand: Scalars["String"];
  label: Scalars["String"];
  type: Scalars["String"];
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
  submitPayment: Payment;
};

export type MutationSubmitPaymentArgs = {
  paymentId: Scalars["ID"];
  input: SubmitPaymentInput;
};

export type Payment = {
  __typename?: "Payment";
  id: Scalars["ID"];
  inserted_at: Scalars["String"];
  updated_at: Scalars["String"];
  status: PaymentStatus;
  amount: Scalars["Int"];
  reference: Scalars["String"];
  description: Scalars["String"];
  email: Scalars["String"];
  card_details?: Maybe<CardDetails>;
  gateway_transaction_id?: Maybe<Scalars["ID"]>;
  gateway_account: GatewayAccount;
};

export type PaymentEvent = {
  __typename?: "PaymentEvent";
  id: Scalars["ID"];
  inserted_at: Scalars["String"];
  updated_at: Scalars["String"];
  type: PaymentEventType;
  status: PaymentStatus;
};

export enum PaymentEventType {
  Payment = "payment",
  Refund = "refund"
}

export type PaymentInput = {
  ott: Scalars["String"];
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
  payment: Payment;
};

export type QueryPaymentArgs = {
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

export type SubmitPaymentInput = {
  transition: Scalars["String"];
  payment: PaymentInput;
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

export type PaymentFragment = { __typename?: "Payment" } & Pick<
  Payment,
  | "id"
  | "inserted_at"
  | "updated_at"
  | "status"
  | "amount"
  | "reference"
  | "description"
  | "email"
  | "gateway_transaction_id"
> & {
    card_details: Maybe<
      { __typename?: "CardDetails" } & Pick<
        CardDetails,
        | "cardholder_name"
        | "last_digits_card_number"
        | "first_digits_card_number"
        | "expiry_date"
        | "card_brand"
      >
    >;
  };

export type SubmitPaymentMutationVariables = {
  paymentId: Scalars["ID"];
  input: SubmitPaymentInput;
};

export type SubmitPaymentMutation = { __typename?: "Mutation" } & {
  payment: { __typename?: "Payment" } & PaymentFragment;
};

export type GetPaymentQueryVariables = {
  id: Scalars["ID"];
};

export type GetPaymentQuery = { __typename?: "Query" } & {
  payment: { __typename?: "Payment" } & PaymentFragment;
};

export const PaymentFragmentDoc = gql`
  fragment Payment on Payment {
    id
    inserted_at
    updated_at
    status
    amount
    reference
    description
    email
    gateway_transaction_id
    card_details {
      cardholder_name
      last_digits_card_number
      first_digits_card_number
      expiry_date
      card_brand
    }
  }
`;
export const SubmitPaymentDocument = gql`
  mutation SubmitPayment($paymentId: ID!, $input: SubmitPaymentInput!) {
    payment: submitPayment(paymentId: $paymentId, input: $input)
      @rest(
        type: "Payment"
        path: "/internal/payments/payments/{args.paymentId}"
        method: "PATCH"
      ) {
      ...Payment
    }
  }
  ${PaymentFragmentDoc}
`;
export type SubmitPaymentMutationFn = ApolloReactCommon.MutationFunction<
  SubmitPaymentMutation,
  SubmitPaymentMutationVariables
>;
export type SubmitPaymentComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SubmitPaymentMutation,
    SubmitPaymentMutationVariables
  >,
  "mutation"
>;

export const SubmitPaymentComponent = (props: SubmitPaymentComponentProps) => (
  <ApolloReactComponents.Mutation<
    SubmitPaymentMutation,
    SubmitPaymentMutationVariables
  >
    mutation={SubmitPaymentDocument}
    {...props}
  />
);

/**
 * __useSubmitPaymentMutation__
 *
 * To run a mutation, you first call `useSubmitPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitPaymentMutation, { data, loading, error }] = useSubmitPaymentMutation({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitPaymentMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SubmitPaymentMutation,
    SubmitPaymentMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SubmitPaymentMutation,
    SubmitPaymentMutationVariables
  >(SubmitPaymentDocument, baseOptions);
}
export type SubmitPaymentMutationHookResult = ReturnType<
  typeof useSubmitPaymentMutation
>;
export type SubmitPaymentMutationResult = ApolloReactCommon.MutationResult<
  SubmitPaymentMutation
>;
export type SubmitPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SubmitPaymentMutation,
  SubmitPaymentMutationVariables
>;
export const GetPaymentDocument = gql`
  query GetPayment($id: ID!) {
    payment(id: $id)
      @rest(type: "Payment", path: "/internal/payments/payments/{args.id}") {
      ...Payment
    }
  }
  ${PaymentFragmentDoc}
`;
export type GetPaymentComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetPaymentQuery,
    GetPaymentQueryVariables
  >,
  "query"
> &
  ({ variables: GetPaymentQueryVariables; skip?: boolean } | { skip: boolean });

export const GetPaymentComponent = (props: GetPaymentComponentProps) => (
  <ApolloReactComponents.Query<GetPaymentQuery, GetPaymentQueryVariables>
    query={GetPaymentDocument}
    {...props}
  />
);

/**
 * __useGetPaymentQuery__
 *
 * To run a query within a React component, call `useGetPaymentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPaymentQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPaymentQuery,
    GetPaymentQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetPaymentQuery, GetPaymentQueryVariables>(
    GetPaymentDocument,
    baseOptions
  );
}
export function useGetPaymentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentQuery,
    GetPaymentQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPaymentQuery,
    GetPaymentQueryVariables
  >(GetPaymentDocument, baseOptions);
}
export type GetPaymentQueryHookResult = ReturnType<typeof useGetPaymentQuery>;
export type GetPaymentLazyQueryHookResult = ReturnType<
  typeof useGetPaymentLazyQuery
>;
export type GetPaymentQueryResult = ApolloReactCommon.QueryResult<
  GetPaymentQuery,
  GetPaymentQueryVariables
>;
