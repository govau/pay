defmodule PayWeb.Products.ProductView do
  use PayWeb, :view
  alias PayWeb.Products.ProductView

  def render("index.json", %{products: products}) do
    %{data: render_many(products, ProductView, "product.json")}
  end

  def render("show.json", %{product: product}) do
    %{data: render_one(product, ProductView, "product.json")}
  end

  def render("product.json", %{product: product}) do
    %{
      id: product.external_id,
      gateway_account_id: product.gateway_account_id,
      name: product.name,
      description: product.description,
      price_fixed: product.price_fixed,
      price: product.price,
      status: product.status,
      return_url: product.return_url,
      service_name_slug: product.service_name_slug,
      name_slug: product.name_slug,
      reference_enabled: product.reference_enabled,
      reference_label: product.reference_label,
      reference_hint: product.reference_hint
    }
  end
end
