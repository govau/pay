defmodule PayWeb.ServiceUserView do
  use PayWeb, :view
  alias PayWeb.ServiceUserView

  def render("index.json", %{service_users: service_users}) do
    %{data: render_many(service_users, ServiceUserView, "service_user.json")}
  end

  def render("show.json", %{service_user: service_user}) do
    %{data: render_one(service_user, ServiceUserView, "service_user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.external_id,
      name: user.name,
      email: user.email
    }
  end

  def render("role.json", %{role: role}) do
    %{
      id: role.id,
      name: role.name,
      description: role.description
    }
  end

  def render("service_user.json", %{service_user: service_user}) do
    %{
      user: render_one(service_user.user, ServiceUserView, "user.json", as: :user),
      role: render_one(service_user.role, ServiceUserView, "role.json", as: :role)
    }
  end
end
