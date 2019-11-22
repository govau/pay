defmodule PayWeb.Plugs.SetCurrentUser do
  import Plug.Conn

  alias Pay.Repo
  alias Pay.Services.User

  def init(_params) do
  end

  def call(conn, _params) do
    if conn.assigns[:current_user] do
      conn
    else
      # TODO: get user from session or wherever
      user_id = get_req_header(conn, "authorization") |> List.first()
      # user_id = Plug.Conn.get_session(conn, :current_user_id)

      cond do
        current_user = user_id != nil && user_id != "" && Repo.get_by(User, external_id: user_id) ->
          conn
          |> assign(:current_user, current_user)

        true ->
          conn
          |> assign(:current_user, nil)
      end
    end
  end
end
