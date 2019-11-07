defmodule PayWeb.PaymentRefundController do
  use PayWeb, :controller

  alias Pay.Payments

  action_fallback PayWeb.FallbackController

  def index(conn, %{"payment_id" => payment_id}) do
    refunds =
      payment_id
      |> Payments.get_payment_by_external_id!()
      |> Payments.list_payment_refunds()

    render(conn, "index.json", payment_refunds: refunds)
  end

  def show(conn, %{"payment_id" => _payment_id, "id" => refund_id}) do
    refund = Payments.get_payment_refund!(refund_id)
    render(conn, "show.json", payment_refund: refund)
  end

  def create(conn, %{
        "payment_id" => payment_id,
        "payment_refund" => %{"amount" => amount, "reference" => reference}
      }) do
    with payment <- Payments.get_payment_by_external_id!(payment_id),
         gateway <- Payments.GatewayAccount.payment_provider(payment.gateway_account),
         {:ok, %{reference: refund_reference}} <-
           Payments.Gateway.refund_payment(gateway, payment, %{amount: amount}),
         {:ok, refund} <-
           Payments.create_payment_refund(payment, %{
             amount: amount,
             reference: reference,
             gateway_transaction_id: refund_reference,
             user_external_id: conn.assigns.current_user.external_id
           }) do
      conn
      |> put_status(:created)
      |> put_resp_header(
        "location",
        Routes.payments_payment_payment_refund_path(conn, :show, payment_id, refund)
      )
      |> render("show.json", payment_refund: refund)
    end
  end
end
