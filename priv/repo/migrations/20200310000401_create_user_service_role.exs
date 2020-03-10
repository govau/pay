defmodule Pay.Repo.Migrations.CreateUserServiceRole do
  use Ecto.Migration

  def change do
    create table(:user_service_roles) do
      add :user_id, references(:users, on_delete: :delete_all)
      add :service_id, references(:services, on_delete: :delete_all)
      add :role_id, references(:roles, on_delete: :delete_all)

      timestamps(type: :utc_datetime_usec)
    end

    create unique_index(:user_service_roles, [:user_id, :service_id])
  end
end
