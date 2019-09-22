defmodule PayWeb.GatewayAccountView do
  use PayWeb, :view
  alias PayWeb.GatewayAccountView

  def render("index.json", %{gateway_accounts: gateway_accounts}) do
    %{data: render_many(gateway_accounts, GatewayAccountView, "gateway_account.json")}
  end

  def render("show.json", %{gateway_account: gateway_account}) do
    %{data: render_one(gateway_account, GatewayAccountView, "gateway_account.json")}
  end

  def render("gateway_account.json", %{gateway_account: gateway_account}) do
    %{
      id: gateway_account.id,
      name: gateway_account.name,
      type: gateway_account.type,
      credentials: gateway_account.credentials,
      service_name: gateway_account.service_name,
      description: gateway_account.description,
      requires_3ds: gateway_account.requires_3ds,
      allow_apple_pay: gateway_account.allow_apple_pay,
      allow_google_pay: gateway_account.allow_google_pay,
      corporate_credit_card_surcharge_amount:
        gateway_account.corporate_credit_card_surcharge_amount,
      corporate_debit_card_surcharge_amount:
        gateway_account.corporate_debit_card_surcharge_amount,
      corporate_prepaid_credit_card_surcharge_amount:
        gateway_account.corporate_prepaid_credit_card_surcharge_amount,
      corporate_prepaid_debit_card_surcharge_amount:
        gateway_account.corporate_prepaid_debit_card_surcharge_amount,
      allow_zero_amount: gateway_account.allow_zero_amount,
      integration_version_3ds: gateway_account.integration_version_3ds
    }
  end
end
