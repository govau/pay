defmodule PayWeb.RolePermissionView do
  use PayWeb, :view
  alias PayWeb.RolePermissionView

  def render("index.json", %{role_permissions: role_permissions}) do
    %{data: render_many(role_permissions, RolePermissionView, "role_permission.json")}
  end

  def render("show.json", %{role_permission: role_permission}) do
    %{data: render_one(role_permission, RolePermissionView, "role_permission.json")}
  end

  def render("role_permission.json", %{role_permission: role_permission}) do
    %{id: role_permission.id}
  end
end
