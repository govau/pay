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
      id: product.id,
      external_id: product.external_id,
      gateway_account_id: product.gateway_account_id,
      api_token: product.api_token,
      name: product.name,
      description: product.description,
      price: product.price,
      status: product.status,
      return_url: product.return_url,
      service_name_path: product.service_name_path,
      product_name_path: product.product_name_path,
      reference_enabled: product.reference_enabled,
      reference_label: product.reference_label,
      reference_hint: product.reference_hint
    }
  end
end
