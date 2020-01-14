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

export type Admin = {
  __typename?: "Admin";
  organisations: Array<Organisation>;
  services: Array<Service>;
};

export type BamboraCredentials = {
  __typename?: "BamboraCredentials";
  accountNumber?: Maybe<Scalars["String"]>;
  apiUsername?: Maybe<Scalars["String"]>;
  merchantId?: Maybe<Scalars["String"]>;
};

export type BamboraCredentialsInput = {
  accountNumber?: Maybe<Scalars["String"]>;
  apiPassword?: Maybe<Scalars["String"]>;
  apiUsername: Scalars["String"];
  merchantId: Scalars["String"];
};

export type BamboraPaymentInput = {
  expiryMonth: Scalars["String"];
  expiryYear: Scalars["String"];
  last4: Scalars["String"];
  ott: Scalars["String"];
};

export type CardDetails = {
  __typename?: "CardDetails";
  cardBrand?: Maybe<Scalars["String"]>;
  cardNumber?: Maybe<Scalars["String"]>;
  cardholderName?: Maybe<Scalars["String"]>;
  expiryDate?: Maybe<Scalars["String"]>;
  firstDigitsCardNumber?: Maybe<Scalars["String"]>;
  lastDigitsCardNumber?: Maybe<Scalars["String"]>;
};

export type CardType = {
  __typename?: "CardType";
  brand?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  label?: Maybe<Scalars["String"]>;
  requires3ds?: Maybe<Scalars["Boolean"]>;
  type?: Maybe<Scalars["String"]>;
};

export type CreateProductInput = {
  description?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  price?: Maybe<Scalars["Int"]>;
  priceFixed: Scalars["Boolean"];
  referenceEnabled: Scalars["Boolean"];
  referenceHint?: Maybe<Scalars["String"]>;
  referenceLabel?: Maybe<Scalars["String"]>;
};

export type CreateServiceInput = {
  name: Scalars["String"];
};

export type GatewayAccount = {
  __typename?: "GatewayAccount";
  allowApplePay?: Maybe<Scalars["Boolean"]>;
  allowGooglePay?: Maybe<Scalars["Boolean"]>;
  allowZeroAmount?: Maybe<Scalars["Boolean"]>;
  cardTypes: Array<CardType>;
  credentials: GatewayAccountCredentials;
  description?: Maybe<Scalars["String"]>;
  externalId: Scalars["ID"];
  id: Scalars["ID"];
  integrationVersion3ds?: Maybe<Scalars["Int"]>;
  paymentProvider: PaymentProviderLabel;
  payments: Array<Payment>;
  products: Array<Product>;
  requires3ds?: Maybe<Scalars["Boolean"]>;
  service: Service;
  serviceName?: Maybe<Scalars["String"]>;
  type: GatewayAccountType;
};

export type GatewayAccountCredentials = BamboraCredentials | SandboxCredentials;

export enum GatewayAccountType {
  Live = "LIVE",
  Test = "TEST"
}

