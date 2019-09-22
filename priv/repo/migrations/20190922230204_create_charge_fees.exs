defmodule Pay.Repo.Migrations.CreateChargeFees do
  use Ecto.Migration

  def change do
    create table(:charge_fees) do
      add :external_id, :uuid
      add :amount_due, :integer
      add :amount_collected, :integer
      add :collected_at, :utc_datetime_usec
      add :gateway_transaction_id, :string
      add :charge_id, references(:charges, on_delete: :nothing)

      timestamps()
    end

    create index(:charge_fees, [:charge_id])
  end
end
