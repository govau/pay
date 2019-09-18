defmodule Pay.Repo do
  use Ecto.Repo,
    otp_app: :pay,
    adapter: Ecto.Adapters.Postgres
end
