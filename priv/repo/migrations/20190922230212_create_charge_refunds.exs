defmodule Pay.Repo.Migrations.CreateChargeRefunds do
  use Ecto.Migration

  def change do
    create table(:charge_refunds) do
      add :external_id, :uuid
      add :reference, :string
      add :amount, :integer
      add :status, :string
      add :user_external_id, :uuid
      add :gateway_transaction_id, :uuid
      add :charge_id, references(:charges, on_delete: :nothing)

      timestamps()
    end

    create index(:charge_refunds, [:charge_id])
  end
end
