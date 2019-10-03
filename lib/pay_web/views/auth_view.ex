defmodule PayWeb.AuthView do
  use PayWeb, :view
  alias PayWeb.UserView

  # TODO
  def render("check.json", %{user: user}) do
    %{
      data: %{
        is_authenticated: user && true,
        user: render_one(user, UserView, "user.json")
      }
    }
  end
end
