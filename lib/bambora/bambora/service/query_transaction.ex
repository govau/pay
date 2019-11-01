defmodule Bambora.Service.QueryTransaction do
  @behaviour Bambora.Service

  alias Bambora.{Service, Response}
  alias XmlBuilder, as: X

  @type params :: %{
          start: String.t(),
          end: String.t()
        }

  def decoder do
    {:query_response,
     %{
       response: [
         :response_code,
         :timestamp,
         :receipt,
         :settlement_date,
         :declined_code,
         :declined_message,
         :amount,
         :cust_number,
         :trn_statusID,
         :trn_typeID
       ]
     }}
  end

  def envelope, do: "QueryTransaction"
  def operation, do: "QueryTransaction"

  def decode(contents) do
    contents
    |> get_in([:QueryTransactionResponse, :QueryTransactionResult])
    |> Response.decode_response(decoder())
  end

  @spec build_body(params) :: [Service.xml_data()]
  def build_body(%{start: start_time, end: end_time}) do
    [
      X.element("Criteria", [
        X.element("TrnStartTimestamp", start_time),
        X.element("TrnEndTimestamp", end_time)
        # X.element("CustNumber", "your_custnumber"),
        # X.element("CustRef", "your_custref"),
      ]),
      X.element("AdditionalData", [
        X.element("Core", "Amount"),
        X.element("Core", "CustRef"),
        X.element("Core", "CustNumber"),
        X.element("Core", "TrnTypeID"),
        X.element("Core", "TrnStatusID")
      ])
    ]
  end
end
