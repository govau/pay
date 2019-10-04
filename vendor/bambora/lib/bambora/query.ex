defmodule Bambora.Query do
  alias Bambora.Client
  alias Bambora.Client.{Request, Response}
  alias XmlBuilder, as: X

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

  def decode(contents) do
    contents
    |> get_in([:QueryTransactionResponse, :QueryTransactionResult])
    |> Response.decode_response(decoder())
  end

  def query_transaction({start_time, end_time}, _options \\ []) do
    Request.prepare(
      "QueryTransaction",
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
    )
    |> Client.make_request("QueryTransaction")
    |> decode
  end
end
