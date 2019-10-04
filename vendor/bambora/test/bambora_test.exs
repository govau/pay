defmodule BamboraTest do
  use ExUnit.Case
  doctest Bambora

  test "builds a payment request" do
    assert Bambora.Payment.build_body("one-time-token", %{
             customer_number: "cust_number",
             customer_ref: "cust_ref",
             amount: 1500,
             transaction_type: "tx_type",
             account_number: "acct_no"
           }) == [
             {"CustNumber", nil, "cust_number"},
             {"CustRef", nil, "cust_ref"},
             {"Amount", nil, 1500},
             {"TrnType", nil, "tx_type"},
             {"AccountNumber", nil, "acct_no"},
             {"CreditCard", %{"Registered" => "False"}, [{"OneTimeToken", nil, "one-time-token"}]}
           ]
  end

  test "decodes a payment response" do
    response = %{
      SubmitSinglePaymentResponse: %{
        SubmitSinglePaymentResult:
          "<Response><ResponseCode>0</ResponseCode><Timestamp>21-Oct-2019 16:36:21</Timestamp><Receipt>13949236</Receipt><SettlementDate>21-Oct-2019</SettlementDate><DeclinedCode></DeclinedCode><DeclinedMessage></DeclinedMessage></Response>"
      }
    }

    assert Bambora.Payment.decode(response) == %{
             response: %{
               declined_code: "",
               declined_message: "",
               receipt: "13949236",
               response_code: "0",
               settlement_date: "21-Oct-2019",
               timestamp: "21-Oct-2019 16:36:21"
             }
           }
  end
end
