use Mix.Config

config :auth0_ex,
  domain: "dta-platforms.au.auth0.com",
  mgmt_client_id: System.get_env("AUTH0_MANAGEMENT_CLIENT_ID"),
  mgmt_client_secret: System.get_env("AUTH0_MANAGEMENT_CLIENT_SECRET"),
  http_opts: []
