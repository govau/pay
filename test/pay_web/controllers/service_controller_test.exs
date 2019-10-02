defmodule PayWeb.ServiceControllerTest do
  use PayWeb.ConnCase

  alias Pay.Services
  alias Pay.Services.Service

  @create_attrs %{
    collect_billing_address: true,
    current_go_live_stage: "some current_go_live_stage",
    custom_branding: %{},
    external_id: "7488a646-e31f-11e4-aace-600308960662",
    merchant_address_city: "some merchant_address_city",
    merchant_address_country: "some merchant_address_country",
    merchant_address_line1: "some merchant_address_line1",
    merchant_address_line2: "some merchant_address_line2",
    merchant_address_postcode: "some merchant_address_postcode",
    merchant_email: "some merchant_email",
    merchant_name: "some merchant_name",
    merchant_telephone_number: "some merchant_telephone_number",
    name: "some name",
    redirect_to_service_immediately_on_terminal_state: true
  }
  @update_attrs %{
    collect_billing_address: false,
    current_go_live_stage: "some updated current_go_live_stage",
    custom_branding: %{},
    external_id: "7488a646-e31f-11e4-aace-600308960668",
    merchant_address_city: "some updated merchant_address_city",
    merchant_address_country: "some updated merchant_address_country",
    merchant_address_line1: "some updated merchant_address_line1",
    merchant_address_line2: "some updated merchant_address_line2",
    merchant_address_postcode: "some updated merchant_address_postcode",
    merchant_email: "some updated merchant_email",
    merchant_name: "some updated merchant_name",
    merchant_telephone_number: "some updated merchant_telephone_number",
    name: "some updated name",
    redirect_to_service_immediately_on_terminal_state: false
  }
  @invalid_attrs %{
    collect_billing_address: nil,
    current_go_live_stage: nil,
    custom_branding: nil,
    external_id: nil,
    merchant_address_city: nil,
    merchant_address_country: nil,
    merchant_address_line1: nil,
    merchant_address_line2: nil,
    merchant_address_postcode: nil,
    merchant_email: nil,
    merchant_name: nil,
    merchant_telephone_number: nil,
    name: nil,
    redirect_to_service_immediately_on_terminal_state: nil
  }

  def fixture(:service) do
    {:ok, service} = Services.create_service(@create_attrs)
    service
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all services", %{conn: conn} do
      conn = get(conn, Routes.service_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create service" do
    test "renders service when data is valid", %{conn: conn} do
      conn = post(conn, Routes.service_path(conn, :create), service: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.service_path(conn, :show, id))

      assert %{
               "id" => id,
               "collect_billing_address" => true,
               "current_go_live_stage" => "some current_go_live_stage",
               "custom_branding" => %{},
               "merchant_address_city" => "some merchant_address_city",
               "merchant_address_country" => "some merchant_address_country",
               "merchant_address_line1" => "some merchant_address_line1",
               "merchant_address_line2" => "some merchant_address_line2",
               "merchant_address_postcode" => "some merchant_address_postcode",
               "merchant_email" => "some merchant_email",
               "merchant_name" => "some merchant_name",
               "merchant_telephone_number" => "some merchant_telephone_number",
               "name" => "some name",
               "redirect_to_service_immediately_on_terminal_state" => true
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.service_path(conn, :create), service: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update service" do
    setup [:create_service]

    test "renders service when data is valid", %{
      conn: conn,
      service: %Service{external_id: id} = service
    } do
      conn = put(conn, Routes.service_path(conn, :update, service), service: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.service_path(conn, :show, id))

      assert %{
               "id" => id,
               "collect_billing_address" => false,
               "current_go_live_stage" => "some updated current_go_live_stage",
               "custom_branding" => %{},
               "merchant_address_city" => "some updated merchant_address_city",
               "merchant_address_country" => "some updated merchant_address_country",
               "merchant_address_line1" => "some updated merchant_address_line1",
               "merchant_address_line2" => "some updated merchant_address_line2",
               "merchant_address_postcode" => "some updated merchant_address_postcode",
               "merchant_email" => "some updated merchant_email",
               "merchant_name" => "some updated merchant_name",
               "merchant_telephone_number" => "some updated merchant_telephone_number",
               "name" => "some updated name",
               "redirect_to_service_immediately_on_terminal_state" => false
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, service: service} do
      conn = put(conn, Routes.service_path(conn, :update, service), service: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete service" do
    setup [:create_service]

    test "deletes chosen service", %{conn: conn, service: service} do
      conn = delete(conn, Routes.service_path(conn, :delete, service))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.service_path(conn, :show, service))
      end
    end
  end

  defp create_service(_) do
    service = fixture(:service)
    {:ok, service: service}
  end
end
