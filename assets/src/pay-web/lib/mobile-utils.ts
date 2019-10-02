import { regexPatterns } from "./validation/config";

function localToInternational(localNumber: string) {
  if (!regexPatterns.localMobileNumber.test(localNumber)) {
    throw new Error(
      "Supplied number is not a local Australian mobile number in the format 04xxxxxxxx"
    );
  }
  return localNumber.replace(/^0/, "+61");
}

function internationalToLocal(internationalNumber: string) {
  if (!regexPatterns.internationalMobileNumber.test(internationalNumber)) {
    throw new Error(
      "Supplied number is not an Australian mobile number in the international format +614xxxxxxxx"
    );
  }
  return internationalNumber.replace(/^(\+61)/, "0");
}

function format(n: string) {
  if (regexPatterns.localMobileNumber.test(n)) {
    return `${n.substring(0, 4)} ${n.substring(4, 7)} ${n.substring(7)}`;
  } else if (regexPatterns.internationalMobileNumber.test(n)) {
    return `${n.substring(0, 3)} ${n.substring(3, 6)} ${n.substring(
      6,
      9
    )} ${n.substring(9)}`;
  }

  return n;
}

function formatToLocal(n: string) {
  if (regexPatterns.internationalMobileNumber.test(n)) {
    return format(internationalToLocal(n));
  }
  return format(n);
}

export default {
  formatToLocal,
  localToInternational,
  internationalToLocal
};
