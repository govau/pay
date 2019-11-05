defmodule PayWeb.PaymentEventController do
  use PayWeb, :controller

  alias Pay.Payments

  action_fallback PayWeb.FallbackController

  def index(conn, %{"payment_id" => payment_id}) do
    payment_events =
      payment_id |> Payments.get_payment_by_external_id!() |> Payments.list_payment_events()

    render(conn, "index.json", payment_events: payment_events)
  end
end
