defmodule Pay.Repo.Migrations.CreateOrganisationDomains do
  use Ecto.Migration

  def change do
    create table(:organisation_domains) do
      add :domain, :string
      add :organisation_id, references(:organisations, on_delete: :nothing)

      timestamps(type: :utc_datetime_usec)
    end

    create unique_index(:organisation_domains, [:domain])
    create index(:organisation_domains, [:organisation_id])
  end
end
