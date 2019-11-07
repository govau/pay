defmodule Bambora.Service.SubmitSinglePayment do
  @behaviour Bambora.Service

  alias Bambora.{Response, Service}
  alias XmlBuilder, as: X

  @tx_types %{
    purchase: "1",
    auth: "2",
    refund: "5",
    debit: "7",
    credit: "8"
  }
  @response_codes %{
    "0" => :approved,
    "1" => :not_approved
  }

  @type transaction_t :: :purchase | :auth | :refund | :debit | :credit
  @type params :: %{
          one_time_token: String.t(),
          customer_number: String.t(),
          customer_ref: String.t(),
          amount: integer,
          transaction_type: transaction_t,
          account_number: String.t()
        }
  @type response :: %{
          response_code: String.t(),
          timestamp: String.t(),
          receipt: String.t(),
          settlement_date: String.t(),
          declined_code: String.t(),
          declined_message: String.t()
        }

  @spec transaction_type(transaction_t) :: String.t()
  def transaction_type(label), do: @tx_types[label]

  @spec response_code(String.t()) :: :approved | :not_approved
  def response_code(code), do: @response_codes[code]

  def decoder do
    {
      :response,
      [
        :response_code,
        :timestamp,
        :receipt,
        :settlement_date,
        :declined_code,
        :declined_message
      ]
    }
  end

  def envelope, do: "Transaction"
  def operation, do: "SubmitSinglePayment"

  def decode(contents) do
    contents
    |> get_in([:SubmitSinglePaymentResponse, :SubmitSinglePaymentResult])
    |> Response.decode_response(decoder())
  end

  @spec build_body(params) :: [Service.xml_data()]
  def build_body(%{
        one_time_token: one_time_token,
        customer_number: customer_number,
        customer_ref: customer_ref,
        amount: amount,
        transaction_type: t_type,
        account_number: account_number
      }) do
    [
      X.element("CustNumber", customer_number),
      X.element("CustRef", customer_ref),
      X.element("Amount", amount),
      X.element("TrnType", transaction_type(t_type)),
      X.element("AccountNumber", account_number),
      X.element("CreditCard", %{"Registered" => "False"}, [
        X.element("OneTimeToken", one_time_token)
      ])
    ]
  end
end
