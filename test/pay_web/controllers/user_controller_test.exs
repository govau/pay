defmodule PayWeb.UserControllerTest do
  use PayWeb.ConnCase

  alias Pay.Services
  alias Pay.Services.User

  @create_attrs %{
    disabled: true,
    email: "some email",
    external_id: "7488a646-e31f-11e4-aace-600308960662",
    last_logged_in_at: "2010-04-17T14:00:00Z",
    telephone_number: "some telephone_number"
  }
  @update_attrs %{
    disabled: false,
    email: "some updated email",
    external_id: "7488a646-e31f-11e4-aace-600308960668",
    last_logged_in_at: "2011-05-18T15:01:01Z",
    telephone_number: "some updated telephone_number"
  }
  @invalid_attrs %{
    disabled: nil,
    email: nil,
    external_id: nil,
    last_logged_in_at: nil,
    telephone_number: nil
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
               "email" => "some email",
               "external_id" => "7488a646-e31f-11e4-aace-600308960662",
               "last_logged_in_at" => "2010-04-17T14:00:00Z",
               "telephone_number" => "some telephone_number"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.user_path(conn, :create), user: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update user" do
    setup [:create_user]

    test "renders user when data is valid", %{conn: conn, user: %User{id: id} = user} do
      conn = put(conn, Routes.user_path(conn, :update, user), user: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.user_path(conn, :show, id))

      assert %{
               "id" => id,
               "disabled" => false,
               "email" => "some updated email",
               "external_id" => "7488a646-e31f-11e4-aace-600308960668",
               "last_logged_in_at" => "2011-05-18T15:01:01Z",
               "telephone_number" => "some updated telephone_number"
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
