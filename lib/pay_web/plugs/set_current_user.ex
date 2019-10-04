defmodule PayWeb.Plugs.SetCurrentUser do
  import Plug.Conn

  alias Pay.Repo
  alias Pay.Services
  alias Pay.Services.User

  def init(_params) do
  end

  def call(conn, _params) do
    if conn.assigns[:current_user] do
      conn
    else
      # TODO: get user from session or wherever and tmp_user.id becomes user_id
      # user_id = Plug.Conn.get_session(conn, :current_user_id)
      users = Services.list_users()
      # tmp_user = Enum.at(users, 4)
      tmp_user = users |> Enum.filter(fn u -> u.platform_admin == true end) |> List.first()

      cond do
        current_user = tmp_user && tmp_user.id && Repo.get(User, tmp_user.id) ->
          conn
          |> assign(:current_user, current_user)

        true ->
          conn
          |> assign(:current_user, nil)
      end
    end
  end
end
