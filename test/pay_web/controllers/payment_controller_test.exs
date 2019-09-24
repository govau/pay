defmodule PayWeb.PaymentControllerTest do
  use PayWeb.ConnCase

  alias Pay.Payments
  alias Pay.Payments.Payment

  @create_attrs %{
    amount: 42,
    auth_3ds_details: %{},
    card_details: %{},
    delayed_capture: true,
    description: "some description",
    email: "some email",
    external_id: "7488a646-e31f-11e4-aace-600308960662",
    external_metadata: %{},
    gateway_transaction_id: "some gateway_transaction_id",
    reference: "some reference",
    return_url: "some return_url",
    status: "some status",
    wallet: "some wallet"
  }
  @update_attrs %{
    amount: 43,
    auth_3ds_details: %{},
    card_details: %{},
    delayed_capture: false,
    description: "some updated description",
    email: "some updated email",
    external_id: "7488a646-e31f-11e4-aace-600308960668",
    external_metadata: %{},
    gateway_transaction_id: "some updated gateway_transaction_id",
    reference: "some updated reference",
    return_url: "some updated return_url",
    status: "some updated status",
    wallet: "some updated wallet"
  }
  @invalid_attrs %{
    amount: nil,
    auth_3ds_details: nil,
    card_details: nil,
    delayed_capture: nil,
    description: nil,
    email: nil,
    external_id: nil,
    external_metadata: nil,
    gateway_transaction_id: nil,
    reference: nil,
    return_url: nil,
    status: nil,
    wallet: nil
  }

  def fixture(:payment) do
    {:ok, payment} = Payments.create_payment(@create_attrs)
    payment
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all payments", %{conn: conn} do
      conn = get(conn, Routes.payment_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create payment" do
    test "renders payment when data is valid", %{conn: conn} do
      conn = post(conn, Routes.payment_path(conn, :create), payment: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.payment_path(conn, :show, id))

      assert %{
               "id" => id,
               "amount" => 42,
               "auth_3ds_details" => %{},
               "card_details" => %{},
               "delayed_capture" => true,
               "description" => "some description",
               "email" => "some email",
               "external_id" => "7488a646-e31f-11e4-aace-600308960662",
               "external_metadata" => %{},
               "gateway_transaction_id" => "some gateway_transaction_id",
               "reference" => "some reference",
               "return_url" => "some return_url",
               "status" => "some status",
               "wallet" => "some wallet"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.payment_path(conn, :create), payment: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update payment" do
    setup [:create_payment]

    test "renders payment when data is valid", %{conn: conn, payment: %Payment{id: id} = payment} do
      conn = put(conn, Routes.payment_path(conn, :update, payment), payment: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.payment_path(conn, :show, id))

      assert %{
               "id" => id,
               "amount" => 43,
               "auth_3ds_details" => %{},
               "card_details" => %{},
               "delayed_capture" => false,
               "description" => "some updated description",
               "email" => "some updated email",
               "external_id" => "7488a646-e31f-11e4-aace-600308960662",
               "external_metadata" => %{},
               "gateway_transaction_id" => "some updated gateway_transaction_id",
               "reference" => "some updated reference",
               "return_url" => "some updated return_url",
               "status" => "some updated status",
               "wallet" => "some updated wallet"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, payment: payment} do
      conn = put(conn, Routes.payment_path(conn, :update, payment), payment: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete payment" do
    setup [:create_payment]

    test "deletes chosen payment", %{conn: conn, payment: payment} do
      conn = delete(conn, Routes.payment_path(conn, :delete, payment))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.payment_path(conn, :show, payment))
      end
    end
  end

  defp create_payment(_) do
    payment = fixture(:payment)
    {:ok, payment: payment}
  end
end
