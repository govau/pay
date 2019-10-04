defmodule Bambora.Client do
  @callback make_request(String.t(), Bambora.Client.Request.t()) :: map

  @spec current_client :: Bambora.Client
  def current_client do
    Application.get_env(:bambora, :client, Bambora.Client.SOAP)
  end

  def make_request(request, operation) do
    current_client().make_request(operation, request)
  end
end

defmodule Bambora.Client.SOAP do
  @behaviour Bambora.Client

  @callback bambora_wsdl() :: map

  @base_url "https://demo.bambora.co.nz/interface/api/dts.asmx"

  @spec bambora_wsdl() :: map
  defp bambora_wsdl do
    with {:ok, wsdl} <- Soap.init_model("#{@base_url}?WSDL", :url) do
      wsdl
    end
  end

  def make_request(operation, request) do
    with {:ok, response} <- Soap.call(bambora_wsdl(), operation, request) do
      Soap.Response.parse(response)
    end
  end
end

defmodule Bambora.Client.Static do
  @behaviour Bambora.Client

  def make_request(_operation, _request) do
    %{status: "ok"}
  end
end
