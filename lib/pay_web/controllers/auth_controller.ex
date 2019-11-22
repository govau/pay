defmodule PayWeb.AuthController do
  use PayWeb, :controller

  action_fallback PayWeb.FallbackController

  # TODO: wip
  def check(conn, %{}) do
    render(conn, "check.json", user: conn.assigns[:current_user])
  end
end
