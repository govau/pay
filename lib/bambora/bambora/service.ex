defmodule Bambora.Service do
  # dialyxir can't spec a behaviour. module is the best we can do
  @type t :: module
  @type response :: {:ok, map} | {:error, String.t()}
  @type xml_data ::
          {String.t(), %{optional(String.t()) => String.t()}, [xml_data] | String.t()}

  @callback operation :: String.t()
  @callback envelope :: String.t()
  @callback build_body(params :: map) :: [xml_data]
  @callback decode(response :: map) :: map

  @doc """
  Safely decode a response using a service's decode routine.
  Catches exceptions and maps them into an ok/error tuple
  """
  @spec decode(response, service :: term) :: response
  def decode({:ok, response}, service) do
    try do
      {:ok, service.decode(response)}
    rescue
      _ -> {:error, "error decoding response"}
    end
  end

  def decode({:error, _message} = response, _service), do: response
end
