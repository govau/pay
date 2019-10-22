defprotocol Bambora.Client do
  @spec make_request(t, Bambora.Service, params :: map) :: map
  def make_request(t, service, params)
end

defmodule Bambora.Client.SOAP do
  @base_url "https://demo.bambora.co.nz/interface/api/dts.asmx"
  @enforce_keys [:username, :password]
  defstruct [:username, :password]

  @spec bambora_wsdl() :: map
  defp bambora_wsdl do
    with {:ok, wsdl} <- Soap.init_model("#{@base_url}?WSDL", :url) do
      wsdl
    end
  end

  def call(request, operation) do
    with {:ok, response} <- Soap.call(bambora_wsdl(), operation, request) do
      Soap.Response.parse(response)
    end
  end
end

defmodule Bambora.Client.Static do
  defstruct response: ""
end

defimpl Bambora.Client, for: Bambora.Client.SOAP do
  def make_request(t, service, params) do
    service.build_body(params)
    |> Bambora.Auth.authorise(t)
    |> Bambora.Request.prepare(service.envelope)
    |> Bambora.Client.SOAP.call(service.operation)
    |> service.decode
  end
end

defimpl Bambora.Client, for: Bambora.Client.Static do
  def make_request(t, service, params) do
    service.build_body(params)
    |> Bambora.Auth.authorise(t)
    |> Bambora.Request.prepare(service.envelope)
    |> (&%{request: &1, response: t.response}).()
  end
end

defimpl Bambora.Auth.Authable, for: Bambora.Client.SOAP do
  def authorisation(t), do: %Bambora.Auth{username: t.username, password: t.password}
end

defimpl Bambora.Auth.Authable, for: Bambora.Client.Static do
  def authorisation(_t),
    do: %Bambora.Auth{username: "static_username", password: "static_password"}
end