export type Organisation = {
  __typename?: "Organisation";
  externalId: Scalars["ID"];
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Payment = {
  __typename?: "Payment";
  amount: Scalars["Int"];
  cardDetails?: Maybe<CardDetails>;
  description: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  events: Array<TransactionEvent>;
  externalId: Scalars["ID"];
  gatewayAccount: GatewayAccount;
  gatewayTransactionId?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  insertedAt: Scalars["String"];
  reference: Scalars["String"];
  refunds: Array<PaymentRefund>;
  returnUrl: Scalars["String"];
  status: PaymentStatus;
  updatedAt: Scalars["String"];
};

export type PaymentEvent = TransactionEvent & {
  __typename?: "PaymentEvent";
  externalId: Scalars["ID"];
  id: Scalars["ID"];
  insertedAt: Scalars["String"];
  status: PaymentStatus;
  type: PaymentEventType;
  updatedAt: Scalars["String"];
};

export enum PaymentEventType {
  Payment = "PAYMENT",
  Refund = "REFUND"
}

export enum PaymentProviderLabel {
  Bambora = "BAMBORA",
  Sandbox = "SANDBOX",
  Stripe = "STRIPE"
}

export type PaymentRefund = {
  __typename?: "PaymentRefund";
  amount: Scalars["Int"];
  events?: Maybe<Array<PaymentRefundEvent>>;
  externalId: Scalars["ID"];
  gatewayTransactionId: Scalars["String"];
  id: Scalars["ID"];
  payment?: Maybe<Payment>;
  reference: Scalars["String"];
  status: Scalars["String"];
  user?: Maybe<User>;
};

export type PaymentRefundEvent = TransactionEvent & {
  __typename?: "PaymentRefundEvent";
  externalId: Scalars["ID"];
  id: Scalars["ID"];
  insertedAt: Scalars["String"];
  refund?: Maybe<PaymentRefund>;
  status: PaymentStatus;
  type: PaymentEventType;
  updatedAt: Scalars["String"];
};

export enum PaymentStatus {
  Cancelled = "CANCELLED",
  Capturable = "CAPTURABLE",
  Created = "CREATED",
  Declined = "DECLINED",
  Error = "ERROR",
  Started = "STARTED",
  Submitted = "SUBMITTED",
  Success = "SUCCESS",
  TimedOut = "TIMED_OUT"
}

export type Product = {
  __typename?: "Product";
  apiToken: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  externalId: Scalars["ID"];
  gatewayAccount: GatewayAccount;
  id: Scalars["ID"];
  name: Scalars["String"];
  nameSlug: Scalars["String"];
  payments: Array<ProductPayment>;
  price: Scalars["Int"];
  priceFixed: Scalars["Boolean"];
  referenceEnabled: Scalars["Boolean"];
  referenceHint?: Maybe<Scalars["String"]>;
  referenceLabel?: Maybe<Scalars["String"]>;
  returnUrl?: Maybe<Scalars["String"]>;
  serviceNameSlug: Scalars["String"];
};

export type ProductPayment = {
  __typename?: "ProductPayment";
  amount?: Maybe<Scalars["Int"]>;
  externalId: Scalars["ID"];
  gatewayAccount: GatewayAccount;
  id: Scalars["ID"];
  nextUrl?: Maybe<Scalars["String"]>;
  payment?: Maybe<Payment>;
  product: Product;
  reference?: Maybe<Scalars["String"]>;
  status: ProductPaymentStatus;
};

export enum ProductPaymentStatus {
  Created = "CREATED",
  Error = "ERROR",
  Submitted = "SUBMITTED"
}

export type Role = {
  __typename?: "Role";
  description: Scalars["String"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type RootMutationType = {
  __typename?: "RootMutationType";
  /** Create a product */
  createProduct: Product;
  /** instantiate a product payment */
  createProductPayment: ProductPayment;
  /** Create a service */
  createService: Service;
  signout: Signout;
  submitBamboraPayment: Payment;
  /** Submit Card types */
  submitCardType: GatewayAccount;
  submitProductPayment: ProductPayment;
  /** Submit a payment refund */
  submitRefund: PaymentRefund;
  submitSandboxPayment: Payment;
  updateGatewayAccountCredentials: GatewayAccount;
  updateProductPayment: ProductPayment;
  /** Submit the details of an existing service */
  updateService: Service;
};

export type RootMutationTypeCreateProductArgs = {
  gatewayAccountId: Scalars["ID"];
  product: CreateProductInput;
};

export type RootMutationTypeCreateProductPaymentArgs = {
  nameSlug: Scalars["String"];
  serviceNameSlug: Scalars["String"];
};

export type RootMutationTypeCreateServiceArgs = {
  service: CreateServiceInput;
};

export type RootMutationTypeSubmitBamboraPaymentArgs = {
  paymentId: Scalars["ID"];
  paymentInput: BamboraPaymentInput;
  transition: Scalars["String"];
};

export type RootMutationTypeSubmitCardTypeArgs = {
  cardTypeIds?: Maybe<Array<Scalars["ID"]>>;
  gatewayAccountId: Scalars["ID"];
};

export type RootMutationTypeSubmitProductPaymentArgs = {
  id: Scalars["ID"];
};

export type RootMutationTypeSubmitRefundArgs = {
  amount: Scalars["Int"];
  paymentId: Scalars["ID"];
  reference?: Maybe<Scalars["String"]>;
};

export type RootMutationTypeSubmitSandboxPaymentArgs = {
  paymentId: Scalars["ID"];
  paymentInput: SandboxPaymentInput;
  transition: Scalars["String"];
};

export type RootMutationTypeUpdateGatewayAccountCredentialsArgs = {
  credentials: BamboraCredentialsInput;
  gatewayAccountId: Scalars["ID"];
};

export type RootMutationTypeUpdateProductPaymentArgs = {
  id: Scalars["ID"];
  productPayment: UpdateProductPaymentInput;
};

export type RootMutationTypeUpdateServiceArgs = {
  id: Scalars["ID"];
  service: UpdateServiceInput;
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  /** Access all resources based on admin rights */
  admin: Admin;
  cardTypes: Array<CardType>;
  gatewayAccount: GatewayAccount;
  /** Get the currently authenticated user */
  me?: Maybe<User>;
  organisations: Array<Organisation>;
  payment: Payment;
  productPayment: ProductPayment;
  /** Services that the active user can access */
  service: Service;
  /** Services that the active user can access */
  services: Array<Service>;
  /** List all available users */
  users: Array<User>;
};

export type RootQueryTypeGatewayAccountArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypePaymentArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypeProductPaymentArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypeServiceArgs = {
  id: Scalars["ID"];
};

export type SandboxCredentials = {
  __typename?: "SandboxCredentials";
  dummy?: Maybe<Scalars["String"]>;
};

export type SandboxPaymentInput = {
  expiryMonth: Scalars["String"];
  expiryYear: Scalars["String"];
  last4: Scalars["String"];
};

export type Service = {
  __typename?: "Service";
  currentGoLiveStage: ServiceGoLiveStage;
  externalId: Scalars["ID"];
  gatewayAccount: GatewayAccount;
  gatewayAccounts: Array<GatewayAccount>;
  id: Scalars["ID"];
  merchantAddressCity?: Maybe<Scalars["String"]>;
  merchantAddressCountry?: Maybe<Scalars["String"]>;
  merchantAddressLine1?: Maybe<Scalars["String"]>;
  merchantAddressLine2?: Maybe<Scalars["String"]>;
  merchantAddressPostcode?: Maybe<Scalars["String"]>;
  merchantEmail?: Maybe<Scalars["String"]>;
  merchantName?: Maybe<Scalars["String"]>;
  merchantTelephoneNumber?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  organisation?: Maybe<Organisation>;
  users: Array<ServiceUser>;
};

export type ServiceGatewayAccountArgs = {
  id: Scalars["ID"];
};

export enum ServiceGoLiveStage {
  Live = "LIVE",
  NotStarted = "NOT_STARTED"
}

export type ServiceUser = {
  __typename?: "ServiceUser";
  email: Scalars["String"];
  externalId: Scalars["ID"];
  id: Scalars["ID"];
  insertedAt: Scalars["String"];
  name: Scalars["String"];
  platformAdmin?: Maybe<Scalars["Boolean"]>;
  role: Role;
  telephoneNumber?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["String"];
};

export type Signout = {
  __typename?: "Signout";
  signedOut: Scalars["Boolean"];
};

export type TransactionEvent = {
  externalId: Scalars["ID"];
  id: Scalars["ID"];
  insertedAt: Scalars["String"];
  status: PaymentStatus;
  type: PaymentEventType;
  updatedAt: Scalars["String"];
};

export type UpdateProductPaymentInput = {
  amount?: Maybe<Scalars["Int"]>;
  reference: Scalars["String"];
};

export type UpdateServiceInput = {
  name: Scalars["String"];
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  externalId: Scalars["ID"];
  id: Scalars["ID"];
  insertedAt: Scalars["String"];
  name: Scalars["String"];
  platformAdmin?: Maybe<Scalars["Boolean"]>;
  telephoneNumber?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["String"];
};

export type ServiceFragment = { __typename?: "Service" } & Pick<
  Service,
  "id" | "externalId" | "name" | "currentGoLiveStage"
>;

export type GatewayAccountFragment = { __typename?: "GatewayAccount" } & Pick<
  GatewayAccount,
  "id" | "externalId" | "type" | "paymentProvider"
> & {
    credentials:
      | ({ __typename?: "BamboraCredentials" } & Pick<
          BamboraCredentials,
          "merchantId" | "accountNumber" | "apiUsername"
        >)
      | { __typename?: "SandboxCredentials" };
    cardTypes: Array<
      { __typename?: "CardType" } & Pick<CardType, "id" | "label">
    >;
  };

type GatewayAccountCredentials_BamboraCredentials_Fragment = {
  __typename?: "BamboraCredentials";
} & Pick<BamboraCredentials, "merchantId" | "accountNumber" | "apiUsername">;

type GatewayAccountCredentials_SandboxCredentials_Fragment = {
  __typename?: "SandboxCredentials";
};

export type GatewayAccountCredentialsFragment =
  | GatewayAccountCredentials_BamboraCredentials_Fragment
  | GatewayAccountCredentials_SandboxCredentials_Fragment;

export type ProductFragment = { __typename?: "Product" } & Pick<
  Product,
  "id" | "externalId" | "name" | "nameSlug" | "serviceNameSlug" | "description"
>;

export type PaymentFragment = { __typename?: "Payment" } & Pick<
  Payment,
  | "id"
  | "externalId"
  | "insertedAt"
  | "updatedAt"
  | "status"
  | "amount"
  | "reference"
  | "description"
  | "email"
  | "gatewayTransactionId"
> & {
    cardDetails: Maybe<
      { __typename?: "CardDetails" } & Pick<
        CardDetails,
        | "cardholderName"
        | "cardNumber"
        | "lastDigitsCardNumber"
        | "firstDigitsCardNumber"
        | "expiryDate"
        | "cardBrand"
      >
    >;
  };

type PaymentEvent_PaymentRefundEvent_Fragment = {
  __typename?: "PaymentRefundEvent";
} & Pick<
  PaymentRefundEvent,
  "id" | "type" | "status" | "insertedAt" | "updatedAt"
>;

type PaymentEvent_PaymentEvent_Fragment = {
  __typename?: "PaymentEvent";
} & Pick<PaymentEvent, "id" | "type" | "status" | "insertedAt" | "updatedAt">;

export type PaymentEventFragment =
  | PaymentEvent_PaymentRefundEvent_Fragment
  | PaymentEvent_PaymentEvent_Fragment;

export type PaymentRefundFragment = { __typename?: "PaymentRefund" } & Pick<
  PaymentRefund,
  "id" | "reference" | "amount" | "status" | "gatewayTransactionId"
>;

export type GetUserServicesQueryVariables = {};

export type GetUserServicesQuery = { __typename?: "RootQueryType" } & {
  services: Array<{ __typename?: "Service" } & ServiceFragment>;
};

export type GetServiceQueryVariables = {
  id: Scalars["ID"];
};

export type GetServiceQuery = { __typename?: "RootQueryType" } & {
  service: { __typename?: "Service" } & ServiceFragment;
};

export type GetServiceWithUsersQueryVariables = {
  id: Scalars["ID"];
};

export type GetServiceWithUsersQuery = { __typename?: "RootQueryType" } & {
  service: { __typename?: "Service" } & {
    users: Array<
      { __typename?: "ServiceUser" } & Pick<
        ServiceUser,
        "id" | "externalId" | "insertedAt" | "updatedAt" | "name" | "email"
      > & {
          role: { __typename?: "Role" } & Pick<
            Role,
            "id" | "name" | "description"
          >;
        }
    >;
  } & ServiceFragment;
};

export type GetServiceWithGatewayAccountsQueryVariables = {
  id: Scalars["ID"];
};

export type GetServiceWithGatewayAccountsQuery = {
  __typename?: "RootQueryType";
} & {
  service: { __typename?: "Service" } & {
    gatewayAccounts: Array<
      { __typename?: "GatewayAccount" } & GatewayAccountFragment
    >;
  } & ServiceFragment;
};

export type CreateServiceMutationVariables = {
  input: CreateServiceInput;
};

export type CreateServiceMutation = { __typename?: "RootMutationType" } & {
  service: { __typename?: "Service" } & ServiceFragment;
};

export type UpdateServiceMutationVariables = {
  id: Scalars["ID"];
  input: UpdateServiceInput;
};

export type UpdateServiceMutation = { __typename?: "RootMutationType" } & {
  service: { __typename?: "Service" } & ServiceFragment;
};

export type SubmitRefundMutationVariables = {
  paymentId: Scalars["ID"];
  amount: Scalars["Int"];
  reference?: Maybe<Scalars["String"]>;
};

export type SubmitRefundMutation = { __typename?: "RootMutationType" } & {
  refund: { __typename?: "PaymentRefund" } & PaymentRefundFragment;
};

export type SubmitCardTypeMutationVariables = {
  gatewayAccountId: Scalars["ID"];
  cardTypeIds: Array<Scalars["ID"]>;
};

export type SubmitCardTypeMutation = { __typename?: "RootMutationType" } & {
  cardType: { __typename?: "GatewayAccount" } & Pick<GatewayAccount, "id"> & {
      cardTypes: Array<
        { __typename?: "CardType" } & Pick<CardType, "id" | "label" | "type">
      >;
    };
};

export type GetGatewayAccountsQueryVariables = {
  serviceId: Scalars["ID"];
};

export type GetGatewayAccountsQuery = { __typename?: "RootQueryType" } & {
  service: { __typename?: "Service" } & {
    gatewayAccounts: Array<
      { __typename?: "GatewayAccount" } & GatewayAccountFragment
    >;
  };
};

export type GetGatewayAccountQueryVariables = {
  id: Scalars["ID"];
};

export type GetGatewayAccountQuery = { __typename?: "RootQueryType" } & {
  gatewayAccount: { __typename?: "GatewayAccount" } & GatewayAccountFragment;
};

export type UpdateGatewayAccountCredentialsMutationVariables = {
  gatewayAccountId: Scalars["ID"];
  input: BamboraCredentialsInput;
};

export type UpdateGatewayAccountCredentialsMutation = {
  __typename?: "RootMutationType";
} & {
  gatewayAccount: { __typename?: "GatewayAccount" } & {
    credentials:
      | ({
          __typename?: "BamboraCredentials";
        } & GatewayAccountCredentials_BamboraCredentials_Fragment)
      | ({
          __typename?: "SandboxCredentials";
        } & GatewayAccountCredentials_SandboxCredentials_Fragment);
  };
};

export type GetProductsQueryVariables = {
  serviceID: Scalars["ID"];
};

export type GetProductsQuery = { __typename?: "RootQueryType" } & {
  service: { __typename?: "Service" } & {
    gatewayAccounts: Array<
      { __typename?: "GatewayAccount" } & {
        products: Array<{ __typename?: "Product" } & ProductFragment>;
      }
    >;
  };
};

export type CreateProductMutationVariables = {
  gatewayAccountId: Scalars["ID"];
  input: CreateProductInput;
};

export type CreateProductMutation = { __typename?: "RootMutationType" } & {
  product: { __typename?: "Product" } & ProductFragment;
};

export type GetPaymentsQueryVariables = {
  serviceID: Scalars["ID"];
};

export type GetPaymentsQuery = { __typename?: "RootQueryType" } & {
  service: { __typename?: "Service" } & {
    gatewayAccounts: Array<
      { __typename?: "GatewayAccount" } & {
        payments: Array<{ __typename?: "Payment" } & PaymentFragment>;
      } & GatewayAccountFragment
    >;
  };
};

export type GetPaymentQueryVariables = {
  id: Scalars["ID"];
};

export type GetPaymentQuery = { __typename?: "RootQueryType" } & {
  payment: { __typename?: "Payment" } & PaymentFragment;
};

export type GetPaymentRefundQueryVariables = {
  id: Scalars["ID"];
};

export type GetPaymentRefundQuery = { __typename?: "RootQueryType" } & {
  payment: { __typename?: "Payment" } & {
    refunds: Array<{ __typename?: "PaymentRefund" } & PaymentRefundFragment>;
  } & PaymentFragment;
};

export type GetPaymentEventsQueryVariables = {
  id: Scalars["ID"];
};

export type GetPaymentEventsQuery = { __typename?: "RootQueryType" } & {
  payment: { __typename?: "Payment" } & {
    events: Array<
      | ({
          __typename?: "PaymentRefundEvent";
        } & PaymentEvent_PaymentRefundEvent_Fragment)
      | ({ __typename?: "PaymentEvent" } & PaymentEvent_PaymentEvent_Fragment)
    >;
  } & PaymentFragment;
};

export const ServiceFragmentDoc = gql`
  fragment Service on Service {
    id
    externalId
    name
    currentGoLiveStage
  }
`;
export const GatewayAccountFragmentDoc = gql`
  fragment GatewayAccount on GatewayAccount {
    id
    externalId
    type
    paymentProvider
    credentials {
      ... on BamboraCredentials {
        merchantId
        accountNumber
        apiUsername
      }
    }
    cardTypes {
      id
      label
    }
  }
`;
export const GatewayAccountCredentialsFragmentDoc = gql`
  fragment GatewayAccountCredentials on GatewayAccountCredentials {
    ... on BamboraCredentials {
      merchantId
      accountNumber
      apiUsername
    }
  }
`;
export const ProductFragmentDoc = gql`
  fragment Product on Product {
    id
    externalId
    name
    nameSlug
    serviceNameSlug
    description
  }
`;
export const PaymentFragmentDoc = gql`
  fragment Payment on Payment {
    id
    externalId
    insertedAt
    updatedAt
    status
    amount
    reference
    description
    email
    gatewayTransactionId
    cardDetails {
      cardholderName
      cardNumber
      lastDigitsCardNumber
      firstDigitsCardNumber
      expiryDate
      cardBrand
    }
  }
`;
export const PaymentEventFragmentDoc = gql`
  fragment PaymentEvent on TransactionEvent {
    id
    type
    status
    insertedAt
    updatedAt
  }
`;
export const PaymentRefundFragmentDoc = gql`
  fragment PaymentRefund on PaymentRefund {
    id
    reference
    amount
    status
    gatewayTransactionId
  }
`;
export const GetUserServicesDocument = gql`
  query GetUserServices {
    services {
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
>;

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
    service(id: $id) {
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
    service(id: $id) {
      ...Service
      users {
        id
        externalId
        insertedAt
        updatedAt
        name
        email
        role {
          id
          name
          description
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
    | { skip: boolean }
  );

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
export const GetServiceWithGatewayAccountsDocument = gql`
  query GetServiceWithGatewayAccounts($id: ID!) {
    service(id: $id) {
      ...Service
      gatewayAccounts {
        ...GatewayAccount
      }
    }
  }
  ${ServiceFragmentDoc}
  ${GatewayAccountFragmentDoc}
`;
export type GetServiceWithGatewayAccountsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetServiceWithGatewayAccountsQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetServiceWithGatewayAccountsComponent = (
  props: GetServiceWithGatewayAccountsComponentProps
) => (
  <ApolloReactComponents.Query<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >
    query={GetServiceWithGatewayAccountsDocument}
    {...props}
  />
);

/**
 * __useGetServiceWithGatewayAccountsQuery__
 *
 * To run a query within a React component, call `useGetServiceWithGatewayAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceWithGatewayAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceWithGatewayAccountsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetServiceWithGatewayAccountsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >(GetServiceWithGatewayAccountsDocument, baseOptions);
}
export function useGetServiceWithGatewayAccountsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetServiceWithGatewayAccountsQuery,
    GetServiceWithGatewayAccountsQueryVariables
  >(GetServiceWithGatewayAccountsDocument, baseOptions);
}
export type GetServiceWithGatewayAccountsQueryHookResult = ReturnType<
  typeof useGetServiceWithGatewayAccountsQuery
>;
export type GetServiceWithGatewayAccountsLazyQueryHookResult = ReturnType<
  typeof useGetServiceWithGatewayAccountsLazyQuery
>;
export type GetServiceWithGatewayAccountsQueryResult = ApolloReactCommon.QueryResult<
  GetServiceWithGatewayAccountsQuery,
  GetServiceWithGatewayAccountsQueryVariables
>;
export const CreateServiceDocument = gql`
  mutation CreateService($input: CreateServiceInput!) {
    service: createService(service: $input) {
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
    service: updateService(id: $id, service: $input) {
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
export const SubmitRefundDocument = gql`
  mutation SubmitRefund($paymentId: ID!, $amount: Int!, $reference: String) {
    refund: submitRefund(
      paymentId: $paymentId
      amount: $amount
      reference: $reference
    ) {
      ...PaymentRefund
    }
  }
  ${PaymentRefundFragmentDoc}
`;
export type SubmitRefundMutationFn = ApolloReactCommon.MutationFunction<
  SubmitRefundMutation,
  SubmitRefundMutationVariables
>;
export type SubmitRefundComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SubmitRefundMutation,
    SubmitRefundMutationVariables
  >,
  "mutation"
>;

export const SubmitRefundComponent = (props: SubmitRefundComponentProps) => (
  <ApolloReactComponents.Mutation<
    SubmitRefundMutation,
    SubmitRefundMutationVariables
  >
    mutation={SubmitRefundDocument}
    {...props}
  />
);

/**
 * __useSubmitRefundMutation__
 *
 * To run a mutation, you first call `useSubmitRefundMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitRefundMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitRefundMutation, { data, loading, error }] = useSubmitRefundMutation({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *      amount: // value for 'amount'
 *      reference: // value for 'reference'
 *   },
 * });
 */
