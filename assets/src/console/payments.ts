import { PaymentStatus } from "./__generated__/graphql";

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
