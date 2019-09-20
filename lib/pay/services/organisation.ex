defmodule Pay.Services.Organisation do
  use Ecto.Schema
  import Ecto.Changeset

  schema "organisations" do
    field :external_id, Ecto.UUID
    field :name, :string

    belongs_to :type, Pay.Services.OrganisationType

    timestamps()
  end

  @doc false
  def changeset(organisation, attrs) do
    organisation
    |> cast(attrs, [:external_id, :name])
    |> validate_required([:external_id, :name])
    |> unique_constraint(:name)
  end
end
