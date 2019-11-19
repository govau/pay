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
    event_type =
      case payment_event.payment_refund_id do
        refund_id when not is_nil(refund_id) -> "refund"
        _otherwise -> "payment"
      end

    %{
      id: payment_event.id,
      inserted_at: payment_event.inserted_at,
      updated_at: payment_event.updated_at,
      status: payment_event.status,
      refund_id: payment_event.payment_refund_id,
      type: event_type
    }
  end
end