export function useSubmitRefundMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SubmitRefundMutation,
    SubmitRefundMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SubmitRefundMutation,
    SubmitRefundMutationVariables
  >(SubmitRefundDocument, baseOptions);
}
export type SubmitRefundMutationHookResult = ReturnType<
  typeof useSubmitRefundMutation
>;
export type SubmitRefundMutationResult = ApolloReactCommon.MutationResult<
  SubmitRefundMutation
>;
export type SubmitRefundMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SubmitRefundMutation,
  SubmitRefundMutationVariables
>;
export const SubmitCardTypeDocument = gql`
  mutation SubmitCardType($gatewayAccountId: ID!, $cardTypeIds: [ID!]!) {
    cardType: submitCardType(
      gatewayAccountId: $gatewayAccountId
      cardTypeIds: $cardTypeIds
    ) {
      id
      cardTypes {
        id
        label
        type
      }
    }
  }
`;
export type SubmitCardTypeMutationFn = ApolloReactCommon.MutationFunction<
  SubmitCardTypeMutation,
  SubmitCardTypeMutationVariables
>;
export type SubmitCardTypeComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SubmitCardTypeMutation,
    SubmitCardTypeMutationVariables
  >,
  "mutation"
>;

export const SubmitCardTypeComponent = (
  props: SubmitCardTypeComponentProps
) => (
  <ApolloReactComponents.Mutation<
    SubmitCardTypeMutation,
    SubmitCardTypeMutationVariables
  >
    mutation={SubmitCardTypeDocument}
    {...props}
  />
);

