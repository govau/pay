defmodule Pay.Auth.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :pay,
    module: Pay.Auth.Guardian,
    error_handler: Pay.Auth.ErrorHandler

  plug Guardian.Plug.VerifyHeader
  plug Guardian.Plug.LoadResource, allow_blank: true
end
