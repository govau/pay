defmodule PayWeb.OrganisationDomainView do
  use PayWeb, :view
  alias PayWeb.OrganisationDomainView

  def render("index.json", %{organisation_domains: organisation_domains}) do
    %{data: render_many(organisation_domains, OrganisationDomainView, "organisation_domain.json")}
  end

  def render("show.json", %{organisation_domain: organisation_domain}) do
    %{data: render_one(organisation_domain, OrganisationDomainView, "organisation_domain.json")}
  end

  def render("organisation_domain.json", %{organisation_domain: organisation_domain}) do
    %{id: organisation_domain.id, domain: organisation_domain.domain}
  end
end
