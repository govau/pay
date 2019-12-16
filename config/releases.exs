import Config

config :pay, PayWeb.Endpoint,
  url: [scheme: "https", host: System.get_env("ENDPOINT_HOST"), port: 443]

config :pay, :checkout_endpoint, "https://#{System.get_env("ENDPOINT_HOST")}"
