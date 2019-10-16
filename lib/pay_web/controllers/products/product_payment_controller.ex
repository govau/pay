defmodule PayWeb.Products.ProductPaymentController do
  use PayWeb, :controller

  alias Pay.Payments
  alias Pay.Services
  alias Pay.Products
  alias Pay.Products.ProductPayment

  action_fallback PayWeb.FallbackController

  def show(conn, %{"id" => id}) do
    product_payment = Products.get_product_payment_by_external_id!(id)

    gateway_account =
      Payments.get_gateway_account_by_external_id!(product_payment.product.gateway_account_id)

    service = Services.get_service_by_gateway_account_external_id!(gateway_account.external_id)

    render(conn, "show.json",
      product_payment: product_payment,
      gateway_account: gateway_account,
      service: service
    )
  end

  def create_by_slugs(conn, %{"service_name_slug" => service_name_slug, "name_slug" => name_slug}) do
    product = Products.get_product_by_slugs!(service_name_slug, name_slug)

    # TODO:
    # - Work out what status should be
    # - Work out what next_url should be
    # - Create new payment and get ID from the main payments table. use the
    #   gateway account ID to create the payment against that account
    payment_id = "TODO"

    reference = if product.reference_enabled, do: "", else: Ecto.UUID.generate()

    with {:ok, %ProductPayment{} = product_payment} <-
           Products.create_product_payment(
             %{
               "payment_id" => payment_id,
               "reference" => reference,
               "status" => "some status",
               "next_url" => "some next_url"
             },
             product
           ) do
      conn
      |> put_status(:created)
      |> put_resp_header(
        "location",
        Routes.products_product_payment_path(conn, :show, product_payment)
      )
      |> render("show.json", product_payment: product_payment)
    end
  end

  def update(conn, %{"id" => id, "payment" => payment_params}) do
    product_payment = Products.get_product_payment_by_external_id!(id)

    gateway_account =
      Payments.get_gateway_account_by_external_id!(product_payment.product.gateway_account_id)

    service = Services.get_service_by_gateway_account_external_id!(gateway_account.external_id)

    with {:ok, %ProductPayment{} = product_payment} <-
           Products.update_product_payment(product_payment, payment_params) do
      render(conn, "show.json",
        product_payment: product_payment,
        gateway_account: gateway_account,
        service: service
      )
    end
  end
end
