defmodule Pay.Payments.Gateway.Sandbox do
  defstruct gateway_account: nil

  alias Pay.Payments

  @spec from_gateway_account(%Payments.GatewayAccount{}) :: %__MODULE__{}
  def from_gateway_account(gateway_account) do
    %__MODULE__{gateway_account: gateway_account}
  end
end

defimpl Pay.Payments.Gateway, for: Pay.Payments.Gateway.Sandbox do
  alias Pay.Payments.Gateway

  @spec submit_payment(
          %Gateway.Sandbox{},
          %Pay.Payments.Payment{},
          map
        ) :: {:ok, %Gateway.SubmitPaymentResponse{}} | {:error, String.t()}
  def submit_payment(_sandbox, payment, _params) do
    {:ok, %Gateway.SubmitPaymentResponse{reference: "ref:#{payment.external_id}"}}
  end

  def refund_payment(_sandbox, payment, %{amount: _amount}) do
    {:ok, %Gateway.RefundPaymentResponse{reference: "ref:#{payment.external_id}"}}
  end
end
