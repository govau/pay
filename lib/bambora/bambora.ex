defmodule Bambora do
  @moduledoc """
  Documentation for Bambora interface.
  """

  alias Bambora.Service

  @spec submit_single_payment(
          Bambora.Client.t(),
          Bambora.Service.SubmitSinglePayment.params()
        ) :: {:ok, Bambora.Service.SubmitSinglePayment.response()} | {:error, String.t()}
  def submit_single_payment(client, params) do
    with {:ok, %{response: response}} <-
           Bambora.Client.make_request(
             client,
             Service.SubmitSinglePayment,
             params
           ) do
      {:ok, response}
    end
  end

  @spec submit_single_refund(
          Bambora.Client.t(),
          Bambora.Service.SubmitSingleRefund.params()
        ) :: {:ok, Bambora.Service.SubmitSingleRefund.response()} | {:error, String.t()}
  def submit_single_refund(client, params) do
    with {:ok, %{response: response}} <-
           Bambora.Client.make_request(
             client,
             Service.SubmitSingleRefund,
             params
           ) do
      {:ok, response}
    end
  end

  @spec query_todays_payments(Bambora.Client.t()) :: {:ok, map} | {:error, String.t()}
  def query_todays_payments(client) do
    Bambora.Client.make_request(client, Service.QueryTransaction, %{
      start: "2019-09-09 00:00:00",
      end: "2019-10-24 00:00:00"
    })
  end
end
