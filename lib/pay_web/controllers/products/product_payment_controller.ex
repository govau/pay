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

    reference = if product.reference_enabled, do: "", else: Ecto.UUID.generate()

    with {:ok, %ProductPayment{} = product_payment} <-
           Products.create_product_payment(
             %{
               "reference" => reference
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

  def submit(conn, %{"id" => id}) do
    product_payment = Products.get_product_payment_by_external_id!(id)

    gateway_account =
      Payments.get_gateway_account_by_external_id!(product_payment.product.gateway_account_id)

    service = Services.get_service_by_gateway_account_external_id!(gateway_account.external_id)

    # Simulate hitting the public payments API to create a payment.
    with {:ok, %Payments.Payment{} = payment} <-
           Payments.create_payment(%{
             # We pass the gateway account ID.
             # Normally you'd pass your product's token as auth (which has the
             # gateway account implied in it).
             "gateway_account_id" => gateway_account.id,
             "reference" => product_payment.reference,
             "amount" => product_payment.amount,
             "description" => product_payment.product.name,
             # We will pass a URL here so that the pay page knows how to
             # redirect back to the products page to show a confirmation page.
             "return_url" => "TODO.some.host/product_payment.external_id"
           }),
         {:ok, %ProductPayment{} = product_payment} <-
           Products.submit_product_payment(
             product_payment,
             payment.external_id,
             # We will use this to allow the frontend to redirect to the pay
             # page URL. We'll get this from the payment response directly above.
             "TODO some next_url"
           ) do
      render(conn, "show.json",
        product_payment: product_payment,
        gateway_account: gateway_account,
        service: service
      )
    end
  end
end
