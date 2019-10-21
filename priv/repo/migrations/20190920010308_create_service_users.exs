defmodule Pay.Repo.Migrations.CreateServiceUsers do
  use Ecto.Migration

  def change do
    create table(:service_users) do
      add :service_id, references(:services, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)
      add :role_id, references(:roles, on_delete: :nothing)

      timestamps(type: :utc_datetime_usec)
    end

    create index(:service_users, [:service_id])
    create index(:service_users, [:user_id])
    create index(:service_users, [:role_id])
  end
end
