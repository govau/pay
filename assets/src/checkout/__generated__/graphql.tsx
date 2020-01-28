import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Admin = {
   __typename?: 'Admin',
  organisations: Array<Organisation>,
  services: Array<Service>,
};

export type BamboraCredentials = {
   __typename?: 'BamboraCredentials',
  accountNumber?: Maybe<Scalars['String']>,
  apiUsername?: Maybe<Scalars['String']>,
  merchantId?: Maybe<Scalars['String']>,
};

export type BamboraCredentialsInput = {
  accountNumber?: Maybe<Scalars['String']>,
  apiPassword?: Maybe<Scalars['String']>,
  apiUsername: Scalars['String'],
  merchantId: Scalars['String'],
};

export type BamboraPaymentInput = {
  expiryMonth: Scalars['String'],
  expiryYear: Scalars['String'],
  last4: Scalars['String'],
  ott: Scalars['String'],
};

export type CardDetails = {
   __typename?: 'CardDetails',
  cardBrand?: Maybe<Scalars['String']>,
  cardNumber?: Maybe<Scalars['String']>,
  cardholderName?: Maybe<Scalars['String']>,
  expiryDate?: Maybe<Scalars['String']>,
  firstDigitsCardNumber?: Maybe<Scalars['String']>,
  lastDigitsCardNumber?: Maybe<Scalars['String']>,
};

export type CardType = {
   __typename?: 'CardType',
  brand: CardTypeBrand,
  id: Scalars['ID'],
  label?: Maybe<Scalars['String']>,
  requires3ds?: Maybe<Scalars['Boolean']>,
  type: CardTypeType,
};

export enum CardTypeBrand {
  AmericanExpress = 'AMERICAN_EXPRESS',
  DinersClub = 'DINERS_CLUB',
  Discover = 'DISCOVER',
  Jcb = 'JCB',
  Maestro = 'MAESTRO',
  MasterCard = 'MASTER_CARD',
  Unionpay = 'UNIONPAY',
  Visa = 'VISA'
}

export enum CardTypeType {
  Credit = 'CREDIT',
  Debit = 'DEBIT'
}

export type CreateProductInput = {
  description?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  price?: Maybe<Scalars['Int']>,
  priceFixed: Scalars['Boolean'],
  referenceEnabled: Scalars['Boolean'],
  referenceHint?: Maybe<Scalars['String']>,
  referenceLabel?: Maybe<Scalars['String']>,
};

export type CreateServiceInput = {
  name: Scalars['String'],
};

export type GatewayAccount = {
   __typename?: 'GatewayAccount',
  allowApplePay?: Maybe<Scalars['Boolean']>,
  allowGooglePay?: Maybe<Scalars['Boolean']>,
  allowZeroAmount?: Maybe<Scalars['Boolean']>,
  cardTypes: Array<CardType>,
  credentials: GatewayAccountCredentials,
  description?: Maybe<Scalars['String']>,
  externalId: Scalars['ID'],
  id: Scalars['ID'],
  integrationVersion3ds?: Maybe<Scalars['Int']>,
  paymentProvider: PaymentProviderLabel,
  payments: Array<Payment>,
  products: Array<Product>,
  requires3ds?: Maybe<Scalars['Boolean']>,
  service: Service,
  serviceName?: Maybe<Scalars['String']>,
  type: GatewayAccountType,
};

export type GatewayAccountCredentials = BamboraCredentials | SandboxCredentials;

export enum GatewayAccountType {
  Live = 'LIVE',
  Test = 'TEST'
}