/**
 * __useSubmitCardTypeMutation__
 *
 * To run a mutation, you first call `useSubmitCardTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitCardTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitCardTypeMutation, { data, loading, error }] = useSubmitCardTypeMutation({
 *   variables: {
 *      gatewayAccountId: // value for 'gatewayAccountId'
 *      cardTypeIds: // value for 'cardTypeIds'
 *   },
 * });
 */
export function useSubmitCardTypeMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SubmitCardTypeMutation,
    SubmitCardTypeMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SubmitCardTypeMutation,
    SubmitCardTypeMutationVariables
  >(SubmitCardTypeDocument, baseOptions);
}
export type SubmitCardTypeMutationHookResult = ReturnType<
  typeof useSubmitCardTypeMutation
>;
export type SubmitCardTypeMutationResult = ApolloReactCommon.MutationResult<
  SubmitCardTypeMutation
>;
export type SubmitCardTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SubmitCardTypeMutation,
  SubmitCardTypeMutationVariables
>;
export const GetGatewayAccountsDocument = gql`
  query GetGatewayAccounts($serviceId: ID!) {
    service(id: $serviceId) {
      gatewayAccounts {
        ...GatewayAccount
      }
    }
  }
  ${GatewayAccountFragmentDoc}
`;
export type GetGatewayAccountsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetGatewayAccountsQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetGatewayAccountsComponent = (
  props: GetGatewayAccountsComponentProps
) => (
  <ApolloReactComponents.Query<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >
    query={GetGatewayAccountsDocument}
    {...props}
  />
);

