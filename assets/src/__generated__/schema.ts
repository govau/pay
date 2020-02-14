export type Maybe<T> = T | null;
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
  /** Accept a pending service invite */
  acceptInvite: Service;
  /** Create a product */
  createProduct: Product;
  /** instantiate a product payment */
  createProductPayment: ProductPayment;
  /** Create a service */
  createService: Service;
  /** Invite a user to your service */
  inviteUser: Service;
  signout: Signout;
  submitBamboraPayment: Payment;
  submitProductPayment: ProductPayment;
  /** Submit a payment refund */
  submitRefund: PaymentRefund;
  submitSandboxPayment: Payment;
  /** Update a gateway account card types */
  updateGatewayAccountCardTypes: GatewayAccount;
  updateGatewayAccountCredentials: GatewayAccount;
  updateProductPayment: ProductPayment;
  /** Submit the details of an existing service */
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
  roles: Array<Role>;
  /** Services that the active user can access */
  service: Service;
  /** Services that the active user can access */
  serviceInvites: Array<ServiceInvite>;
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
