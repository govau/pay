defmodule Bambora do
  @moduledoc """
  Documentation for Bambora interface.
  """

  def submit_single_payment(token, options) do
    Bambora.Payment.submit_single_payment(token, options)
  end

  def query_todays_payments do
    Bambora.Query.query_transaction({
      "2019-09-09 00:00:00",
      "2019-10-14 00:00:00"
    })
  end
end