/**
 * __useGetGatewayAccountsQuery__
 *
 * To run a query within a React component, call `useGetGatewayAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGatewayAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGatewayAccountsQuery({
 *   variables: {
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useGetGatewayAccountsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >(GetGatewayAccountsDocument, baseOptions);
}
export function useGetGatewayAccountsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetGatewayAccountsQuery,
    GetGatewayAccountsQueryVariables
  >(GetGatewayAccountsDocument, baseOptions);
}
export type GetGatewayAccountsQueryHookResult = ReturnType<
  typeof useGetGatewayAccountsQuery
>;
export type GetGatewayAccountsLazyQueryHookResult = ReturnType<
  typeof useGetGatewayAccountsLazyQuery
>;
export type GetGatewayAccountsQueryResult = ApolloReactCommon.QueryResult<
  GetGatewayAccountsQuery,
  GetGatewayAccountsQueryVariables
>;
export const GetGatewayAccountDocument = gql`
  query GetGatewayAccount($id: ID!) {
    gatewayAccount(id: $id) {
      ...GatewayAccount
    }
  }
  ${GatewayAccountFragmentDoc}
`;
export type GetGatewayAccountComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetGatewayAccountQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetGatewayAccountComponent = (
  props: GetGatewayAccountComponentProps
) => (
  <ApolloReactComponents.Query<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >
    query={GetGatewayAccountDocument}
    {...props}
  />
);

/**
 * __useGetGatewayAccountQuery__
 *
 * To run a query within a React component, call `useGetGatewayAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGatewayAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGatewayAccountQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetGatewayAccountQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >(GetGatewayAccountDocument, baseOptions);
}
export function useGetGatewayAccountLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetGatewayAccountQuery,
    GetGatewayAccountQueryVariables
  >(GetGatewayAccountDocument, baseOptions);
}
export type GetGatewayAccountQueryHookResult = ReturnType<
  typeof useGetGatewayAccountQuery
>;
export type GetGatewayAccountLazyQueryHookResult = ReturnType<
  typeof useGetGatewayAccountLazyQuery
>;
export type GetGatewayAccountQueryResult = ApolloReactCommon.QueryResult<
  GetGatewayAccountQuery,
  GetGatewayAccountQueryVariables
>;
export const UpdateGatewayAccountCredentialsDocument = gql`
  mutation UpdateGatewayAccountCredentials(
    $gatewayAccountId: ID!
    $input: BamboraCredentialsInput!
  ) {
    gatewayAccount: updateGatewayAccountCredentials(
      gatewayAccountId: $gatewayAccountId
      credentials: $input
    ) {
      credentials {
        ...GatewayAccountCredentials
      }
    }
  }
  ${GatewayAccountCredentialsFragmentDoc}
`;
export type UpdateGatewayAccountCredentialsMutationFn = ApolloReactCommon.MutationFunction<
  UpdateGatewayAccountCredentialsMutation,
  UpdateGatewayAccountCredentialsMutationVariables
>;
export type UpdateGatewayAccountCredentialsComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateGatewayAccountCredentialsMutation,
    UpdateGatewayAccountCredentialsMutationVariables
  >,
  "mutation"
>;

export const UpdateGatewayAccountCredentialsComponent = (
  props: UpdateGatewayAccountCredentialsComponentProps
) => (
  <ApolloReactComponents.Mutation<
    UpdateGatewayAccountCredentialsMutation,
    UpdateGatewayAccountCredentialsMutationVariables
  >
    mutation={UpdateGatewayAccountCredentialsDocument}
    {...props}
  />
);

/**
 * __useUpdateGatewayAccountCredentialsMutation__
 *
 * To run a mutation, you first call `useUpdateGatewayAccountCredentialsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGatewayAccountCredentialsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGatewayAccountCredentialsMutation, { data, loading, error }] = useUpdateGatewayAccountCredentialsMutation({
 *   variables: {
 *      gatewayAccountId: // value for 'gatewayAccountId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGatewayAccountCredentialsMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateGatewayAccountCredentialsMutation,
    UpdateGatewayAccountCredentialsMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    UpdateGatewayAccountCredentialsMutation,
    UpdateGatewayAccountCredentialsMutationVariables
  >(UpdateGatewayAccountCredentialsDocument, baseOptions);
}
export type UpdateGatewayAccountCredentialsMutationHookResult = ReturnType<
  typeof useUpdateGatewayAccountCredentialsMutation
>;
export type UpdateGatewayAccountCredentialsMutationResult = ApolloReactCommon.MutationResult<
  UpdateGatewayAccountCredentialsMutation
>;
export type UpdateGatewayAccountCredentialsMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateGatewayAccountCredentialsMutation,
  UpdateGatewayAccountCredentialsMutationVariables
>;
export const GetProductsDocument = gql`
  query GetProducts($serviceID: ID!) {
    service(id: $serviceID) {
      gatewayAccounts {
        products {
          ...Product
        }
      }
    }
  }
  ${ProductFragmentDoc}
`;
export type GetProductsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetProductsQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetProductsComponent = (props: GetProductsComponentProps) => (
  <ApolloReactComponents.Query<GetProductsQuery, GetProductsQueryVariables>
    query={GetProductsDocument}
    {...props}
  />
);

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      serviceID: // value for 'serviceID'
 *   },
 * });
 */
