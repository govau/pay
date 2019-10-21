defmodule Pay.Repo.Migrations.CreatePaymentRefunds do
  use Ecto.Migration

  def change do
    create table(:payment_refunds) do
      add :external_id, :uuid
      add :reference, :string
      add :amount, :integer
      add :status, :string
      add :user_external_id, :uuid
      add :gateway_transaction_id, :uuid
      add :payment_id, references(:payments, on_delete: :nothing)

      timestamps(type: :utc_datetime_usec)
    end

    create index(:payment_refunds, [:payment_id])
  end
end
