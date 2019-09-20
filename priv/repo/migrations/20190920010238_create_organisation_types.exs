defmodule Pay.Repo.Migrations.CreateOrganisationTypes do
  use Ecto.Migration

  def change do
    create table(:organisation_types) do
      add :name, :string

      timestamps()
    end
  end
end
