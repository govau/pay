defmodule PayWeb.UserControllerTest do
  use PayWeb.ConnCase

  alias Pay.Services
  alias Pay.Services.User

  @create_attrs %{
    disabled: true,
    email: "some email",
    external_id: "7488a646-e31f-11e4-aace-600308960662",
    last_logged_in_at: "2010-04-17T14:00:00.000000Z",
    telephone_number: "some telephone_number",
    name: "some name"
  }
  @update_attrs %{
    disabled: false,
    email: "some updated email",
    external_id: "7488a646-e31f-11e4-aace-600308960660",
    last_logged_in_at: "2011-05-18T15:01:01.000000Z",
    telephone_number: "some updated telephone_number",
    name: "some updated name"
  }
  @invalid_attrs %{
    disabled: nil,
    email: nil,
    external_id: nil,
    last_logged_in_at: nil,
    telephone_number: nil,
    name: nil
  }

  def fixture(:user) do
    {:ok, user} = Services.create_user(@create_attrs)
    user
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all users", %{conn: conn} do
      conn = get(conn, Routes.user_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create user" do
    test "renders user when data is valid", %{conn: conn} do
      conn = post(conn, Routes.user_path(conn, :create), user: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.user_path(conn, :show, id))

      assert %{
               "id" => id,
               "disabled" => true,
               "platform_admin" => false,
               "email" => "some email",
               "last_logged_in_at" => "2010-04-17T14:00:00.000000Z",
               "telephone_number" => "some telephone_number",
               "name" => "some name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.user_path(conn, :create), user: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update user" do
    setup [:create_user]

    test "renders user when data is valid", %{conn: conn, user: %User{external_id: id} = user} do
      conn = put(conn, Routes.user_path(conn, :update, user), user: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.user_path(conn, :show, id))

      assert %{
               "id" => id,
               "disabled" => false,
               "platform_admin" => false,
               "email" => "some updated email",
               "last_logged_in_at" => "2011-05-18T15:01:01.000000Z",
               "telephone_number" => "some updated telephone_number",
               "name" => "some updated name"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, user: user} do
      conn = put(conn, Routes.user_path(conn, :update, user), user: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete user" do
    setup [:create_user]

    test "deletes chosen user", %{conn: conn, user: user} do
      conn = delete(conn, Routes.user_path(conn, :delete, user))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.user_path(conn, :show, user))
      end
    end
  end

  defp create_user(_) do
    user = fixture(:user)
    {:ok, user: user}
  end
end
