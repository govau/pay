defmodule PayWeb.Products.PayClient do
  # TODO: pass in auth.
  def new() do
    middleware = [
      {Tesla.Middleware.BaseUrl, PayWeb.Endpoint.url()},
      {Tesla.Middleware.EncodeJson, engine: Poison},
      {Tesla.Middleware.Headers, [{"user-agent", "Elixir"}]}
    ]

    Tesla.client(middleware)
  end
end
