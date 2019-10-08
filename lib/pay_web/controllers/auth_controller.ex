defmodule PayWeb.AuthController do
  use PayWeb, :controller

  alias Pay.Services

  action_fallback PayWeb.FallbackController

  # TODO: wip
  def check(conn, %{}) do
    users = Services.list_users()
    # user = Enum.at(users, 4)
    user = users |> Enum.filter(fn u -> u.platform_admin == true end) |> List.first()

    # render(conn, "check.json", user: List.first(users))
    render(conn, "check.json", user: user)
  end
end
