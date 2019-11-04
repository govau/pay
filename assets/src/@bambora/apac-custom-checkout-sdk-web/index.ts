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

export type Field = "card-number" | "cvv" | "expiry";

export interface Element {
  mount: (domID: string) => void;
}

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
  error?: {
    message: string;
    field: string;
    type: TokenResultErrorType;
  };
  // The following fields are only present if no error.
  token?: string;
  last4?: string;
  expiryMonth?: string;
  expiryYear?: string;
}

export default interface CustomCheckout {
  create: (field: Field, options?: FieldOptions) => Element;
  createOneTimeToken: (
    merchantID: string,
    callback: (result: TokenResult) => void
  ) => void;
}

declare global {
  interface Window {
    customcheckout(): CustomCheckout;
  }

  const customcheckout: typeof window.customcheckout;
}
