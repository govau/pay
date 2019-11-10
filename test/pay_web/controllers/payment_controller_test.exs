defmodule PayWeb.PaymentControllerTest do
  use PayWeb.ConnCase

  alias Pay.Payments
  alias Pay.Payments.GatewayAccount
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
    status: "created",
    wallet: "some wallet"
  }
  @update_attrs %{
    "ott" => "ott-ott-ott-ott"
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

  def fixture(:gateway_account) do
    {:ok, gateway_account} =
      Payments.create_gateway_account(%{
        "type" => Payments.GatewayAccount.type(:test),
        "payment_provider" => Payments.GatewayAccount.provider(:sandbox),
        "service_name" => "Test service",
        "credentials" => %{}
      })

    gateway_account
  end

  def fixture(:payment, gateway_account) do
    {:ok, payment} =
      Payments.create_payment(Map.merge(@create_attrs, %{gateway_account_id: gateway_account.id}))

    payment
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "prevent listing all payments", %{conn: conn} do
      assert_raise ArgumentError, fn ->
        get(conn, Routes.payments_payment_path(conn, :index))
      end
    end
  end

  describe "create payment" do
    setup [:create_gateway_account]

    test "renders payment when data is valid", %{
      conn: conn,
      gateway_account:
        %GatewayAccount{id: gateway_account_id, external_id: _gateway_account_external_id} =
          _gateway_account
    } do
      conn =
        post(conn, Routes.payments_payment_path(conn, :create),
          payment: Map.merge(@create_attrs, %{gateway_account_id: gateway_account_id})
        )

      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.payments_payment_path(conn, :show, id))

      assert %{
               "id" => id,
               "amount" => 42,
               "auth_3ds_details" => %{},
               "card_details" => %{},
               "delayed_capture" => true,
               "description" => "some description",
               "email" => "some email",
               "external_metadata" => %{},
               "gateway_account_id" => gateway_account_external_id,
               "gateway_transaction_id" => "some gateway_transaction_id",
               "reference" => "some reference",
               "return_url" => "some return_url",
               "status" => "created",
               "wallet" => "some wallet"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.payments_payment_path(conn, :create), payment: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update payment" do
    setup [:create_payment]

    test "renders payment when data is valid", %{
      conn: conn,
      payment: %Payment{external_id: id, status: starting_status} = payment
    } do
      conn =
        patch(conn, Routes.payments_payment_path(conn, :update, payment),
          payment: @update_attrs,
          transition: "submit_payment"
        )

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.payments_payment_path(conn, :show, id))
      updated_response = json_response(conn, 200)["data"]

      assert_raise MatchError, fn ->
        %{"status" => ^starting_status} = updated_response
      end
    end

    test "crashes when transition is invalid", %{conn: conn, payment: payment} do
      assert_raise FunctionClauseError, fn ->
        patch(conn, Routes.payments_payment_path(conn, :update, payment),
          payment: @update_attrs,
          transition: "wrong"
        )
      end
    end
  end

  describe "delete payment" do
    setup [:create_payment]

    test "refuse to delete chosen payment", %{conn: conn, payment: payment} do
      assert_raise ArgumentError, fn ->
        delete(conn, Routes.payments_payment_path(conn, :delete, payment))
      end

      get(conn, Routes.payments_payment_path(conn, :show, payment))
    end
  end

  defp create_gateway_account(_) do
    gateway_account = fixture(:gateway_account)
    {:ok, gateway_account: gateway_account}
  end

  defp create_payment(_) do
    gateway_account = fixture(:gateway_account)
    payment = fixture(:payment, gateway_account)
    {:ok, payment: payment}
  end
end
