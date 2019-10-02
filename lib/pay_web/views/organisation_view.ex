defmodule PayWeb.OrganisationView do
  use PayWeb, :view
  alias PayWeb.OrganisationView

  def render("index.json", %{organisations: organisations}) do
    %{data: render_many(organisations, OrganisationView, "organisation.json")}
  end

  def render("show.json", %{organisation: organisation}) do
    %{data: render_one(organisation, OrganisationView, "organisation.json")}
  end

  def render("organisation.json", %{organisation: organisation}) do
    %{
      id: organisation.external_id,
      name: organisation.name,
      type: organisation.type
    }
  end
end