export function useGetProductsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetProductsQuery, GetProductsQueryVariables>(
    GetProductsDocument,
    baseOptions
  );
}
export function useGetProductsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetProductsQuery,
    GetProductsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetProductsQuery,
    GetProductsQueryVariables
  >(GetProductsDocument, baseOptions);
}
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<
  typeof useGetProductsLazyQuery
>;
export type GetProductsQueryResult = ApolloReactCommon.QueryResult<
  GetProductsQuery,
  GetProductsQueryVariables
>;
export const CreateProductDocument = gql`
  mutation CreateProduct($gatewayAccountId: ID!, $input: CreateProductInput!) {
    product: createProduct(
      gatewayAccountId: $gatewayAccountId
      product: $input
    ) {
      ...Product
    }
  }
  ${ProductFragmentDoc}
`;
export type CreateProductMutationFn = ApolloReactCommon.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export type CreateProductComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >,
  "mutation"
>;

export const CreateProductComponent = (props: CreateProductComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >
    mutation={CreateProductDocument}
    {...props}
  />
);

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      gatewayAccountId: // value for 'gatewayAccountId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateProductMutation,
    CreateProductMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateProductMutation,
    CreateProductMutationVariables
  >(CreateProductDocument, baseOptions);
}
export type CreateProductMutationHookResult = ReturnType<
  typeof useCreateProductMutation
