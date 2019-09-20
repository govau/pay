defmodule PayWeb.OrganisationController do
  use PayWeb, :controller

  alias Pay.Services
  alias Pay.Services.Organisation

  action_fallback PayWeb.FallbackController

  def index(conn, _params) do
    organisations = Services.list_organisations()
    render(conn, "index.json", organisations: organisations)
  end

  def create(conn, %{"organisation" => organisation_params}) do
    with {:ok, %Organisation{} = organisation} <-
           Services.create_organisation(organisation_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.organisation_path(conn, :show, organisation))
      |> render("show.json", organisation: organisation)
    end
  end

  def show(conn, %{"id" => id}) do
    organisation = Services.get_organisation!(id)
    render(conn, "show.json", organisation: organisation)
  end

  def update(conn, %{"id" => id, "organisation" => organisation_params}) do
    organisation = Services.get_organisation!(id)

    with {:ok, %Organisation{} = organisation} <-
           Services.update_organisation(organisation, organisation_params) do
      render(conn, "show.json", organisation: organisation)
    end
  end

  def delete(conn, %{"id" => id}) do
    organisation = Services.get_organisation!(id)

    with {:ok, %Organisation{}} <- Services.delete_organisation(organisation) do
      send_resp(conn, :no_content, "")
    end
  end
end
