defmodule Pay.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :external_id, :uuid
      add :email, :string
      add :telephone_number, :string
      add :disabled, :boolean, default: false, null: false
      add :last_logged_in_at, :utc_datetime

      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
