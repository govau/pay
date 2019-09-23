defmodule PayWeb.ServiceUserView do
  use PayWeb, :view
  alias PayWeb.ServiceUserView

  def render("index.json", %{service_users: service_users}) do
    %{data: render_many(service_users, ServiceUserView, "service_user.json")}
  end

  def render("show.json", %{service_user: service_user}) do
    %{data: render_one(service_user, ServiceUserView, "service_user.json")}
  end

  def render("service_user.json", %{service_user: service_user}) do
    %{id: service_user.id}
  end
end
