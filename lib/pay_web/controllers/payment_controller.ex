defmodule PayWeb.PaymentController do
  use PayWeb, :controller

  alias Pay.Payments
  alias Pay.Payments.Payment

  action_fallback PayWeb.FallbackController

  def index(conn, %{"gateway_account_id" => gateway_account_id}) do
    payments = Payments.list_payments_by_gateway_account_external_id(gateway_account_id)
    render(conn, "index.json", payments: payments)
  end

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

  def update(conn, %{
        "id" => id,
        "transition" => transition,
        "payment" => payment_params
      }) do
    with payment <- Payments.get_payment_by_external_id!(id),
         payment <- Pay.Repo.preload(payment, :gateway_account),
         gateway <- Payments.GatewayAccount.payment_provider(payment.gateway_account),
         {:ok, %{reference: payment_reference}} <-
           Payments.Gateway.submit_payment(gateway, payment, payment_params),
         {:ok, updated_payment} <-
           Payments.update_payment(payment, transition, %{
             gateway_transaction_id: payment_reference
           }) do
      render(conn, "show.json", payment: updated_payment)
    end
  end
end
