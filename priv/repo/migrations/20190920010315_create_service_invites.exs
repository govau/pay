defmodule Pay.Repo.Migrations.CreateServiceInvites do
  use Ecto.Migration

  def change do
    create table(:service_invites) do
      add :email, :string
      add :expires_at, :utc_datetime_usec
      add :disabled, :boolean, default: false, null: false
      add :service_id, references(:services, on_delete: :nothing)
      add :role_id, references(:roles, on_delete: :nothing)
      add :sender_id, references(:users, on_delete: :nothing)

      timestamps(type: :utc_datetime_usec)
    end

    create index(:service_invites, [:service_id])
    create index(:service_invites, [:role_id])
    create index(:service_invites, [:sender_id])
  end
end
