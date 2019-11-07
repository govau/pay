defmodule Pay.Payments.Gateway.SubmitPaymentResponse do
  defstruct [:reference]
end

defmodule Pay.Payments.Gateway.RefundPaymentResponse do
  defstruct [:reference]
end

defprotocol Pay.Payments.Gateway do
  @spec submit_payment(term, %Pay.Payments.Payment{}, map) ::
          {:ok, %Pay.Payments.Gateway.SubmitPaymentResponse{}} | {:error, String.t()}
  def submit_payment(t, payment, params)

  @spec refund_payment(term, %Pay.Payments.Payment{}, %{amount: number}) ::
          {:ok, %Pay.Payments.Gateway.RefundPaymentResponse{}} | {:error, String.t()}
  def refund_payment(t, payment, params)
end
