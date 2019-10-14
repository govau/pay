defmodule Pay.Repo.Migrations.CreateProducts do
  use Ecto.Migration

  def change do
    create table(:products) do
      add :external_id, :uuid
      add :gateway_account_id, :uuid
      add :api_token, :string
      add :name, :string
      add :description, :string
      add :price, :integer
      add :status, :string
      add :return_url, :string
      add :service_name_slug, :string
      add :name_slug, :string
      add :reference_enabled, :boolean, default: false, null: false
      add :reference_label, :string
      add :reference_hint, :string

      timestamps()
    end

    create unique_index(:products, [:name_slug, :service_name_slug])
  end
end
