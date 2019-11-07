defmodule Pay.Payments.Gateway.BamboraGateway do
  @type t :: %__MODULE__{client: Bambora.Client.t()}
  defstruct client: nil

  @spec from_credentials(map) :: Pay.Payments.Gateway.BamboraGateway.t()
  def from_credentials(credentials) do
    %__MODULE__{
      client: %Bambora.Client.SOAP{
        username: credentials["username"],
        password: credentials["password"]
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
        %{"ott" => one_time_token}
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
          {:ok, %Pay.Payments.Gateway.SubmitPaymentResponse{reference: response.receipt}}

        :not_approved ->
          {:error, "payment not approved: #{response.declined_message}"}
      end
    end
  end

  def refund_payment(_gateway, _payment, _params) do
    {:error, "refund payment not supported for this gateway"}
  end
end
