defmodule Pay.Repo.Migrations.CreateServiceUsers do
  use Ecto.Migration

  def change do
    create table(:service_users) do
      add :service_id, references(:services, on_delete: :delete_all)
      add :user_id, references(:users, on_delete: :delete_all)
      add :role_id, references(:roles, on_delete: :delete_all)

      timestamps(type: :utc_datetime_usec)
    end

    create unique_index(:service_users, [:user_id, :service_id])
    create index(:service_users, [:service_id])
    create index(:service_users, [:user_id])
  end
end
