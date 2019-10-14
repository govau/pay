defmodule PayWeb.Products.ProductPaymentView do
  use PayWeb, :view
  alias PayWeb.Products.ProductPaymentView

  def render("index.json", %{product_payments: product_payments}) do
    %{data: render_many(product_payments, ProductPaymentView, "product_payment.json")}
  end

  def render("show.json", %{product_payment: product_payment}) do
    %{data: render_one(product_payment, ProductPaymentView, "product_payment.json")}
  end

  def render("product_payment.json", %{product_payment: product_payment}) do
    %{
      id: product_payment.external_id,
      payment_id: product_payment.payment_id,
      next_url: product_payment.next_url,
      amount: product_payment.amount,
      status: product_payment.status,
      gateway_account_id: product_payment.gateway_account_id,
      reference_number: product_payment.reference_number
    }
  end
end
