defmodule Pay.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :external_id, :uuid, null: false
      add :email, :string, null: false
      add :telephone_number, :string
      add :name, :string, null: false
      add :platform_admin, :boolean, default: false, null: false
      add :disabled, :boolean, default: false, null: false
      add :last_logged_in_at, :utc_datetime_usec

      timestamps(type: :utc_datetime_usec)
    end

    create unique_index(:users, [:email])
  end
end
