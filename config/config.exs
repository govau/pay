# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :pay,
  ecto_repos: [Pay.Repo]

# Configures the endpoint
config :pay, PayWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "TIdVD04KTP/mMfxDQlbyEi1wqDKIOd7kxNpJQ7KbFtTKZtCZgUL+CM6f1ny8BESH",
  render_errors: [view: PayWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Pay.PubSub, adapter: Phoenix.PubSub.PG2]

config :pay, :checkout_endpoint, System.get_env("CHECKOUT_ENDPOINT", "http://localhost:3000")

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :sentry,
  dsn: System.get_env("SENTRY_DSN"),
  enable_source_code_context: true,
  root_source_code_path: File.cwd!(),
  environment_name: System.get_env("RELEASE_LEVEL") || "development",
  included_environments: ~w(production staging)

config :soap,
       :globals,
       version: "1.1",
       env_namespace: "soapenv"

config :phoenix_swagger, json_library: Jason

config :pay, :phoenix_swagger,
  swagger_files: %{
    "priv/static/swagger.json" => [router: PayWeb.Router, endpoint: PayWeb.Endpoint]
  }

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