>;
export type CreateProductMutationResult = ApolloReactCommon.MutationResult<
  CreateProductMutation
>;
export type CreateProductMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>;
export const GetPaymentsDocument = gql`
  query GetPayments($serviceID: ID!) {
    service(id: $serviceID) {
      gatewayAccounts {
        ...GatewayAccount
        payments {
          ...Payment
        }
      }
    }
  }
  ${GatewayAccountFragmentDoc}
  ${PaymentFragmentDoc}
`;
export type GetPaymentsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetPaymentsQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetPaymentsComponent = (props: GetPaymentsComponentProps) => (
  <ApolloReactComponents.Query<GetPaymentsQuery, GetPaymentsQueryVariables>
    query={GetPaymentsDocument}
    {...props}
  />
);

/**
 * __useGetPaymentsQuery__
 *
 * To run a query within a React component, call `useGetPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentsQuery({
 *   variables: {
 *      serviceID: // value for 'serviceID'
 *   },
 * });
 */
export function useGetPaymentsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetPaymentsQuery, GetPaymentsQueryVariables>(
    GetPaymentsDocument,
    baseOptions
  );
}
export function useGetPaymentsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPaymentsQuery,
    GetPaymentsQueryVariables
  >(GetPaymentsDocument, baseOptions);
}
export type GetPaymentsQueryHookResult = ReturnType<typeof useGetPaymentsQuery>;
export type GetPaymentsLazyQueryHookResult = ReturnType<
  typeof useGetPaymentsLazyQuery
