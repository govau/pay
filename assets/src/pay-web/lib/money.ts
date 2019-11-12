import Dinero from "dinero.js";

export const fromCents = (amount: number): Dinero.Dinero =>
  Dinero({ amount, currency: "AUD" });

export const parse = (source: string): Dinero.Dinero | undefined => {
  const amount = Math.round(parseFloat(source) * 100);

  if (isNaN(amount)) {
    return undefined;
  }

  return fromCents(amount);
};
