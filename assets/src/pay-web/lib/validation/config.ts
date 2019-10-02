export type ValidatorOptions = {
  [key: string]: string | number;
};
export type ValidatorValue = string | number;
export type ValidatorResult = string | undefined;
export type Validator = (value: ValidatorValue) => ValidatorResult;
export type ValidatorCheck = (
  value: ValidatorValue,
  opts?: ValidatorOptions
) => boolean;

export const regexPatterns = {
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#Basic_validation
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  localMobileNumber: /^04\d{8}$/, // Only support Australian mobile numbers for now
  internationalMobileNumber: /^(\+614)\d{8}$/,
  date: /^((0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/[12]\d{3})$/
};

export const errorMessages: { [key: string]: (opts?: any) => string } = {
  required: () => "Required",
  isEmail: () => "Enter a valid email address",
  isMinLength: ({ min }: { min: number }) =>
    `Must be at least ${min} characters long`
};
