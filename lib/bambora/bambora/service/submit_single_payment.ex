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
  @card_types %{
    "Visa" => :visa,
    "Amex" => :american_express,
    "MasterCard" => :mastercard
  }

  @type card_type_t :: :visa | :american_express | :mastercard
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
          declined_message: String.t(),
          amount: String.t(),
          surcharge_amount: String.t(),
          credit_card_token: String.t(),
          truncated_card: String.t(),
          exp_m: String.t(),
          exp_y: String.t(),
          card_type: String.t(),
          retry_indicator: String.t()
        }

  @spec transaction_type(transaction_t) :: String.t()
  def transaction_type(label), do: @tx_types[label]

  @spec response_code(String.t()) :: :approved | :not_approved
  def response_code(code), do: @response_codes[code]

  @spec card_type(String.t()) :: card_type_t
  def card_type(t), do: @card_types[t]

  def decoder do
    {
      :response,
      [
        :response_code,
        :timestamp,
        :receipt,
        :settlement_date,
        :declined_code,
        :declined_message,

        # payment summary
        :amount,
        :surcharge_amount,

        # card details
        :credit_card_token,
        :truncated_card,
        :exp_m,
        :exp_y,
        :card_type,
        :retry_indicator
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
      X.element("CustomerStorageNumber", "VAULT1"),
      X.element("CustNumber", customer_number),
      X.element("CustRef", customer_ref),
      X.element("Amount", amount),
      X.element("TrnType", transaction_type(t_type)),
      X.element("AccountNumber", account_number),
      X.element("CreditCard", %{"Registered" => "False"}, [
        X.element("TokeniseAlgorithmID", "2"),
        X.element("OneTimeToken", one_time_token)
      ])
    ]
  end
end
