defmodule Pay.Services.OrganisationType do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, only: [:id, :name]}
  schema "organisation_types" do
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(organisation_type, attrs) do
    organisation_type
    |> cast(attrs, [:name])
    |> validate_required([:name])
  end
end
