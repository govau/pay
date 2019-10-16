defmodule PayWeb.ProductControllerTest do
  use PayWeb.ConnCase

  alias Pay.Payments
  alias Pay.Payments.GatewayAccount
  alias Pay.Products
  alias Pay.Products.Product

  @create_attrs %{
    api_token: "some api_token",
    description: "some description",
    external_id: "7488a646-e31f-11e4-aace-600308960662",
    gateway_account_id: "7488a646-e31f-11e4-aace-600308960660",
    name: "some name",
    price_fixed: true,
    price: 42,
    name_slug: "some-name",
    reference_enabled: true,
    reference_hint: "some reference_hint",
    reference_label: "some reference_label",
    return_url: "some return_url",
    service_name_slug: "some-service-name",
    status: "some status"
  }
  @update_attrs %{
    api_token: "some updated api_token",
    description: "some updated description",
    name: "some updated name",
    price_fixed: true,
    price: 43,
    reference_enabled: false,
    reference_hint: "some updated reference_hint",
    reference_label: "some updated reference_label",
    return_url: "some updated return_url",
    status: "some updated status"
  }
  @invalid_attrs %{
    api_token: nil,
    description: nil,
    external_id: nil,
    gateway_account_id: nil,
    name: nil,
    price_fixed: nil,
    price: nil,
    name_slug: nil,
    reference_enabled: nil,
    reference_hint: nil,
    reference_label: nil,
    return_url: nil,
    service_name_slug: nil,
    status: nil
  }

  def fixture(:gateway_account) do
    {:ok, gateway_account} =
      Payments.create_gateway_account(%{
        "type" => Payments.GatewayAccount.Type.Test.value().name,
        "payment_provider" => Payments.GatewayAccount.PaymentProvider.Sandbox.value().name,
        "service_name" => "Test service"
      })

    gateway_account
  end

  def fixture(:product, gateway_account) do
    {:ok, product} =
      Products.create_product(
        Map.merge(@create_attrs, %{
          :gateway_account_id => gateway_account.external_id
        })
      )

    product
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all products", %{conn: conn} do
      conn = get(conn, Routes.products_product_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create product" do
    setup [:create_gateway_account]

    test "renders product when data is valid", %{
      conn: conn,
      gateway_account: %GatewayAccount{external_id: gateway_account_id} = _gateway_account
    } do
      conn =
        post(
          conn,
          Routes.products_product_path(conn, :create, gateway_account_id: gateway_account_id),
          product: @create_attrs
        )

      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.products_product_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some description",
               "gateway_account_id" => gateway_account_id,
               "name" => "some name",
               "price_fixed" => true,
               "price" => 42,
               "name_slug" => "some-name",
               "reference_enabled" => true,
               "reference_hint" => "some reference_hint",
               "reference_label" => "some reference_label",
               "return_url" => "some return_url",
               "service_name_slug" => "test-service",
               "status" => "some status"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{
      conn: conn,
      gateway_account: %GatewayAccount{external_id: gateway_account_id} = _gateway_account
    } do
      conn =
        post(
          conn,
          Routes.products_product_path(conn, :create, gateway_account_id: gateway_account_id),
          product: @invalid_attrs
        )

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update product" do
    setup [:create_product]

    test "renders product when data is valid", %{
      conn: conn,
      gateway_account: %GatewayAccount{external_id: _gateway_account_id} = _gateway_account,
      product: %Product{external_id: id} = product
    } do
      conn =
        put(conn, Routes.products_product_path(conn, :update, product), product: @update_attrs)

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.products_product_path(conn, :show, id))

      assert %{
               "id" => id,
               "description" => "some updated description",
               "gateway_account_id" => gateway_account_id,
               "name" => "some updated name",
               "price_fixed" => true,
               "price" => 43,
               "name_slug" => "some-updated-name",
               "reference_enabled" => false,
               "reference_hint" => "some updated reference_hint",
               "reference_label" => "some updated reference_label",
               "return_url" => "some updated return_url",
               "service_name_slug" => "some-service-name",
               "status" => "some updated status"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, product: product} do
      conn =
        put(conn, Routes.products_product_path(conn, :update, product), product: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete product" do
    setup [:create_product]

    test "deletes chosen product", %{conn: conn, product: product} do
      conn = delete(conn, Routes.products_product_path(conn, :delete, product))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.products_product_path(conn, :show, product))
      end
    end
  end

  defp create_gateway_account(_) do
    gateway_account = fixture(:gateway_account)
    {:ok, gateway_account: gateway_account}
  end

  defp create_product(_) do
    gateway_account = fixture(:gateway_account)
    product = fixture(:product, gateway_account)
    {:ok, gateway_account: gateway_account, product: product}
  end
end
