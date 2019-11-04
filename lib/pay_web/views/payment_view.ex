defmodule PayWeb.PaymentView do
  use PayWeb, :view
  alias PayWeb.PaymentView

  def render("index.json", %{payments: payments}) do
    %{data: render_many(payments, PaymentView, "payment.json")}
  end

  def render("show.json", %{payment: payment}) do
    %{data: render_one(payment, PaymentView, "payment.json")}
  end

  def render("payment.json", %{payment: payment}) do
    %{
      id: payment.external_id,
      inserted_at: payment.inserted_at,
      amount: payment.amount,
      status: payment.status,
      gateway_account:
        render_one(payment.gateway_account, PayWeb.GatewayAccountView, "gateway_account.json"),
      gateway_account_id: payment.gateway_account.external_id,
      gateway_transaction_id: payment.gateway_transaction_id,
      return_url: payment.return_url,
      email: payment.email,
      card_details: payment.card_details,
      auth_3ds_details: payment.auth_3ds_details,
      description: payment.description,
      reference: payment.reference,
      delayed_capture: payment.delayed_capture,
      wallet: payment.wallet,
      external_metadata: payment.external_metadata
    }
  end
end
