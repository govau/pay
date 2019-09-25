defmodule Pay.Repo.Migrations.CreatePaymentFees do
  use Ecto.Migration

  def change do
    create table(:payment_fees) do
      add :external_id, :uuid
      add :amount_due, :integer
      add :amount_collected, :integer
      add :collected_at, :utc_datetime_usec
      add :gateway_transaction_id, :string
      add :payment_id, references(:payments, on_delete: :nothing)

      timestamps()
    end

    create index(:payment_fees, [:payment_id])
  end
end
