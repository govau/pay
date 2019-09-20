defmodule PayWeb.ServiceController do
  use PayWeb, :controller

  alias Pay.Services
  alias Pay.Services.Service

  action_fallback PayWeb.FallbackController

  def index(conn, _params) do
    services = Services.list_services()
    render(conn, "index.json", services: services)
  end

  def create(conn, %{"service" => service_params}) do
    with {:ok, %Service{} = service} <- Services.create_service(service_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.service_path(conn, :show, service))
      |> render("show.json", service: service)
    end
  end

  def show(conn, %{"id" => id}) do
    service = Services.get_service!(id)
    render(conn, "show.json", service: service)
  end

  def update(conn, %{"id" => id, "service" => service_params}) do
    service = Services.get_service!(id)

    with {:ok, %Service{} = service} <- Services.update_service(service, service_params) do
      render(conn, "show.json", service: service)
    end
  end

  def delete(conn, %{"id" => id}) do
    service = Services.get_service!(id)

    with {:ok, %Service{}} <- Services.delete_service(service) do
      send_resp(conn, :no_content, "")
    end
  end
end
