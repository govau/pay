defprotocol Pay.Payments.Gateway do
  def submit_payment(t, payment, params)
end

defmodule Pay.Payments.BamboraGateway do
  defstruct client: nil

  @spec from_credentials(map) :: Pay.Payments.BamboraGateway.t()
  def from_credentials(credentials) do
    %__MODULE__{
      client: %Bambora.Client.SOAP{
        username: credentials["username"],
        password: credentials["password"]
      }
    }
  end

  def sandbox do
    %__MODULE__{
      client: %Bambora.Client.Static{response: "OK"}
    }
  end
end

defimpl Pay.Payments.Gateway, for: Pay.Payments.BamboraGateway do
  def submit_payment(
        %Pay.Payments.BamboraGateway{client: client},
        %Pay.Payments.Payment{
          gateway_account: %Pay.Payments.GatewayAccount{
            credentials: %{
              "account_number" => account_number
            }
          }
        } = payment,
        %{"ott" => one_time_token}
      ) do
    Bambora.submit_single_payment(client, %{
      one_time_token: one_time_token,
      account_number: account_number,
      customer_ref: payment.external_id,
      customer_number: payment.reference,
      amount: payment.amount,
      transaction_type: Bambora.Service.SubmitSinglePayment.transaction_type(:purchase)
    })
  end
end
