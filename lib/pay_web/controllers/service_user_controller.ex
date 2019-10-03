defmodule PayWeb.ServiceUserController do
  use PayWeb, :controller

  alias Pay.Services

  action_fallback PayWeb.FallbackController

  def index(conn, %{"service_id" => service_id}) do
    service_users = Services.list_service_users_by_service_external_id(service_id)
    render(conn, "index.json", service_users: service_users)
  end
end
