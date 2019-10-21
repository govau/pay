defmodule Pay.Repo.Migrations.CreateRoles do
  use Ecto.Migration

  def change do
    create table(:roles) do
      add :name, :string
      add :description, :string

      timestamps(type: :utc_datetime_usec)
    end
  end
end
