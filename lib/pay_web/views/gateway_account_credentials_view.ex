defmodule PayWeb.GatewayAccountCredentialsView do
  use PayWeb, :view
  alias PayWeb.GatewayAccountCredentialsView

  def render("show.json", %{gateway_account: gateway_account}) do
    %{
      data:
        render(
          GatewayAccountCredentialsView,
          "gateway_account_credentials.json",
          gateway_account: gateway_account
        )
    }
  end

  def render("gateway_account_credentials.json", %{gateway_account: gateway_account}) do
    case Pay.Payments.GatewayAccount.Provider.from_string(gateway_account.payment_provider) do
      :bambora ->
        Map.take(gateway_account.credentials, ["merchant_id", "account_number", "api_username"])

      :sandbox ->
        %{}
    end
  end
end