export type Organisation = {
   __typename?: 'Organisation',
  externalId: Scalars['ID'],
  id: Scalars['ID'],
  name?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export type Payment = {
   __typename?: 'Payment',
  amount: Scalars['Int'],
  cardDetails?: Maybe<CardDetails>,
  description: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  events: Array<TransactionEvent>,
  externalId: Scalars['ID'],
  gatewayAccount: GatewayAccount,
  gatewayTransactionId?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  insertedAt: Scalars['String'],
  reference: Scalars['String'],
  refunds: Array<PaymentRefund>,
  returnUrl: Scalars['String'],
  status: PaymentStatus,
  updatedAt: Scalars['String'],
};

export type PaymentEvent = TransactionEvent & {
   __typename?: 'PaymentEvent',
  externalId: Scalars['ID'],
  id: Scalars['ID'],
  insertedAt: Scalars['String'],
  status: PaymentStatus,
  type: PaymentEventType,
  updatedAt: Scalars['String'],
};

export enum PaymentEventType {
  Payment = 'PAYMENT',
  Refund = 'REFUND'
}

export enum PaymentProviderLabel {
  Bambora = 'BAMBORA',
  Sandbox = 'SANDBOX',
  Stripe = 'STRIPE'
}

export type PaymentRefund = {
   __typename?: 'PaymentRefund',
  amount: Scalars['Int'],
  events?: Maybe<Array<PaymentRefundEvent>>,
  externalId: Scalars['ID'],
  gatewayTransactionId: Scalars['String'],
  id: Scalars['ID'],
  payment?: Maybe<Payment>,
  reference: Scalars['String'],
  status: Scalars['String'],
  user?: Maybe<User>,
};

export type PaymentRefundEvent = TransactionEvent & {
   __typename?: 'PaymentRefundEvent',
  externalId: Scalars['ID'],
  id: Scalars['ID'],
  insertedAt: Scalars['String'],
  refund?: Maybe<PaymentRefund>,
  status: PaymentStatus,
  type: PaymentEventType,
  updatedAt: Scalars['String'],
};

export enum PaymentStatus {
  Cancelled = 'CANCELLED',
  Capturable = 'CAPTURABLE',
  Created = 'CREATED',
  Declined = 'DECLINED',
  Error = 'ERROR',
  Started = 'STARTED',
  Submitted = 'SUBMITTED',
  Success = 'SUCCESS',
  TimedOut = 'TIMED_OUT'
}

export type Product = {
   __typename?: 'Product',
  apiToken: Scalars['String'],
  description?: Maybe<Scalars['String']>,
  externalId: Scalars['ID'],
  gatewayAccount: GatewayAccount,
  id: Scalars['ID'],
  name: Scalars['String'],
  nameSlug: Scalars['String'],
  payments: Array<ProductPayment>,
  price: Scalars['Int'],
  priceFixed: Scalars['Boolean'],
  referenceEnabled: Scalars['Boolean'],
  referenceHint?: Maybe<Scalars['String']>,
  referenceLabel?: Maybe<Scalars['String']>,
  returnUrl?: Maybe<Scalars['String']>,
  serviceNameSlug: Scalars['String'],
};

export type ProductPayment = {
   __typename?: 'ProductPayment',
  amount?: Maybe<Scalars['Int']>,
  externalId: Scalars['ID'],
  gatewayAccount: GatewayAccount,
  id: Scalars['ID'],
  nextUrl?: Maybe<Scalars['String']>,
  payment?: Maybe<Payment>,
  product: Product,
  reference?: Maybe<Scalars['String']>,
  status: ProductPaymentStatus,
};

export enum ProductPaymentStatus {
  Created = 'CREATED',
  Error = 'ERROR',
  Submitted = 'SUBMITTED'
}

export type Role = {
   __typename?: 'Role',
  description: Scalars['String'],
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type RootMutationType = {
   __typename?: 'RootMutationType',
  /** Create a product */
  createProduct: Product,
  /** instantiate a product payment */
  createProductPayment: ProductPayment,
  /** Create a service */
  createService: Service,
  signout: Signout,
  submitBamboraPayment: Payment,
  submitProductPayment: ProductPayment,
  /** Submit a payment refund */
  submitRefund: PaymentRefund,
  submitSandboxPayment: Payment,
  /** Update a gateway account card types */
  updateGatewayAccountCardTypes: GatewayAccount,
  updateGatewayAccountCredentials: GatewayAccount,
  updateProductPayment: ProductPayment,
  /** Submit the details of an existing service */
  updateService: Service,
};


export type RootMutationTypeCreateProductArgs = {
  gatewayAccountId: Scalars['ID'],
  product: CreateProductInput
};


export type RootMutationTypeCreateProductPaymentArgs = {
  nameSlug: Scalars['String'],
  serviceNameSlug: Scalars['String']
};


export type RootMutationTypeCreateServiceArgs = {
  service: CreateServiceInput
};


export type RootMutationTypeSubmitBamboraPaymentArgs = {
  paymentId: Scalars['ID'],
  paymentInput: BamboraPaymentInput,
  transition: Scalars['String']
};


export type RootMutationTypeSubmitProductPaymentArgs = {
  id: Scalars['ID']
};


export type RootMutationTypeSubmitRefundArgs = {
  amount: Scalars['Int'],
  paymentId: Scalars['ID'],
  reference?: Maybe<Scalars['String']>
};


export type RootMutationTypeSubmitSandboxPaymentArgs = {
  paymentId: Scalars['ID'],
  paymentInput: SandboxPaymentInput,
  transition: Scalars['String']
};


export type RootMutationTypeUpdateGatewayAccountCardTypesArgs = {
  cardTypeIds?: Maybe<Array<Scalars['ID']>>,
  gatewayAccountId: Scalars['ID']
};


export type RootMutationTypeUpdateGatewayAccountCredentialsArgs = {
  credentials: BamboraCredentialsInput,
  gatewayAccountId: Scalars['ID']
};


export type RootMutationTypeUpdateProductPaymentArgs = {
  id: Scalars['ID'],
  productPayment: UpdateProductPaymentInput
};


export type RootMutationTypeUpdateServiceArgs = {
  id: Scalars['ID'],
  service: UpdateServiceInput
};

export type RootQueryType = {
   __typename?: 'RootQueryType',
  /** Access all resources based on admin rights */
  admin: Admin,
  cardTypes: Array<CardType>,
  gatewayAccount: GatewayAccount,
  /** Get the currently authenticated user */
  me?: Maybe<User>,
  organisations: Array<Organisation>,
  payment: Payment,
  productPayment: ProductPayment,
  /** Services that the active user can access */
  service: Service,
  /** Services that the active user can access */
  services: Array<Service>,
  /** List all available users */
  users: Array<User>,
};


export type RootQueryTypeGatewayAccountArgs = {
  id: Scalars['ID']
};


export type RootQueryTypePaymentArgs = {
  id: Scalars['ID']
};


export type RootQueryTypeProductPaymentArgs = {
  id: Scalars['ID']
};


export type RootQueryTypeServiceArgs = {
  id: Scalars['ID']
};

export type SandboxCredentials = {
   __typename?: 'SandboxCredentials',
  dummy?: Maybe<Scalars['String']>,
};

export type SandboxPaymentInput = {
  expiryMonth: Scalars['String'],
  expiryYear: Scalars['String'],
  last4: Scalars['String'],
};

export type Service = {
   __typename?: 'Service',
  currentGoLiveStage: ServiceGoLiveStage,
  externalId: Scalars['ID'],
  gatewayAccount: GatewayAccount,
  gatewayAccounts: Array<GatewayAccount>,
  id: Scalars['ID'],
  merchantAddressCity?: Maybe<Scalars['String']>,
  merchantAddressCountry?: Maybe<Scalars['String']>,
  merchantAddressLine1?: Maybe<Scalars['String']>,
  merchantAddressLine2?: Maybe<Scalars['String']>,
  merchantAddressPostcode?: Maybe<Scalars['String']>,
  merchantEmail?: Maybe<Scalars['String']>,
  merchantName?: Maybe<Scalars['String']>,
  merchantTelephoneNumber?: Maybe<Scalars['String']>,
  name: Scalars['String'],
  organisation?: Maybe<Organisation>,
  users: Array<ServiceUser>,
};


export type ServiceGatewayAccountArgs = {
  id: Scalars['ID']
};

export enum ServiceGoLiveStage {
  Live = 'LIVE',
  NotStarted = 'NOT_STARTED'
}

export type ServiceUser = {
   __typename?: 'ServiceUser',
  email: Scalars['String'],
  externalId: Scalars['ID'],
  id: Scalars['ID'],
  insertedAt: Scalars['String'],
  name: Scalars['String'],
  platformAdmin?: Maybe<Scalars['Boolean']>,
  role: Role,
  telephoneNumber?: Maybe<Scalars['String']>,
  updatedAt: Scalars['String'],
};

export type Signout = {
   __typename?: 'Signout',
  signedOut: Scalars['Boolean'],
};

export type TransactionEvent = {
  externalId: Scalars['ID'],
  id: Scalars['ID'],
  insertedAt: Scalars['String'],
  status: PaymentStatus,
  type: PaymentEventType,
  updatedAt: Scalars['String'],
};

export type UpdateProductPaymentInput = {
  amount?: Maybe<Scalars['Int']>,
  reference: Scalars['String'],
};

export type UpdateServiceInput = {
  name: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  externalId: Scalars['ID'],
  id: Scalars['ID'],
  insertedAt: Scalars['String'],
  name: Scalars['String'],
  platformAdmin?: Maybe<Scalars['Boolean']>,
  telephoneNumber?: Maybe<Scalars['String']>,
  updatedAt: Scalars['String'],
};

export type GatewayAccountFragment = (
  { __typename?: 'GatewayAccount' }
  & Pick<GatewayAccount, 'id' | 'externalId' | 'type' | 'paymentProvider' | 'serviceName'>
  & { credentials: (
    { __typename?: 'BamboraCredentials' }
    & Pick<BamboraCredentials, 'merchantId'>
  ) | { __typename?: 'SandboxCredentials' }, cardTypes: Array<(
    { __typename?: 'CardType' }
    & Pick<CardType, 'id' | 'brand' | 'type'>
  )> }
);

export type PaymentFragment = (
  { __typename?: 'Payment' }
  & Pick<Payment, 'id' | 'externalId' | 'status' | 'amount' | 'reference' | 'description' | 'email'>
  & { gatewayAccount: (
    { __typename?: 'GatewayAccount' }
    & GatewayAccountFragment
  ) }
);

export type SubmitSandboxPaymentMutationVariables = {
  paymentId: Scalars['ID'],
  transition: Scalars['String'],
  input: SandboxPaymentInput
};


export type SubmitSandboxPaymentMutation = (
  { __typename?: 'RootMutationType' }
  & { payment: (
    { __typename?: 'Payment' }
    & PaymentFragment
  ) }
);

export type SubmitBamboraPaymentMutationVariables = {
  paymentId: Scalars['ID'],
  transition: Scalars['String'],
  input: BamboraPaymentInput
};


export type SubmitBamboraPaymentMutation = (
  { __typename?: 'RootMutationType' }
  & { payment: (
    { __typename?: 'Payment' }
    & PaymentFragment
  ) }
);

export type GetPaymentQueryVariables = {
  id: Scalars['ID']
};


export type GetPaymentQuery = (
  { __typename?: 'RootQueryType' }
  & { payment: (
    { __typename?: 'Payment' }
    & { gatewayAccount: (
      { __typename?: 'GatewayAccount' }
      & GatewayAccountFragment
    ) }
    & PaymentFragment
  ) }
);

export const GatewayAccountFragmentDoc = gql`
    fragment GatewayAccount on GatewayAccount {
  id
  externalId
  type
  paymentProvider
  serviceName
  credentials {
    ... on BamboraCredentials {
      merchantId
    }
  }
  cardTypes {
    id
    brand
    type
  }
}
    `;
export const PaymentFragmentDoc = gql`
    fragment Payment on Payment {
  id
  externalId
  status
  amount
  reference
  description
  email
  gatewayAccount {
    ...GatewayAccount
  }
}
    ${GatewayAccountFragmentDoc}`;
export const SubmitSandboxPaymentDocument = gql`
    mutation SubmitSandboxPayment($paymentId: ID!, $transition: String!, $input: SandboxPaymentInput!) {
  payment: submitSandboxPayment(paymentId: $paymentId, transition: $transition, paymentInput: $input) {
    ...Payment
  }
}
    ${PaymentFragmentDoc}`;
export type SubmitSandboxPaymentMutationFn = ApolloReactCommon.MutationFunction<SubmitSandboxPaymentMutation, SubmitSandboxPaymentMutationVariables>;
export type SubmitSandboxPaymentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SubmitSandboxPaymentMutation, SubmitSandboxPaymentMutationVariables>, 'mutation'>;

    export const SubmitSandboxPaymentComponent = (props: SubmitSandboxPaymentComponentProps) => (
      <ApolloReactComponents.Mutation<SubmitSandboxPaymentMutation, SubmitSandboxPaymentMutationVariables> mutation={SubmitSandboxPaymentDocument} {...props} />
    );
    

/**
 * __useSubmitSandboxPaymentMutation__
 *
 * To run a mutation, you first call `useSubmitSandboxPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitSandboxPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitSandboxPaymentMutation, { data, loading, error }] = useSubmitSandboxPaymentMutation({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *      transition: // value for 'transition'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitSandboxPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SubmitSandboxPaymentMutation, SubmitSandboxPaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<SubmitSandboxPaymentMutation, SubmitSandboxPaymentMutationVariables>(SubmitSandboxPaymentDocument, baseOptions);
      }
export type SubmitSandboxPaymentMutationHookResult = ReturnType<typeof useSubmitSandboxPaymentMutation>;
export type SubmitSandboxPaymentMutationResult = ApolloReactCommon.MutationResult<SubmitSandboxPaymentMutation>;
export type SubmitSandboxPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<SubmitSandboxPaymentMutation, SubmitSandboxPaymentMutationVariables>;
export const SubmitBamboraPaymentDocument = gql`
    mutation SubmitBamboraPayment($paymentId: ID!, $transition: String!, $input: BamboraPaymentInput!) {
  payment: submitBamboraPayment(paymentId: $paymentId, transition: $transition, paymentInput: $input) {
    ...Payment
  }
}
    ${PaymentFragmentDoc}`;
export type SubmitBamboraPaymentMutationFn = ApolloReactCommon.MutationFunction<SubmitBamboraPaymentMutation, SubmitBamboraPaymentMutationVariables>;
export type SubmitBamboraPaymentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SubmitBamboraPaymentMutation, SubmitBamboraPaymentMutationVariables>, 'mutation'>;

    export const SubmitBamboraPaymentComponent = (props: SubmitBamboraPaymentComponentProps) => (
      <ApolloReactComponents.Mutation<SubmitBamboraPaymentMutation, SubmitBamboraPaymentMutationVariables> mutation={SubmitBamboraPaymentDocument} {...props} />
    );
    

/**
 * __useSubmitBamboraPaymentMutation__
 *
 * To run a mutation, you first call `useSubmitBamboraPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitBamboraPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitBamboraPaymentMutation, { data, loading, error }] = useSubmitBamboraPaymentMutation({
 *   variables: {
 *      paymentId: // value for 'paymentId'
 *      transition: // value for 'transition'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitBamboraPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SubmitBamboraPaymentMutation, SubmitBamboraPaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<SubmitBamboraPaymentMutation, SubmitBamboraPaymentMutationVariables>(SubmitBamboraPaymentDocument, baseOptions);
      }
export type SubmitBamboraPaymentMutationHookResult = ReturnType<typeof useSubmitBamboraPaymentMutation>;
export type SubmitBamboraPaymentMutationResult = ApolloReactCommon.MutationResult<SubmitBamboraPaymentMutation>;
export type SubmitBamboraPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<SubmitBamboraPaymentMutation, SubmitBamboraPaymentMutationVariables>;
export const GetPaymentDocument = gql`
    query GetPayment($id: ID!) {
  payment(id: $id) {
    ...Payment
    gatewayAccount {
      ...GatewayAccount
    }
  }
}
    ${PaymentFragmentDoc}
${GatewayAccountFragmentDoc}`;
export type GetPaymentComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetPaymentQuery, GetPaymentQueryVariables>, 'query'> & ({ variables: GetPaymentQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetPaymentComponent = (props: GetPaymentComponentProps) => (
      <ApolloReactComponents.Query<GetPaymentQuery, GetPaymentQueryVariables> query={GetPaymentDocument} {...props} />
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
export function useGetPaymentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPaymentQuery, GetPaymentQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPaymentQuery, GetPaymentQueryVariables>(GetPaymentDocument, baseOptions);
      }
export function useGetPaymentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPaymentQuery, GetPaymentQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPaymentQuery, GetPaymentQueryVariables>(GetPaymentDocument, baseOptions);
        }
export type GetPaymentQueryHookResult = ReturnType<typeof useGetPaymentQuery>;
export type GetPaymentLazyQueryHookResult = ReturnType<typeof useGetPaymentLazyQuery>;
export type GetPaymentQueryResult = ApolloReactCommon.QueryResult<GetPaymentQuery, GetPaymentQueryVariables>;