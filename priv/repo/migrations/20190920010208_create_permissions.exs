defmodule Pay.Repo.Migrations.CreatePermissions do
  use Ecto.Migration

  def change do
    create table(:permissions) do
      add :name, :string
      add :description, :string

      timestamps(type: :utc_datetime_usec)
    end
  end
end
