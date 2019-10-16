defmodule PayWeb.Products.ProductController do
  use PayWeb, :controller

  alias Pay.Payments
  alias Pay.Products
  alias Pay.Products.Product

  action_fallback PayWeb.FallbackController

  def index(conn, %{"gateway_account_id" => gateway_account_id}) do
    products = Products.list_products_by_gateway_external_id(gateway_account_id)
    render(conn, "index.json", products: products)
  end

  def index(conn, _params) do
    products = Products.list_products()
    render(conn, "index.json", products: products)
  end

  def create(conn, %{"gateway_account_id" => gateway_account_id, "product" => product_params}) do
    gateway_account = Payments.get_gateway_account_by_external_id!(gateway_account_id)

    # TODO:
    # - Token
    # - Work out what status should be
    # - Work out what return URL should be

    # TODO: handle unique constraint error (when name and service name slugs already exist).

    with {:ok, %Product{} = product} <-
           Products.create_product(
             Map.merge(product_params, %{
               "gateway_account_id" => gateway_account_id,
               "api_token" => "some api_token",
               "service_name_slug" => gateway_account.service_name |> Slugger.slugify_downcase(),
               "status" => "some status",
               "return_url" => "some return_url"
             })
           ) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.products_product_path(conn, :show, product))
      |> render("show.json", product: product)
    end
  end

  def show(conn, %{"id" => id}) do
    product = Products.get_product_by_external_id!(id)
    render(conn, "show.json", product: product)
  end

  def show_by_slugs(conn, %{"service_name_slug" => service_name_slug, "name_slug" => name_slug}) do
    product = Products.get_product_by_slugs!(service_name_slug, name_slug)
    render(conn, "show.json", product: product)
  end

  def update(conn, %{"id" => id, "product" => product_params}) do
    product = Products.get_product_by_external_id!(id)

    with {:ok, %Product{} = product} <- Products.update_product(product, product_params) do
      render(conn, "show.json", product: product)
    end
  end

  def delete(conn, %{"id" => id}) do
    product = Products.get_product_by_external_id!(id)

    with {:ok, %Product{}} <- Products.delete_product(product) do
      send_resp(conn, :no_content, "")
    end
  end
end
