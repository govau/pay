defmodule PayWeb.Products.PayClient do
  # TODO: pass in auth.
  def new() do
    middleware = [
      {Tesla.Middleware.BaseUrl, PayWeb.Endpoint.url()},
      {Tesla.Middleware.EncodeJson, engine: Poison},
      {Tesla.Middleware.Headers, [{"user-agent", "Elixir"}]}
    ]

    IO.inspect(PayWeb.Endpoint.url())
    IO.inspect(middleware)

    Tesla.client(middleware)
  end
end
