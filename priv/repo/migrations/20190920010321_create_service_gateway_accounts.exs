defmodule Pay.Repo.Migrations.CreateServiceGatewayAccounts do
  use Ecto.Migration

  def change do
    create table(:service_gateway_accounts) do
      add :gateway_account_id, :uuid
      add :service_id, references(:services, on_delete: :nothing)

      timestamps()
    end

    create index(:service_gateway_accounts, [:service_id])
  end
end
