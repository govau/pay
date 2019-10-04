defmodule Bambora.Payment do
  alias Bambora.Client
  alias Bambora.Client.{Request, Response}
  alias XmlBuilder, as: X

  @tx_types %{
    purchase: "1",
    auth: "2",
    refund: "5",
    debit: "7",
    credit: "8"
  }

  @spec transaction_type(:purchase | :auth | :refund | :debit | :credit) :: String.t()
  def transaction_type(label), do: @tx_types[label]

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

  def decode(contents) do
    contents
    |> get_in([:SubmitSinglePaymentResponse, :SubmitSinglePaymentResult])
    |> Response.decode_response(decoder())
  end

  def build_body(one_time_token, %{
        customer_number: customer_number,
        customer_ref: customer_ref,
        amount: amount,
        transaction_type: transaction_type,
        account_number: account_number
      }) do
    [
      X.element("CustNumber", customer_number),
      X.element("CustRef", customer_ref),
      X.element("Amount", amount),
      X.element("TrnType", transaction_type),
      X.element("AccountNumber", account_number),
      X.element("CreditCard", %{"Registered" => "False"}, [
        X.element("OneTimeToken", one_time_token)
      ])
    ]
  end

  def submit_single_payment(ott, params) do
    Request.prepare("Transaction", build_body(ott, params))
    |> Client.make_request("SubmitSinglePayment")
    |> decode
  end
end
