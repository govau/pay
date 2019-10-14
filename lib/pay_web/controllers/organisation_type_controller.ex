defmodule PayWeb.OrganisationTypeController do
  use PayWeb, :controller

  alias Pay.Services
  alias Pay.Services.OrganisationType

  action_fallback PayWeb.FallbackController

  def index(conn, _params) do
    organisation_types = Services.list_organisation_types()
    render(conn, "index.json", organisation_types: organisation_types)
  end

  def create(conn, %{"organisation_type" => organisation_type_params}) do
    with {:ok, %OrganisationType{} = organisation_type} <-
           Services.create_organisation_type(organisation_type_params) do
      conn
      |> put_status(:created)
      |> put_resp_header(
        "location",
        Routes.services_organisation_type_path(conn, :show, organisation_type)
      )
      |> render("show.json", organisation_type: organisation_type)
    end
  end

  def show(conn, %{"id" => id}) do
    organisation_type = Services.get_organisation_type!(id)
    render(conn, "show.json", organisation_type: organisation_type)
  end

  def update(conn, %{"id" => id, "organisation_type" => organisation_type_params}) do
    organisation_type = Services.get_organisation_type!(id)

    with {:ok, %OrganisationType{} = organisation_type} <-
           Services.update_organisation_type(organisation_type, organisation_type_params) do
      render(conn, "show.json", organisation_type: organisation_type)
    end
  end

  def delete(conn, %{"id" => id}) do
    organisation_type = Services.get_organisation_type!(id)

    with {:ok, %OrganisationType{}} <- Services.delete_organisation_type(organisation_type) do
      send_resp(conn, :no_content, "")
    end
  end
end
