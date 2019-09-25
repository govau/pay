defmodule PayWeb.OrganisationTypeControllerTest do
  use PayWeb.ConnCase

  alias Pay.Services
  alias Pay.Services.OrganisationType

  @create_attrs %{
    name: "some name"
  }
  @update_attrs %{
    name: "some updated name"
  }
  @invalid_attrs %{name: nil}

  def fixture(:organisation_type) do
    {:ok, organisation_type} = Services.create_organisation_type(@create_attrs)
    organisation_type
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all organisation_types", %{conn: conn} do
      conn = get(conn, Routes.organisation_type_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create organisation_type" do
    test "renders organisation_type when data is valid", %{conn: conn} do
      conn =
        post(conn, Routes.organisation_type_path(conn, :create), organisation_type: @create_attrs)

      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.organisation_type_path(conn, :show, id))

      assert %{
               "id" => id,
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn =
        post(conn, Routes.organisation_type_path(conn, :create), organisation_type: @invalid_attrs)

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update organisation_type" do
    setup [:create_organisation_type]

    test "renders organisation_type when data is valid", %{
      conn: conn,
      organisation_type: %OrganisationType{id: id} = organisation_type
    } do
      conn =
        put(conn, Routes.organisation_type_path(conn, :update, organisation_type),
          organisation_type: @update_attrs
        )

      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.organisation_type_path(conn, :show, id))

      assert %{
               "id" => id,
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{
      conn: conn,
      organisation_type: organisation_type
    } do
      conn =
        put(conn, Routes.organisation_type_path(conn, :update, organisation_type),
          organisation_type: @invalid_attrs
        )

      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete organisation_type" do
    setup [:create_organisation_type]

    test "deletes chosen organisation_type", %{conn: conn, organisation_type: organisation_type} do
      conn = delete(conn, Routes.organisation_type_path(conn, :delete, organisation_type))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.organisation_type_path(conn, :show, organisation_type))
      end
    end
  end

  defp create_organisation_type(_) do
    organisation_type = fixture(:organisation_type)
    {:ok, organisation_type: organisation_type}
  end
end
