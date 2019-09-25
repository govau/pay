defmodule PayWeb.External.PaymentController do
  use PayWeb, :controller

  alias Pay.Payments
  alias Pay.Payments.Payment

  action_fallback PayWeb.FallbackController

  def index(conn, _params) do
    payments = Payments.list_payments()
    render(conn, "index.json", payments: payments)
  end

  def create(conn, %{"payment" => payment_params}) do
    with {:ok, %Payment{} = payment} <-
           Payments.create_payment(
             Map.merge(payment_params, %{
               "status" => "TODO",
               "auth_3ds_details" => %{},
               "external_metadata" => %{},
               "wallet" => "TODO"
             })
           ) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.external_payment_path(conn, :show, payment))
      |> render("show.json", payment: payment)
    end
  end

  def show(conn, %{"id" => id}) do
    payment = Payments.get_payment_by_external_id!(id)
    render(conn, "show.json", payment: payment)
  end
end
