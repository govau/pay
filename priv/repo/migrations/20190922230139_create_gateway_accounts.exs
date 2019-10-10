defmodule Pay.Repo.Migrations.CreateGatewayAccounts do
  use Ecto.Migration

  def change do
    create table(:gateway_accounts) do
      add :external_id, :uuid
      add :payment_provider, :string, null: false
      add :type, :string, null: false
      add :credentials, :map
      add :service_name, :string, null: false
      add :description, :string
      add :requires_3ds, :boolean, default: false, null: false
      add :allow_apple_pay, :boolean, default: false, null: false
      add :allow_google_pay, :boolean, default: false, null: false
      add :allow_zero_amount, :boolean, default: false, null: false
      add :integration_version_3ds, :integer

      timestamps()
    end
  end
end
