defmodule PayWeb.ChargeControllerTest do
  use PayWeb.ConnCase

  alias Pay.Charges
  alias Pay.Charges.Charge

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

  def fixture(:charge) do
    {:ok, charge} = Charges.create_charge(@create_attrs)
    charge
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all charges", %{conn: conn} do
      conn = get(conn, Routes.charge_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create charge" do
    test "renders charge when data is valid", %{conn: conn} do
      conn = post(conn, Routes.charge_path(conn, :create), charge: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.charge_path(conn, :show, id))

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
      conn = post(conn, Routes.charge_path(conn, :create), charge: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update charge" do
    setup [:create_charge]

    test "renders charge when data is valid", %{conn: conn, charge: %Charge{id: id} = charge} do
      conn = put(conn, Routes.charge_path(conn, :update, charge), charge: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.charge_path(conn, :show, id))

      assert %{
               "id" => id,
               "amount" => 43,
               "auth_3ds_details" => {},
               "card_details" => {},
               "delayed_capture" => false,
               "description" => "some updated description",
               "email" => "some updated email",
               "external_id" => "7488a646-e31f-11e4-aace-600308960668",
               "external_metadata" => {},
               "gateway_transaction_id" => "some updated gateway_transaction_id",
               "reference" => "some updated reference",
               "return_url" => "some updated return_url",
               "status" => "some updated status",
               "wallet" => "some updated wallet"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, charge: charge} do
      conn = put(conn, Routes.charge_path(conn, :update, charge), charge: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete charge" do
    setup [:create_charge]

    test "deletes chosen charge", %{conn: conn, charge: charge} do
      conn = delete(conn, Routes.charge_path(conn, :delete, charge))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.charge_path(conn, :show, charge))
      end
    end
  end

  defp create_charge(_) do
    charge = fixture(:charge)
    {:ok, charge: charge}
  end
end
