defmodule PayWeb.Products.ProductPaymentView do
  use PayWeb, :view
  alias PayWeb.Products.ProductPaymentView

  def render("index.json", %{product_payments: product_payments}) do
    %{data: render_many(product_payments, ProductPaymentView, "product_payment.json")}
  end

  def render("show.json", %{
        product_payment: product_payment,
        gateway_account: gateway_account,
        service: service
      }) do
    %{
      data:
        render(ProductPaymentView, "product_payment.json",
          product_payment: product_payment,
          gateway_account: gateway_account,
          service: service
        )
    }
  end

  # View when gateway_account and service are not preloaded.
  def render("show.json", %{product_payment: product_payment}) do
    %{
      data: render(ProductPaymentView, "product_payment.json", product_payment: product_payment)
    }
  end

  def render("service.json", %{service: service}) do
    %{
      id: service.external_id,
      name: service.name
    }
  end

  def render("gateway_account.json", %{gateway_account: gateway_account, service: service}) do
    %{
      id: gateway_account.external_id,
      service: render(ProductPaymentView, "service.json", service: service)
    }
  end

  def render("product.json", %{
        product: product,
        gateway_account: gateway_account,
        service: service
      }) do
    %{
      id: product.external_id,
      name: product.name,
      name_slug: product.name_slug,
      description: product.description,
      service_name_slug: product.service_name_slug,
      status: product.status,
      price_fixed: product.price_fixed,
      price: product.price,
      reference_enabled: product.reference_enabled,
      reference_label: product.reference_label,
      reference_hint: product.reference_hint,
      gateway_account:
        render(ProductPaymentView, "gateway_account.json",
          gateway_account: gateway_account,
          service: service
        )
    }
  end

  # View when gateway_account and service are not preloaded.
  def render("product.json", %{
        product: product
      }) do
    %{
      id: product.external_id,
      name: product.name,
      name_slug: product.name_slug,
      description: product.description,
      service_name_slug: product.service_name_slug,
      status: product.status,
      price_fixed: product.price_fixed,
      price: product.price,
      reference_enabled: product.reference_enabled,
      reference_label: product.reference_label,
      reference_hint: product.reference_hint
    }
  end

  def render("product_payment.json", %{
        product_payment: product_payment,
        gateway_account: gateway_account,
        service: service
      }) do
    %{
      id: product_payment.external_id,
      product:
        render(ProductPaymentView, "product.json",
          product: product_payment.product,
          gateway_account: gateway_account,
          service: service
        ),
      payment_id: product_payment.payment_id,
      next_url: product_payment.next_url,
      amount: product_payment.amount,
      status: product_payment.status,
      gateway_account_id: product_payment.gateway_account_id,
      reference: product_payment.reference
    }
  end

  # View when gateway_account and service are not preloaded.
  def render("product_payment.json", %{
        product_payment: product_payment
      }) do
    %{
      id: product_payment.external_id,
      product: render(ProductPaymentView, "product.json", product: product_payment.product),
      payment_id: product_payment.payment_id,
      next_url: product_payment.next_url,
      amount: product_payment.amount,
      status: product_payment.status,
      gateway_account_id: product_payment.gateway_account_id,
      reference: product_payment.reference
    }
  end
end
