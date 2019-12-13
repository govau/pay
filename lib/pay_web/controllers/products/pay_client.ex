defmodule PayWeb.Products.PayClient do
  # TODO: pass in auth.
  def new() do
    middleware = [
      {Tesla.Middleware.Timeout, timeout: 5_000},
      {Tesla.Middleware.BaseUrl, PayWeb.Endpoint.url()},
      {Tesla.Middleware.EncodeJson, engine: Poison},
      {Tesla.Middleware.Headers,
       [
         {"user-agent", "Elixir"}
       ]}
    ]

    Tesla.client(middleware)
  end
end
