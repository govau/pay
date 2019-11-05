defmodule PayWeb.PaymentEventController do
  use PayWeb, :controller

  alias Pay.Payments
  alias Pay.Payments.PaymentEvent

  action_fallback PayWeb.FallbackController

  def index(conn, %{"payment_id" => payment_id}) do
    payment_events = Payments.list_payment_events_by_payment_external_id(payment_id)
    render(conn, "index.json", payment_events: payment_events)
  end
end
