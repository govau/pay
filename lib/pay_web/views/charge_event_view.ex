defmodule PayWeb.ChargeEventView do
  use PayWeb, :view
  alias PayWeb.ChargeEventView

  def render("index.json", %{charge_events: charge_events}) do
    %{data: render_many(charge_events, ChargeEventView, "charge_event.json")}
  end

  def render("show.json", %{charge_event: charge_event}) do
    %{data: render_one(charge_event, ChargeEventView, "charge_event.json")}
  end

  def render("charge_event.json", %{charge_event: charge_event}) do
    %{id: charge_event.id, status: charge_event.status}
  end
end
