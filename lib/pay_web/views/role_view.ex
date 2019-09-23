defmodule PayWeb.RoleView do
  use PayWeb, :view
  alias PayWeb.RoleView

  def render("index.json", %{roles: roles}) do
    %{data: render_many(roles, RoleView, "role.json")}
  end

  def render("show.json", %{role: role}) do
    %{data: render_one(role, RoleView, "role.json")}
  end

  def render("role.json", %{role: role}) do
    %{
      id: role.id,
      name: role.name,
      description: role.description,
      permissions: render_many(role.permissions, PayWeb.PermissionView, "permission.json")
    }
  end
end
