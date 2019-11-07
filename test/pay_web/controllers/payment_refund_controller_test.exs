defmodule PayWeb.PaymentControllerRefundTest do
  import Pay.Fixtures
  use PayWeb.ConnCase

  defp create_payment(_) do
    gateway_account = fixture(:gateway_account)
    payment = fixture(:payment, gateway_account)
    [gateway_account: gateway_account, payment: payment]
  end

  defp create_user(_) do
    user = fixture(:user)
    [user: user]
  end

  defp create_payment_refund(%{payment: payment, user: user}) do
    [payment_refund: fixture(:payment_refund, %{payment: payment, user: user})]
  end

  defp new_conn(user) do
    build_conn()
    |> assign(:current_user, user)
    |> put_req_header("accept", "application/json")
  end

  setup [:create_user, :create_payment, :create_payment_refund]

  setup %{user: user} do
    {:ok, conn: new_conn(user)}
  end

  describe "submit a refund" do
    test "create refund submits a payment refund", %{conn: conn, payment: payment} do
      conn =
        post(conn, Routes.payments_payment_payment_refund_path(conn, :create, payment),
          payment_refund: %{"amount" => 200, "reference" => "abcd"}
        )

      assert %{
               "amount" => 200,
               "reference" => "abcd",
               "status" => "created"
             } = json_response(conn, 201)["data"]
    end

    test "submitted refund belongs to a payment", %{user: user, payment: payment} do
      # get the fixture refund
      conn = new_conn(user)
      conn = get(conn, Routes.payments_payment_payment_refund_path(conn, :index, payment))
      assert [existing_refund] = json_response(conn, 200)["data"]

      # create the new refund
      conn = new_conn(user)

      conn =
        post(conn, Routes.payments_payment_payment_refund_path(conn, :create, payment),
          payment_refund: %{"amount" => 205, "reference" => "a very unique reference"}
        )

      refund_response = json_response(conn, 201)["data"]
      assert %{"reference" => "a very unique reference"} = refund_response

      # make sure that both refunds exist under the payment
      conn = new_conn(user)
      conn = get(conn, Routes.payments_payment_payment_refund_path(conn, :index, payment))
      response = json_response(conn, 200)["data"]
      assert [^refund_response, ^existing_refund] = response
    end
  end
end
