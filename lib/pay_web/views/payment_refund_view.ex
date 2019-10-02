defmodule PayWeb.PaymentRefundView do
  use PayWeb, :view
  alias PayWeb.PaymentRefundView

  def render("index.json", %{payment_refunds: payment_refunds}) do
    %{data: render_many(payment_refunds, PaymentRefundView, "payment_refund.json")}
  end

  def render("show.json", %{payment_refund: payment_refund}) do
    %{data: render_one(payment_refund, PaymentRefundView, "payment_refund.json")}
  end

  def render("payment_refund.json", %{payment_refund: payment_refund}) do
    %{
      id: payment_refund.external_id,
      reference: payment_refund.reference,
      amount: payment_refund.amount,
      status: payment_refund.status,
      user_external_id: payment_refund.user_external_id,
      gateway_transaction_id: payment_refund.gateway_transaction_id
    }
  end
end
