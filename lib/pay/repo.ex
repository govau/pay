defmodule Pay.Repo do
  use Ecto.Repo,
    otp_app: :pay,
    adapter: Ecto.Adapters.Postgres

  def init(_type, config) do
    with {:ok, services} <- Pay.VCAP.services() do
      postgres = services["postgres"]
      database = Enum.at(postgres, 0)
      database_uri = database["credentials"]["uri"]
      {:ok, Keyword.put(config, :url, database_uri)}
    else
      _ ->
        {:ok, config}
    end
  end
end
