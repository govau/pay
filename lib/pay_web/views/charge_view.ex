defmodule PayWeb.ChargeView do
  use PayWeb, :view
  alias PayWeb.ChargeView

  def render("index.json", %{charges: charges}) do
    %{data: render_many(charges, ChargeView, "charge.json")}
  end

  def render("show.json", %{charge: charge}) do
    %{data: render_one(charge, ChargeView, "charge.json")}
  end

  def render("charge.json", %{charge: charge}) do
    %{
      id: charge.id,
      external_id: charge.external_id,
      amount: charge.amount,
      status: charge.status,
      gateway_transaction_id: charge.gateway_transaction_id,
      return_url: charge.return_url,
      email: charge.email,
      card_details: charge.card_details,
      auth_3ds_details: charge.auth_3ds_details,
      description: charge.description,
      reference: charge.reference,
      delayed_capture: charge.delayed_capture,
      wallet: charge.wallet,
      external_metadata: charge.external_metadata
    }
  end
end
