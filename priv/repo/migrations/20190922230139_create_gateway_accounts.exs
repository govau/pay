defmodule Pay.Repo.Migrations.CreateGatewayAccounts do
  use Ecto.Migration

  def change do
    create table(:gateway_accounts) do
      add :name, :string
      add :type, :string
      add :credentials, :map
      add :service_name, :string
      add :description, :string
      add :requires_3ds, :boolean, default: false, null: false
      add :allow_apple_pay, :boolean, default: false, null: false
      add :allow_google_pay, :boolean, default: false, null: false
      add :allow_zero_amount, :integer
      add :integration_version_3ds, :integer

      timestamps()
    end
  end
end
