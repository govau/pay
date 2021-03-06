defmodule Pay.Repo.Migrations.CreateProductPayments do
  use Ecto.Migration

  def change do
    create table(:product_payments) do
      add :external_id, :uuid
      add :payment_id, :string
      add :next_url, :string
      add :amount, :integer
      add :status, :string
      add :gateway_account_id, :string
      add :reference, :string
      add :product_id, references(:products, on_delete: :nothing)

      timestamps(type: :utc_datetime_usec)
    end

    create index(:product_payments, [:product_id])
  end
end
