defmodule PayWeb.AuthController do
  use PayWeb, :controller

  alias Pay.Services

  action_fallback PayWeb.FallbackController

  # TODO: wip
  def check(conn, %{}) do
    users = Services.list_users()

    render(conn, "check.json", user: List.first(users))
  end
end
