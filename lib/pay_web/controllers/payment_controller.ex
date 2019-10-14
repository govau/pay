defmodule PayWeb.PaymentController do
  use PayWeb, :controller

  alias Pay.Payments
  alias Pay.Payments.Payment

  action_fallback PayWeb.FallbackController

  def index(conn, _params) do
    payments = Payments.list_payments()
    render(conn, "index.json", payments: payments)
  end

  def create(conn, %{"payment" => payment_params}) do
    with {:ok, %Payment{} = payment} <- Payments.create_payment(payment_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.payments_payment_path(conn, :show, payment))
      |> render("show.json", payment: payment)
    end
  end

  def show(conn, %{"id" => id}) do
    payment = Payments.get_payment_by_external_id!(id)
    render(conn, "show.json", payment: payment)
  end

  def update(conn, %{"id" => id, "payment" => payment_params}) do
    payment = Payments.get_payment_by_external_id!(id)

    with {:ok, %Payment{} = payment} <- Payments.update_payment(payment, payment_params) do
      render(conn, "show.json", payment: payment)
    end
  end

  def delete(conn, %{"id" => id}) do
    payment = Payments.get_payment_by_external_id!(id)

    with {:ok, %Payment{}} <- Payments.delete_payment(payment) do
      send_resp(conn, :no_content, "")
    end
  end
end
