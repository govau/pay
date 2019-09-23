defmodule PayWeb.ChargeRefundView do
  use PayWeb, :view
  alias PayWeb.ChargeRefundView

  def render("index.json", %{charge_refunds: charge_refunds}) do
    %{data: render_many(charge_refunds, ChargeRefundView, "charge_refund.json")}
  end

  def render("show.json", %{charge_refund: charge_refund}) do
    %{data: render_one(charge_refund, ChargeRefundView, "charge_refund.json")}
  end

  def render("charge_refund.json", %{charge_refund: charge_refund}) do
    %{
      id: charge_refund.id,
      external_id: charge_refund.external_id,
      reference: charge_refund.reference,
      amount: charge_refund.amount,
      status: charge_refund.status,
      user_external_id: charge_refund.user_external_id,
      gateway_transaction_id: charge_refund.gateway_transaction_id
    }
  end
end
