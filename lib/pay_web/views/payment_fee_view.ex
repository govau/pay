defmodule PayWeb.PaymentFeeView do
  use PayWeb, :view
  alias PayWeb.PaymentFeeView

  def render("index.json", %{payment_fees: payment_fees}) do
    %{data: render_many(payment_fees, PaymentFeeView, "payment_fee.json")}
  end

  def render("show.json", %{payment_fee: payment_fee}) do
    %{data: render_one(payment_fee, PaymentFeeView, "payment_fee.json")}
  end

  def render("payment_fee.json", %{payment_fee: payment_fee}) do
    %{
      id: payment_fee.id,
      external_id: payment_fee.external_id,
      amount_due: payment_fee.amount_due,
      amount_collected: payment_fee.amount_collected,
      collected_at: payment_fee.collected_at,
      gateway_transaction_id: payment_fee.gateway_transaction_id
    }
  end
end
