defmodule Pay.Repo.Migrations.CreateGatewayAccountCardType do
  use Ecto.Migration

  def change do
    create table(:gateway_account_card_types) do
      add :gateway_account_id, references(:gateway_accounts, on_delete: :nothing)
      add :card_type_id, references(:card_types, on_delete: :nothing)

      timestamps(type: :utc_datetime_usec)
    end

    create index(:gateway_account_card_types, [:gateway_account_id])
    create index(:gateway_account_card_types, [:card_type_id])
  end
end