>;
export type GetPaymentsQueryResult = ApolloReactCommon.QueryResult<
  GetPaymentsQuery,
  GetPaymentsQueryVariables
>;
export const GetPaymentDocument = gql`
  query GetPayment($id: ID!) {
    payment(id: $id) {
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
export const GetPaymentRefundDocument = gql`
  query GetPaymentRefund($id: ID!) {
    payment(id: $id) {
      ...Payment
      refunds {
        ...PaymentRefund
      }
    }
  }
  ${PaymentFragmentDoc}
  ${PaymentRefundFragmentDoc}
`;
export type GetPaymentRefundComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetPaymentRefundQuery,
    GetPaymentRefundQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetPaymentRefundQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetPaymentRefundComponent = (
  props: GetPaymentRefundComponentProps
) => (
  <ApolloReactComponents.Query<
    GetPaymentRefundQuery,
    GetPaymentRefundQueryVariables
  >
    query={GetPaymentRefundDocument}
    {...props}
  />
);

/**
 * __useGetPaymentRefundQuery__
 *
 * To run a query within a React component, call `useGetPaymentRefundQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentRefundQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentRefundQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPaymentRefundQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPaymentRefundQuery,
    GetPaymentRefundQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetPaymentRefundQuery,
    GetPaymentRefundQueryVariables
  >(GetPaymentRefundDocument, baseOptions);
}
export function useGetPaymentRefundLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentRefundQuery,
    GetPaymentRefundQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPaymentRefundQuery,
    GetPaymentRefundQueryVariables
  >(GetPaymentRefundDocument, baseOptions);
}
export type GetPaymentRefundQueryHookResult = ReturnType<
  typeof useGetPaymentRefundQuery
>;
export type GetPaymentRefundLazyQueryHookResult = ReturnType<
  typeof useGetPaymentRefundLazyQuery
>;
export type GetPaymentRefundQueryResult = ApolloReactCommon.QueryResult<
  GetPaymentRefundQuery,
  GetPaymentRefundQueryVariables
>;
export const GetPaymentEventsDocument = gql`
  query GetPaymentEvents($id: ID!) {
    payment(id: $id) {
      ...Payment
      events {
        ...PaymentEvent
      }
    }
  }
  ${PaymentFragmentDoc}
  ${PaymentEventFragmentDoc}
`;
export type GetPaymentEventsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >,
  "query"
> &
  (
    | { variables: GetPaymentEventsQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetPaymentEventsComponent = (
  props: GetPaymentEventsComponentProps
) => (
  <ApolloReactComponents.Query<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >
    query={GetPaymentEventsDocument}
    {...props}
  />
);

/**
 * __useGetPaymentEventsQuery__
 *
 * To run a query within a React component, call `useGetPaymentEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentEventsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPaymentEventsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >(GetPaymentEventsDocument, baseOptions);
}
export function useGetPaymentEventsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    GetPaymentEventsQuery,
    GetPaymentEventsQueryVariables
  >(GetPaymentEventsDocument, baseOptions);
}
export type GetPaymentEventsQueryHookResult = ReturnType<
  typeof useGetPaymentEventsQuery
>;
export type GetPaymentEventsLazyQueryHookResult = ReturnType<
  typeof useGetPaymentEventsLazyQuery
>;
export type GetPaymentEventsQueryResult = ApolloReactCommon.QueryResult<
  GetPaymentEventsQuery,
  GetPaymentEventsQueryVariables
>;
