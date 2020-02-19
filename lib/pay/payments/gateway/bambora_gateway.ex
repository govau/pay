defmodule Pay.Payments.Gateway.BamboraGateway do
  @type t :: %__MODULE__{client: Bambora.Client.t()}
  defstruct client: nil

  @spec from_credentials(map) :: Pay.Payments.Gateway.BamboraGateway.t()
  def from_credentials(credentials) do
    %__MODULE__{
      client: %Bambora.Client.SOAP{
        username: credentials["api_username"],
        password: credentials["api_password"]
      }
    }
  end

  @spec sandbox :: Pay.Payments.Gateway.BamboraGateway.t()
  def sandbox do
    %__MODULE__{
      client: %Bambora.Client.Static{response: "OK"}
    }
  end
end

defimpl Pay.Payments.Gateway, for: Pay.Payments.Gateway.BamboraGateway do
  @spec submit_payment(
          %Pay.Payments.Gateway.BamboraGateway{},
          %Pay.Payments.Payment{},
          map
        ) :: {:ok, %Pay.Payments.Gateway.SubmitPaymentResponse{}} | {:error, String.t()}
  def submit_payment(
        %Pay.Payments.Gateway.BamboraGateway{client: client},
        %Pay.Payments.Payment{
          gateway_account: %Pay.Payments.GatewayAccount{
            credentials: %{
              "account_number" => account_number
            }
          }
        } = payment,
        %{ott: one_time_token}
      ) do
    payment_response =
      Bambora.submit_single_payment(client, %{
        one_time_token: one_time_token,
        account_number: account_number,
        customer_ref: payment.external_id,
        customer_number: payment.reference,
        amount: payment.amount,
        transaction_type: :purchase
      })

    with {:ok, response} <- payment_response do
      case Bambora.Service.SubmitSinglePayment.response_code(response.response_code) do
        :approved ->
          {:ok,
           %Pay.Payments.Gateway.SubmitPaymentResponse{
             reference: response.receipt,
             card_brand: response.card_type,
             card_number: response.truncated_card,
             card_expiry: "#{response.exp_m}/#{response.exp_y}"
           }}

        :not_approved ->
          {:error, "payment not approved: #{response.declined_message}"}
      end
    end
  end

  @spec refund_payment(
          %Pay.Payments.Gateway.BamboraGateway{},
          %Pay.Payments.Payment{},
          map
        ) :: {:ok, %Pay.Payments.Gateway.RefundPaymentResponse{}} | {:error, String.t()}
  def refund_payment(
        %Pay.Payments.Gateway.BamboraGateway{client: client},
        %Pay.Payments.Payment{gateway_transaction_id: transaction_id} = _payment,
        %{amount: amount}
      ) do
    refund_response =
      Bambora.submit_single_refund(client, %{
        amount: amount,
        receipt: transaction_id
      })

    with {:ok, response} <- refund_response do
      case Bambora.Service.SubmitSingleRefund.response_code(response.response_code) do
        :approved ->
          {:ok, %Pay.Payments.Gateway.RefundPaymentResponse{reference: response.receipt}}

        :not_approved ->
          {:error, "refund not approved: #{response.declined_message}"}
      end
    end
  end
end
