defmodule PayWeb.Products.ProductPaymentController do
  use PayWeb, :controller

  alias Pay.Products

  action_fallback PayWeb.FallbackController

  def index(conn, %{"product_id" => product_id}) do
    product_payments = Products.list_product_payments_by_product_external_id(product_id)
    render(conn, "index.json", product_payments: product_payments)
  end

  def index(conn, _params) do
    product_payments = Products.list_product_payments()
    render(conn, "index.json", product_payments: product_payments)
  end
end
