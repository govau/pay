defmodule Pay.Repo.Migrations.CreateOrganisations do
  use Ecto.Migration

  def change do
    create table(:organisations) do
      add :external_id, :uuid
      add :name, :string
      add :type_id, references(:organisation_types, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:organisations, [:name])
    create index(:organisations, [:type_id])
  end
end
