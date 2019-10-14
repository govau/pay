defmodule PayWeb.ServiceUserControllerTest do
  use PayWeb.ConnCase

  import Pay.Fixtures

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    setup [:create_service]

    test "lists all service_users", %{conn: conn, service: service} do
      conn = get(conn, Routes.services_service_service_user_path(conn, :index, service))
      assert json_response(conn, 200)["data"] == []
    end
  end

  defp create_service(_) do
    service = fixture(:service)
    {:ok, service: service}
  end
end
