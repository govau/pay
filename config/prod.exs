use Mix.Config

IO.inspect(System.get_env("ENDPOINT_HOST"))

# Do not print debug messages in production
config :logger, level: :info

secret_key_base =
  System.get_env("SECRET_KEY_BASE") ||
    raise """
    environment variable SECRET_KEY_BASE is missing.
    You can generate one by calling: mix phx.gen.secret
    """

config :pay, PayWeb.Endpoint,
  http: [port: {:system, "PORT"}],
  url: [host: System.get_env("ENDPOINT_HOST"), port: 80],
  secret_key_base: secret_key_base

config :bambora,
  api_username: System.get_env("BAMBORA_USERNAME"),
  api_password: System.get_env("BAMBORA_PASSWORD")

config :stripity_stripe,
  api_key: System.get_env("STRIPE_API_KEY")

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:

config :pay, PayWeb.Endpoint, server: true
