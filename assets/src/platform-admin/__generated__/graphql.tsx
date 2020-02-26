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
  environment?: Maybe<Scalars["String"]>;
  merchantId?: Maybe<Scalars["String"]>;
};

export type BamboraCredentialsInput = {
  accountNumber?: Maybe<Scalars["String"]>;
  apiPassword?: Maybe<Scalars["String"]>;
  apiUsername: Scalars["String"];
  environment: Scalars["String"];
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
  brand: CardTypeBrand;
  id: Scalars["ID"];
  label?: Maybe<Scalars["String"]>;
  requires3ds?: Maybe<Scalars["Boolean"]>;
  type: CardTypeType;
};

export enum CardTypeBrand {
  AmericanExpress = "AMERICAN_EXPRESS",
  DinersClub = "DINERS_CLUB",
  Discover = "DISCOVER",
  Jcb = "JCB",
  MasterCard = "MASTER_CARD",
  Unionpay = "UNIONPAY",
  Visa = "VISA"
}

export enum CardTypeType {
  Credit = "CREDIT",
  Debit = "DEBIT"
}

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
  acceptInvite: Service;
  createProduct: Product;
  createProductPayment: ProductPayment;
  createService: Service;
  inviteUser: Service;
  signout: Signout;
  submitBamboraPayment: Payment;
  submitProductPayment: ProductPayment;
  submitRefund: PaymentRefund;
  submitSandboxPayment: Payment;
  updateGatewayAccountCardTypes: GatewayAccount;
  updateGatewayAccountCredentials: GatewayAccount;
  updateProductPayment: ProductPayment;
  updateService: Service;
};

