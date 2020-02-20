import { PaymentProviderLabel, PaymentStatus } from "./__generated__/graphql";

export const paymentProviderLabel = (p: PaymentProviderLabel) => {
  switch (p) {
    case PaymentProviderLabel.Bambora:
      return "Bambora";
    case PaymentProviderLabel.Sandbox:
      return "Sandbox";
    case PaymentProviderLabel.Stripe:
      return "Stripe";
    default:
      throw new Error(`Payment provider ${p} is not implemented`);
  }
};

export const paymentStatuses: { [key: string]: [string, PaymentStatus[]] } = {
  inProgress: [
    "In Progress",
    [
      PaymentStatus.Created,
      PaymentStatus.Started,
      PaymentStatus.Submitted,
      PaymentStatus.Capturable
    ]
  ],
  success: ["Success", [PaymentStatus.Success]],
  declined: ["Declined", [PaymentStatus.Declined]],
  timedOut: ["Timed out", [PaymentStatus.TimedOut]],
  cancelled: ["Cancelled", [PaymentStatus.Cancelled]],
  error: ["Error", [PaymentStatus.Error]]
};

export const statusesForSlug = (slug: string): PaymentStatus[] => {
  const [, statuses] = paymentStatuses[slug] || ["Missing", []];
  return statuses;
};

export const paymentStatusLabel = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.Created:
    case PaymentStatus.Started:
    case PaymentStatus.Submitted:
    case PaymentStatus.Capturable:
      return "In progress";
    case PaymentStatus.Success:
      return "Success";
    case PaymentStatus.Declined:
      return "Declined";
    case PaymentStatus.TimedOut:
      return "Timed out";
    case PaymentStatus.Cancelled:
      return "Cancelled";
    case PaymentStatus.Error:
      return "Error";
    default:
      throw new Error(`Payment status ${status} is not implemented`);
  }
};
