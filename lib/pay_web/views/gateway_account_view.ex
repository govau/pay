defmodule PayWeb.GatewayAccountView do
  use PayWeb, :view
  alias PayWeb.GatewayAccountView
  alias Pay.Payments.GatewayAccount.PaymentProvider

  def render("index.json", %{gateway_accounts: gateway_accounts}) do
    %{data: render_many(gateway_accounts, GatewayAccountView, "gateway_account.json")}
  end

  def render("show.json", %{gateway_account: gateway_account}) do
    %{data: render_one(gateway_account, GatewayAccountView, "gateway_account.json")}
  end

  def render("gateway_account.json", %{gateway_account: gateway_account}) do
    sandbox = PaymentProvider.Sandbox.value().name
    bambora = PaymentProvider.Bambora.value().name

    credentials_typename =
      case gateway_account.payment_provider do
        ^sandbox -> "SandboxCredentials"
        ^bambora -> "BamboraCredentials"
        _ -> ""
      end

    %{
      id: gateway_account.external_id,
      payment_provider: gateway_account.payment_provider,
      type: gateway_account.type,
      credentials:
        Map.merge(gateway_account.credentials, %{
          "__typename" => credentials_typename
        }),
      service_name: gateway_account.service_name,
      description: gateway_account.description,
      requires_3ds: gateway_account.requires_3ds,
      allow_apple_pay: gateway_account.allow_apple_pay,
      allow_google_pay: gateway_account.allow_google_pay,
      allow_zero_amount: gateway_account.allow_zero_amount,
      integration_version_3ds: gateway_account.integration_version_3ds
    }
  end
end
