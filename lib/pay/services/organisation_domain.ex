defmodule Pay.Services.OrganisationDomain do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "organisation_domains" do
    field :domain, :string

    belongs_to :organisation, Pay.Services.Organisation

    timestamps()
  end

  @doc false
  def changeset(organisation_domain, attrs) do
    organisation_domain
    |> cast(attrs, [:domain])
    |> validate_required([:domain])
    |> unique_constraint(:domain)
  end
end
