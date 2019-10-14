defmodule PayWeb.ProductPaymentControllerTest do
  use PayWeb.ConnCase

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all product_payments", %{conn: conn} do
      product_id = "7488a646-e31f-11e4-aace-600308960662"
      conn = get(conn, Routes.products_product_product_payment_path(conn, :index, product_id))
      assert json_response(conn, 200)["data"] == []
    end
  end
end
