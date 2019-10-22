use Mix.Config

postgres_username =
  with env <- System.get_env("POSTGRES_USER") do
    if env, do: [username: env], else: []
  end

# Configure your database
config :pay,
       Pay.Repo,
       postgres_username ++
         [
           database: "pay_test",
           hostname: "localhost",
           pool: Ecto.Adapters.SQL.Sandbox
         ]

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :pay, PayWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
