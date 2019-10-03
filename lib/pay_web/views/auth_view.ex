defmodule PayWeb.AuthView do
  use PayWeb, :view
  alias PayWeb.UserView

  # TODO
  def render("check.json", %{user: user}) do
    is_authenticated = if user, do: true, else: false

    %{
      data: %{
        is_authenticated: is_authenticated,
        user: render_one(user, UserView, "user.json")
      }
    }
  end
end
