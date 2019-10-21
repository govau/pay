export type Maybe<T> = T | null;
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

export type Organisation = {
  __typename?: "Organisation";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type Payment = {
  __typename?: "Payment";
  id: Scalars["ID"];
  inserted_at: Scalars["String"];
  status: PaymentStatus;
  amount: Scalars["Int"];
  reference: Scalars["String"];
  description: Scalars["String"];
  email: Scalars["String"];
  card_details?: Maybe<CardDetails>;
  gateway_account: GatewayAccount;
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

export type ProductPayment = {
  __typename?: "ProductPayment";
  id: Scalars["ID"];
  product: Product;
  reference: Scalars["String"];
  amount: Scalars["Int"];
  status: ProductPaymentStatus;
  next_url: Scalars["String"];
};

export enum ProductPaymentStatus {
  Created = "created",
  Submitted = "submitted",
  Error = "error"
}

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
