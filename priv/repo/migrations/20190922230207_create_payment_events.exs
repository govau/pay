defmodule Pay.Repo.Migrations.CreatePaymentEvents do
  use Ecto.Migration

  def change do
    create table(:payment_events) do
      add :status, :string
      add :payment_id, references(:payments, on_delete: :nothing)

      timestamps(type: :utc_datetime_usec)
    end

    create index(:payment_events, [:payment_id])
  end
end
