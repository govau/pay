defmodule PayWeb.ChargeFeeView do
  use PayWeb, :view
  alias PayWeb.ChargeFeeView

  def render("index.json", %{charge_fees: charge_fees}) do
    %{data: render_many(charge_fees, ChargeFeeView, "charge_fee.json")}
  end

  def render("show.json", %{charge_fee: charge_fee}) do
    %{data: render_one(charge_fee, ChargeFeeView, "charge_fee.json")}
  end

  def render("charge_fee.json", %{charge_fee: charge_fee}) do
    %{
      id: charge_fee.id,
      external_id: charge_fee.external_id,
      amount_due: charge_fee.amount_due,
      amount_collected: charge_fee.amount_collected,
      collected_at: charge_fee.collected_at,
      gateway_transaction_id: charge_fee.gateway_transaction_id
    }
  end
end
