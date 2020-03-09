defmodule Pay.Repo do
  use Ecto.Repo,
    otp_app: :pay,
    adapter: Ecto.Adapters.Postgres

  def postgres_config(config, %{"postgres" => [database]}) do
    %{"uri" => database_uri} = database["credentials"]
    {:ok, Keyword.put(config, :url, database_uri)}
  end

  def postgres_config(config, %{"postgresql" => [database]}) do
    %{
      "DB_NAME" => database_name,
      "MASTER_USERNAME" => username,
      "MASTER_PASSWORD" => password,
      "ENDPOINT_ADDRESS" => hostname,
      "PORT" => port
    } = database["credentials"]

    config =
      config
      |> Keyword.put(:database, database_name)
      |> Keyword.put(:username, username)
      |> Keyword.put(:password, password)
      |> Keyword.put(:hostname, hostname)
      |> Keyword.put(:port, port)

    {:ok, config}
  end

  def init(_type, config) do
    with {:ok, services} <- Pay.VCAP.services() do
      postgres_config(config, services)
    else
      _ -> {:ok, config}
    end
  end
end
