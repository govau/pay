import {
  ValidatorOptions,
  ValidatorResult,
  Validator,
  ValidatorCheck,
  ValidatorValue,
  regexPatterns,
  errorMessages
} from "./config";

function validatorFactory(
  errorMessage: string,
  isValid: ValidatorCheck,
  opts?: ValidatorOptions
): Validator {
  return (value: any): ValidatorResult =>
    isValid(value, opts) ? undefined : errorMessage;
}

function composeValidators(...validators: Validator[]) {
  return (value: any): ValidatorResult =>
    validators.reduce((error: ValidatorResult, validator: Validator) => {
      return error || validator(value);
    }, undefined);
}

const required = (errorMessage: string) =>
  validatorFactory(
    errorMessage || errorMessages.required(),
    (value: ValidatorValue) => value !== undefined && value !== ""
  );

const isNotNull = (errorMessage: string) =>
  validatorFactory(
    errorMessage || errorMessages.isNotNull(),
    (value: ValidatorValue) => value !== null
  );

const isGreaterThan = (errorMessage: string, { min }: { min: number }) =>
  validatorFactory(
    errorMessage || errorMessages.isGreaterThan(min),
    (value: ValidatorValue) => {
      if (value === null) {
        return false;
      }
      value = value.toString();
      return Number(value) > min;
    }
  );

const isMinLength = (errorMessage: string, { min }: { min: number }) =>
  validatorFactory(
    errorMessage || errorMessages.isMinLength(min),
    (value: ValidatorValue) => {
      if (value === null) {
        return false;
      }
      value = value.toString();
      return value.length >= min;
    }
  );

const isEmail = (errorMessage?: string) =>
  validatorFactory(
    errorMessage || errorMessages.isEmail(),
    (value: ValidatorValue) => {
      if (value === null) {
        return false;
      }
      value = value.toString();
      return regexPatterns.email.test(value);
    }
  );

const isLocalMobileNumber = () =>
  validatorFactory(
    "Enter a valid mobile number in the format 04xxxxxxxx",
    (value: ValidatorValue) => {
      if (value === null) {
        return false;
      }
      value = value.toString();
      return regexPatterns.localMobileNumber.test(value);
    }
  );

const isDate = () =>
  validatorFactory(
    "Enter a valid date format DD/MM/YYYY",
    (value: ValidatorValue) => {
      if (value === null) {
        return false;
      }
      value = value.toString();
      return regexPatterns.date.test(value);
    }
  );

export default {
  required,
  isNotNull,
  isMinLength,
  isGreaterThan,
  isEmail,
  isLocalMobileNumber,
  isDate,
  composeValidators
};
