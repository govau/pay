defmodule PayWeb.PaymentEventControllerTest do
  use PayWeb.ConnCase

  import Pay.Fixtures

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    setup [:create_payment]

    test "lists all payment_events", %{conn: conn, payment: payment} do
      conn = get(conn, Routes.payments_payment_payment_event_path(conn, :index, payment))
      assert json_response(conn, 200)["data"] == []
    end
  end

  defp create_payment(_) do
    payment = fixture(:payment)
    {:ok, payment: payment}
  end
end
