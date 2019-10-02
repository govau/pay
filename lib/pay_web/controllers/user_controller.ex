defmodule PayWeb.UserController do
  use PayWeb, :controller

  alias Pay.Services
  alias Pay.Services.User

  action_fallback PayWeb.FallbackController

  def index(conn, _params) do
    users = Services.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Services.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Services.get_user_by_external_id!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Services.get_user_by_external_id!(id)

    with {:ok, %User{} = user} <- Services.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Services.get_user_by_external_id!(id)

    with {:ok, %User{}} <- Services.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
