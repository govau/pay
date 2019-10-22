defmodule Pay.Repo.Migrations.CreateServices do
  use Ecto.Migration

  def change do
    create table(:services) do
      add :external_id, :uuid
      add :name, :string, null: false

      add :redirect_to_service_immediately_on_terminal_state, :boolean,
        default: false,
        null: false

      add :collect_billing_address, :boolean, default: false, null: false
      add :custom_branding, :map
      add :current_go_live_stage, :string
      add :merchant_name, :string
      add :merchant_telephone_number, :string
      add :merchant_address_line1, :string
      add :merchant_address_line2, :string
      add :merchant_address_city, :string
      add :merchant_address_postcode, :string
      add :merchant_address_country, :string
      add :merchant_email, :string
      add :organisation_id, references(:organisations, on_delete: :nothing)

      timestamps(type: :utc_datetime_usec)
    end

    create unique_index(:services, [:name])
    create index(:services, [:organisation_id])
  end
end
