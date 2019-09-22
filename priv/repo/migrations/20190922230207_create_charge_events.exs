defmodule Pay.Repo.Migrations.CreateChargeEvents do
  use Ecto.Migration

  def change do
    create table(:charge_events) do
      add :status, :string
      add :charge_id, references(:charges, on_delete: :nothing)

      timestamps()
    end

    create index(:charge_events, [:charge_id])
  end
end