export type RootMutationTypeAcceptInviteArgs = {
  serviceId: Scalars["ID"];
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

export type RootMutationTypeInviteUserArgs = {
  email: Scalars["String"];
  role: Scalars["String"];
  serviceId: Scalars["ID"];
};

export type RootMutationTypeSubmitBamboraPaymentArgs = {
  paymentId: Scalars["ID"];
  paymentInput: BamboraPaymentInput;
  transition: Scalars["String"];
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

export type RootMutationTypeUpdateGatewayAccountCardTypesArgs = {
  cardTypeIds?: Maybe<Array<Scalars["ID"]>>;
  gatewayAccountId: Scalars["ID"];
};

export type RootMutationTypeUpdateGatewayAccountCredentialsArgs = {
  credentials: BamboraCredentialsInput;
  gatewayAccountId: Scalars["ID"];
};

export type RootMutationTypeUpdateProductArgs = {
  id: Scalars["ID"];
  product: UpdateProductInput;
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
  admin: Admin;
  cardTypes: Array<CardType>;
  gatewayAccount: GatewayAccount;
  me?: Maybe<User>;
  organisations: Array<Organisation>;
  payment: Payment;
  productPayment: ProductPayment;
  roles: Array<Role>;
  service: Service;
  serviceInvites: Array<ServiceInvite>;
  services: Array<Service>;
  users: Array<User>;
};

export type RootQueryTypeGatewayAccountArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypePaymentArgs = {
  id: Scalars["ID"];
};

export type RootQueryTypeProductArgs = {
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
  invites: Array<ServiceInvite>;
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

export type ServiceInvite = {
  __typename?: "ServiceInvite";
  email: Scalars["String"];
  expiresAt: Scalars["String"];
  id: Scalars["ID"];
  invitedBy: Scalars["String"];
  isExpired: Scalars["Boolean"];
  role: Role;
  serviceId: Scalars["ID"];
  serviceName: Scalars["String"];
};

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

export type UpdateProductInput = {
  description?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  price?: Maybe<Scalars["Int"]>;
  priceFixed: Scalars["Boolean"];
  referenceEnabled: Scalars["Boolean"];
  referenceHint?: Maybe<Scalars["String"]>;
  referenceLabel?: Maybe<Scalars["String"]>;
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

export type OrganisationFragment = { __typename?: "Organisation" } & Pick<
  Organisation,
  "id" | "externalId" | "name"
>;

export type ServiceFragment = { __typename?: "Service" } & Pick<
  Service,
  "id" | "externalId" | "name"
>;

export type OrganisationsQueryVariables = {};

export type OrganisationsQuery = { __typename?: "RootQueryType" } & {
  admin: { __typename?: "Admin" } & {
    organisations: Array<
      { __typename?: "Organisation" } & OrganisationFragment
    >;
  };
};

export type ServicesQueryVariables = {};

export type ServicesQuery = { __typename?: "RootQueryType" } & {
  admin: { __typename?: "Admin" } & {
    services: Array<{ __typename?: "Service" } & ServiceFragment>;
  };
};

export type CardTypesQueryVariables = {};

export type CardTypesQuery = { __typename?: "RootQueryType" } & {
  cardTypes: Array<
    { __typename?: "CardType" } & Pick<
      CardType,
      "id" | "brand" | "label" | "type"
    >
  >;
};

export const OrganisationFragmentDoc = gql`
  fragment Organisation on Organisation {
    id
    externalId
    name
  }
`;
export const ServiceFragmentDoc = gql`
  fragment Service on Service {
    id
    externalId
    name
  }
`;
export const OrganisationsDocument = gql`
  query Organisations {
    admin {
      organisations {
        ...Organisation
      }
    }
  }
  ${OrganisationFragmentDoc}
`;
export type OrganisationsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >,
  "query"
>;

export const OrganisationsComponent = (props: OrganisationsComponentProps) => (
  <ApolloReactComponents.Query<OrganisationsQuery, OrganisationsQueryVariables>
    query={OrganisationsDocument}
    {...props}
  />
);

/**
 * __useOrganisationsQuery__
 *
 * To run a query within a React component, call `useOrganisationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganisationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganisationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOrganisationsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >(OrganisationsDocument, baseOptions);
}
export function useOrganisationsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<
    OrganisationsQuery,
    OrganisationsQueryVariables
  >(OrganisationsDocument, baseOptions);
}
export type OrganisationsQueryHookResult = ReturnType<
  typeof useOrganisationsQuery
>;
export type OrganisationsLazyQueryHookResult = ReturnType<
  typeof useOrganisationsLazyQuery
>;
export type OrganisationsQueryResult = ApolloReactCommon.QueryResult<
  OrganisationsQuery,
  OrganisationsQueryVariables
>;
export const ServicesDocument = gql`
  query Services {
    admin {
      services {
        ...Service
      }
    }
  }
  ${ServiceFragmentDoc}
`;
export type ServicesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    ServicesQuery,
    ServicesQueryVariables
  >,
  "query"
>;

export const ServicesComponent = (props: ServicesComponentProps) => (
  <ApolloReactComponents.Query<ServicesQuery, ServicesQueryVariables>
    query={ServicesDocument}
    {...props}
  />
);

/**
 * __useServicesQuery__
 *
 * To run a query within a React component, call `useServicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServicesQuery({
 *   variables: {
 *   },
 * });
 */
export function useServicesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    ServicesQuery,
    ServicesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<ServicesQuery, ServicesQueryVariables>(
    ServicesDocument,
    baseOptions
  );
}
export function useServicesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    ServicesQuery,
    ServicesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<ServicesQuery, ServicesQueryVariables>(
    ServicesDocument,
    baseOptions
  );
}
export type ServicesQueryHookResult = ReturnType<typeof useServicesQuery>;
export type ServicesLazyQueryHookResult = ReturnType<
  typeof useServicesLazyQuery
>;
export type ServicesQueryResult = ApolloReactCommon.QueryResult<
  ServicesQuery,
  ServicesQueryVariables
>;
export const CardTypesDocument = gql`
  query CardTypes {
    cardTypes {
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

/**
 * __useCardTypesQuery__
 *
 * To run a query within a React component, call `useCardTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCardTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCardTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCardTypesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    CardTypesQuery,
    CardTypesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<CardTypesQuery, CardTypesQueryVariables>(
    CardTypesDocument,
    baseOptions
  );
}
export function useCardTypesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    CardTypesQuery,
    CardTypesQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<CardTypesQuery, CardTypesQueryVariables>(
    CardTypesDocument,
    baseOptions
  );
}
export type CardTypesQueryHookResult = ReturnType<typeof useCardTypesQuery>;
export type CardTypesLazyQueryHookResult = ReturnType<
  typeof useCardTypesLazyQuery
>;
export type CardTypesQueryResult = ApolloReactCommon.QueryResult<
  CardTypesQuery,
  CardTypesQueryVariables
>;
