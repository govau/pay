type cssProps =
  | "color"
  | "fontFamily"
  | "fontSize"
  | "fontStyle"
  | "textDecoration"
  | "fontWeight"
  | "paddingLeft"
  | "paddingTop"
  | "paddingRight"
  | "paddingBottom"
  | "padding";

type style = Partial<Record<cssProps, string>> & {
  ":focus"?: style;
  ":hover"?: style;
};

interface FieldStyle {
  base?: style;
  complete?: style;
  error?: style;
  empty?: style;
}

export interface FieldClasses {
  base?: string;
  complete?: string;
  empty?: string;
  focus?: string;
  error?: string;
}

export interface FieldOptions {
  placeholder?: string;
  style?: FieldStyle;
  classes?: FieldClasses;
}

type CardNumberField = "card-number";
type CVVField = "cvv";
type ExpiryField = "expiry";

export type Field = CardNumberField | CVVField | ExpiryField;

export type Brand =
  | "amex"
  | "diners"
  | "discover"
  | "jcb"
  | "mastercard"
  | "visa"
  | "maestro"
  | "unknown";

export interface Element {
  mount: (domID: string) => void;
}

type InputValidationErrorType =
  | "CardNumberInvalid"
  | "CvvNotSet"
  | "ExpiryIsInThePast"
  | "ExpiryIsNotSet";

type TokenResultErrorType =
  | "TokenizationValidationFailed"
  | "TokenizationFailed"
  | "TokenizationNoResponse";

export const isTokenResultError = (
  err?: null | TokenResultError
): err is TokenResultError => {
  if (!err) {
    return false;
  }
  return (err as TokenResultError).field === "token";
};

export class TokenResultError extends Error {
  public readonly field = "token";
  public readonly type: TokenResultErrorType;

  constructor(message: string, type: TokenResultErrorType) {
    super(message);

    this.type = type;
  }
}

export interface TokenResult {
  code?: null | number;
  error?: { message: string; field: string; type: TokenResultErrorType };
  // The following fields are only present if no error.
  token?: string;
  last4?: string;
  expiryMonth?: string;
  expiryYear?: string;
}

interface eventListenerFn {
  // Fired when input loses or gains focus.
  (error: "blur" | "focus", callback: (event: { field: Field }) => void): void;
  // Fired when input switches to or from an empty state.
  (
    error: "empty",
    callback: (event: { field: Field; empty: boolean }) => void
  ): void;
  // Fired when input becomes complete and valid.
  (
    error: "complete",
    callback: (event: { field: Field; complete: boolean }) => void
  ): void;
  // Fired when card brand changes.
  (
    error: "brand",
    callback: (event: { field: CardNumberField; brand: Brand }) => void
  ): void;
  // Fired when input becomes invalid.
  (
    error: "error",
    callback: (event: {
      field: Field;
      type: InputValidationErrorType;
      message: string;
    }) => void
  ): void;
}

export default interface CustomCheckout {
  create: (field: Field, options?: FieldOptions) => Element;
  on: eventListenerFn;
  createOneTimeToken: (
    merchantId: string,
    callback: (result: TokenResult) => void
  ) => void;
}

declare global {
  interface Window {
    customcheckout(): CustomCheckout;
  }

  const customcheckout: typeof window.customcheckout;
}
