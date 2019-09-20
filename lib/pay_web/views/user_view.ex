defmodule PayWeb.UserView do
  use PayWeb, :view
  alias PayWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      external_id: user.external_id,
      email: user.email,
      telephone_number: user.telephone_number,
      disabled: user.disabled,
      last_logged_in_at: user.last_logged_in_at
    }
  end
end