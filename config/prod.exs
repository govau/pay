use Mix.Config

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
  url: [scheme: "https", host: System.get_env("ENDPOINT_HOST"), port: 443],
  secret_key_base: secret_key_base

config :pay, :checkout_endpoint, "https://#{System.get_env("ENDPOINT_HOST")}"

config :stripity_stripe,
  api_key: System.get_env("STRIPE_API_KEY")

# ## Using releases (Elixir v1.9+)
#
# If you are doing OTP releases, you need to instruct Phoenix
# to start each relevant endpoint:

config :pay, PayWeb.Endpoint, server: true
