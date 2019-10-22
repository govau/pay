defmodule Bambora do
  @moduledoc """
  Documentation for Bambora interface.
  """

  alias Bambora.Service

  @spec submit_single_payment(Bambora.Client.t(), Service.SubmitSinglePayment.params()) :: map
  def submit_single_payment(client, params) do
    Bambora.Client.make_request(
      client,
      Bambora.Service.SubmitSinglePayment,
      params
    )
  end

  @spec query_todays_payments(Bambora.Client.t()) :: map
  def query_todays_payments(client) do
    Bambora.Client.make_request(client, Bambora.Service.QueryTransaction, %{
      start: "2019-09-09 00:00:00",
      end: "2019-10-24 00:00:00"
    })
  end
end
