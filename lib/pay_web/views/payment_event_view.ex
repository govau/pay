defmodule PayWeb.PaymentEventView do
  use PayWeb, :view
  alias PayWeb.PaymentEventView

  def render("index.json", %{payment_events: payment_events}) do
    %{data: render_many(payment_events, PaymentEventView, "payment_event.json")}
  end

  def render("show.json", %{payment_event: payment_event}) do
    %{data: render_one(payment_event, PaymentEventView, "payment_event.json")}
  end

  def render("payment_event.json", %{payment_event: payment_event}) do
    %{id: payment_event.id, status: payment_event.status}
  end
end
