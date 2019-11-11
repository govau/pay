defmodule Bambora.SOAPTest do
  use ExUnit.Case
  doctest Bambora

  test "builds a payment request" do
    assert Bambora.Service.SubmitSinglePayment.build_body(%{
             one_time_token: "one-time-token",
             customer_number: "cust_number",
             customer_ref: "cust_ref",
             amount: 1500,
             transaction_type: :purchase,
             account_number: "acct_no"
           }) == [
             {"CustomerStorageNumber", nil, "VAULT1"},
             {"CustNumber", nil, "cust_number"},
             {"CustRef", nil, "cust_ref"},
             {"Amount", nil, 1500},
             {"TrnType", nil, "1"},
             {"AccountNumber", nil, "acct_no"},
             {"CreditCard", %{"Registered" => "False"},
              [
                {"TokeniseAlgorithmID", nil, "2"},
                {"OneTimeToken", nil, "one-time-token"}
              ]}
           ]
  end

  test "decodes a payment response" do
    response = %{
      SubmitSinglePaymentResponse: %{
        SubmitSinglePaymentResult: """
        <Response>
          <ResponseCode>0</ResponseCode>
          <Timestamp>21-Oct-2019 16:36:21</Timestamp>
          <Receipt>13949236</Receipt>
          <SettlementDate>21-Oct-2019</SettlementDate>
          <DeclinedCode></DeclinedCode>
          <DeclinedMessage></DeclinedMessage>
          <CreditCardToken>9762517381658055</CreditCardToken>
          <TruncatedCard>424242******4242</TruncatedCard>
          <ExpM>10</ExpM>
          <ExpY>2025</ExpY>
          <CardType>Visa</CardType>
          <RetryIndicator>N</RetryIndicator>
        </Response>
        """
      }
    }

    assert Bambora.Service.SubmitSinglePayment.decode(response) == %{
             response: %{
               declined_code: "",
               declined_message: "",
               receipt: "13949236",
               response_code: "0",
               settlement_date: "21-Oct-2019",
               timestamp: "21-Oct-2019 16:36:21",
               amount: "",
               surcharge_amount: "",
               card_type: "Visa",
               credit_card_token: "9762517381658055",
               exp_m: "10",
               exp_y: "2025",
               retry_indicator: "N",
               truncated_card: "424242******4242"
             }
           }
  end

  test "end to end smoke test" do
    response = Bambora.query_todays_payments(%Bambora.Client.Static{response: "OK"})

    assert response ==
             {:ok,
              %{
                request:
                  {:cdata,
                   "<QueryTransaction><Criteria><TrnStartTimestamp>2019-09-09 00:00:00</TrnStartTimestamp><TrnEndTimestamp>2019-10-24 00:00:00</TrnEndTimestamp></Criteria><AdditionalData><Core>Amount</Core><Core>CustRef</Core><Core>CustNumber</Core><Core>TrnTypeID</Core><Core>TrnStatusID</Core></AdditionalData><Security><UserName>static_username</UserName><Password>static_password</Password></Security></QueryTransaction>"},
                response: "OK"
              }}
  end
end
