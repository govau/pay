defmodule Pay.Repo.Migrations.CreateCardTypes do
  use Ecto.Migration

  def change do
    create table(:card_types) do
      add :type, :string
      add :brand, :string
      add :label, :string
      add :requires_3ds, :boolean, default: false, null: false

      timestamps()
    end
  end
end
