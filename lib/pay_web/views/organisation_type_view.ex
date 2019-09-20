defmodule PayWeb.OrganisationTypeView do
  use PayWeb, :view
  alias PayWeb.OrganisationTypeView

  def render("index.json", %{organisation_types: organisation_types}) do
    %{data: render_many(organisation_types, OrganisationTypeView, "organisation_type.json")}
  end

  def render("show.json", %{organisation_type: organisation_type}) do
    %{data: render_one(organisation_type, OrganisationTypeView, "organisation_type.json")}
  end

  def render("organisation_type.json", %{organisation_type: organisation_type}) do
    %{id: organisation_type.id, name: organisation_type.name}
  end
end
