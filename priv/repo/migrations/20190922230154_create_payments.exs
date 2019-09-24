defmodule Pay.Repo.Migrations.CreatePayments do
  use Ecto.Migration

  def change do
    create table(:payments) do
      add :external_id, :uuid
      add :amount, :integer
      add :status, :string
      add :gateway_transaction_id, :string
      add :return_url, :string
      add :email, :string
      add :card_details, :map
      add :auth_3ds_details, :map
      add :description, :string
      add :reference, :string
      add :delayed_capture, :boolean, default: false, null: false
      add :wallet, :string
      add :external_metadata, :map
      add :gateway_account_id, references(:gateway_accounts, on_delete: :nothing)

      timestamps()
    end

    create index(:payments, [:gateway_account_id])
  end
end
