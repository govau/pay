defmodule Bambora.Service.SubmitSingleRefund do
  @behaviour Bambora.Service

  alias Bambora.{Response, Service}
  alias XmlBuilder, as: X

  @response_codes %{
    "0" => :approved,
    "1" => :not_approved
  }

  @type params :: %{
          amount: integer,
          receipt: String.t()
        }
  @type response :: %{
          response_code: String.t(),
          timestamp: String.t(),
          receipt: String.t(),
          settlement_date: String.t(),
          declined_code: String.t(),
          declined_message: String.t()
        }

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

  def envelope, do: "Refund"
  def operation, do: "SubmitSingleRefund"

  def decode(contents) do
    contents
    |> get_in([:SubmitSingleRefundResponse, :SubmitSingleRefundResult])
    |> Response.decode_response(decoder())
  end

  @spec build_body(params) :: [Service.xml_data()]
  def build_body(%{
        amount: amount,
        receipt: receipt
      }) do
    [
      X.element("Receipt", receipt),
      X.element("Amount", amount)
    ]
  end
end
