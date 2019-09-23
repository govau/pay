defmodule PayWeb.GatewayAccountControllerTest do
  use PayWeb.ConnCase

  alias Pay.Charges
  alias Pay.Charges.GatewayAccount

  @create_attrs %{
    allow_apple_pay: true,
    allow_google_pay: true,
    allow_zero_amount: 42,
    corporate_credit_card_surcharge_amount: 42,
    corporate_debit_card_surcharge_amount: 42,
    corporate_prepaid_credit_card_surcharge_amount: 42,
    corporate_prepaid_debit_card_surcharge_amount: 42,
    credentials: %{},
    description: "some description",
    integration_version_3ds: 42,
    name: "some name",
    requires_3ds: true,
    service_name: "some service_name",
    type: "some type"
  }
  @update_attrs %{
    allow_apple_pay: false,
    allow_google_pay: false,
    allow_zero_amount: 43,
    corporate_credit_card_surcharge_amount: 43,
    corporate_debit_card_surcharge_amount: 43,
    corporate_prepaid_credit_card_surcharge_amount: 43,
    corporate_prepaid_debit_card_surcharge_amount: 43,
    credentials: %{},
    description: "some updated description",
    integration_version_3ds: 43,
    name: "some updated name",
    requires_3ds: false,
    service_name: "some updated service_name",
    type: "some updated type"
  }
  @invalid_attrs %{
    allow_apple_pay: nil,
    allow_google_pay: nil,
    allow_zero_amount: nil,
    corporate_credit_card_surcharge_amount: nil,
    corporate_debit_card_surcharge_amount: nil,
    corporate_prepaid_credit_card_surcharge_amount: nil,
    corporate_prepaid_debit_card_surcharge_amount: nil,
    credentials: nil,
    description: nil,
    integration_version_3ds: nil,
    name: nil,
    requires_3ds: nil,
    service_name: nil,
    type: nil
  }

  def fixture(:gateway_account) do
    {:ok, gateway_account} = Charges.create_gateway_account(@create_attrs)
    gateway_account
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all gateway_accounts", %{conn: conn} do
      conn = get(conn, Routes.gateway_account_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create gateway_account" do
    test "renders gateway_account when data is valid", %{conn: conn} do
      conn =
        post(conn, Routes.gateway_account_path(conn, :create), gateway_account: @create_attrs)

      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.gateway_account_path(conn, :show, id))

      assert %{
               "id" => id,
               "allow_apple_pay" => true,
               "allow_google_pay" => true,
               "allow_zero_amount" => 42,
               "corporate_credit_card_surcharge_amount" => 42,
               "corporate_debit_card_surcharge_amount" => 42,
               "corporate_prepaid_credit_card_surcharge_amount" => 42,
               "corporate_prepaid_debit_card_surcharge_amount" => 42,
               "credentials" => %{},
               "description" => "some description",
               "integration_version_3ds" => 42,
               "name" => "some name",
               "requires_3ds" => true,
               "service_name" => "some service_name",
               "type" => "some type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn =
        post(conn, Routes.gateway_account_path(conn, :create), gateway_account: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update gateway_account" do
    setup [:create_gateway_account]

    test "renders gateway_account when data is valid", %{
      conn: conn,
      gateway_account: %GatewayAccount{id: id} = gateway_account
    } do
      conn =
        put(conn, Routes.gateway_account_path(conn, :update, gateway_account),
          gateway_account: @update_attrs
        )

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.gateway_account_path(conn, :show, id))

      assert %{
               "id" => id,
               "allow_apple_pay" => false,
               "allow_google_pay" => false,
               "allow_zero_amount" => 43,
               "corporate_credit_card_surcharge_amount" => 43,
               "corporate_debit_card_surcharge_amount" => 43,
               "corporate_prepaid_credit_card_surcharge_amount" => 43,
               "corporate_prepaid_debit_card_surcharge_amount" => 43,
               "credentials" => %{},
               "description" => "some updated description",
               "integration_version_3ds" => 43,
               "name" => "some updated name",
               "requires_3ds" => false,
               "service_name" => "some updated service_name",
               "type" => "some updated type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, gateway_account: gateway_account} do
      conn =
        put(conn, Routes.gateway_account_path(conn, :update, gateway_account),
          gateway_account: @invalid_attrs
        )

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete gateway_account" do
    setup [:create_gateway_account]

    test "deletes chosen gateway_account", %{conn: conn, gateway_account: gateway_account} do
      conn = delete(conn, Routes.gateway_account_path(conn, :delete, gateway_account))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.gateway_account_path(conn, :show, gateway_account))
      end
    end
  end

  defp create_gateway_account(_) do
    gateway_account = fixture(:gateway_account)
    {:ok, gateway_account: gateway_account}
  end
end
