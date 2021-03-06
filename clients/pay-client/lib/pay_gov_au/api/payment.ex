# NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
# https://openapi-generator.tech
# Do not edit the class manually.

defmodule PayGovAu.Api.Payment do
  @moduledoc """
  API calls for all endpoints tagged `Payment`.
  """

  alias PayGovAu.Connection
  import PayGovAu.RequestBuilder

  @doc """
  Create payment
  The payment will be associated with the account in the authentication token.

  ## Parameters

  - connection (PayGovAu.Connection): Connection to server
  - payment (CreateRequest): 
  - opts (KeywordList): [optional] Optional parameters
  ## Returns

  {:ok, %PayGovAu.Model.CreateResponse{}} on success
  {:error, info} on failure
  """
  @spec create_payment(Tesla.Env.client(), PayGovAu.Model.CreateRequest.t(), keyword()) ::
          {:ok, PayGovAu.Model.CreateResponse.t()} | {:error, Tesla.Env.t()}
  def create_payment(connection, payment, _opts \\ []) do
    %{}
    |> method(:post)
    |> url("/api/v1/payments")
    |> add_param(:body, :body, payment)
    |> Enum.into([])
    |> (&Connection.request(connection, &1)).()
    |> evaluate_response([
      {201, %PayGovAu.Model.CreateResponse{}},
      {422, %PayGovAu.Model.CreateErrorResponse{}}
    ])
  end

  @doc """
  Show payment
  Retrieve information about the payment with the given ID.

  ## Parameters

  - connection (PayGovAu.Connection): Connection to server
  - id (String.t): Payment ID
  - opts (KeywordList): [optional] Optional parameters
  ## Returns

  {:ok, %PayGovAu.Model.ShowResponse{}} on success
  {:error, info} on failure
  """
  @spec get_payment(Tesla.Env.client(), String.t(), keyword()) ::
          {:ok, PayGovAu.Model.ShowResponse.t()} | {:error, Tesla.Env.t()}
  def get_payment(connection, id, _opts \\ []) do
    %{}
    |> method(:get)
    |> url("/api/v1/payments/#{id}")
    |> Enum.into([])
    |> (&Connection.request(connection, &1)).()
    |> evaluate_response([
      {200, %PayGovAu.Model.ShowResponse{}}
    ])
  end

  @doc """
  List payments
  See parameters for available search filters.

  ## Parameters

  - connection (PayGovAu.Connection): Connection to server
  - opts (KeywordList): [optional] Optional parameters
    - :reference (String.t): Payment reference to search (exact match, case insensitive)
  ## Returns

  {:ok, %PayGovAu.Model.IndexResponse{}} on success
  {:error, info} on failure
  """
  @spec list_payments(Tesla.Env.client(), keyword()) ::
          {:ok, PayGovAu.Model.IndexResponse.t()} | {:error, Tesla.Env.t()}
  def list_payments(connection, opts \\ []) do
    optional_params = %{
      :reference => :query
    }

    %{}
    |> method(:get)
    |> url("/api/v1/payments")
    |> add_optional_params(optional_params, opts)
    |> Enum.into([])
    |> (&Connection.request(connection, &1)).()
    |> evaluate_response([
      {200, %PayGovAu.Model.IndexResponse{}}
    ])
  end
end
