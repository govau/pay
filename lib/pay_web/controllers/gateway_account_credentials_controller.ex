defmodule PayWeb.GatewayAccountCredentialsController do
  use PayWeb, :controller

  alias Pay.Payments
  alias Pay.Payments.GatewayAccount

  action_fallback PayWeb.FallbackController

  def update(conn, %{
        "gateway_account_id" => gateway_account_id,
        "credentials" => credentials_params
      }) do
    gateway_account = Payments.get_gateway_account_by_external_id!(gateway_account_id)

    with {:ok, %GatewayAccount{} = gateway_account} <-
           Payments.update_gateway_account(gateway_account, %{
             "credentials" => credentials_params
           }) do
      render(conn, "show.json", gateway_account: gateway_account)
    end
  end
end
