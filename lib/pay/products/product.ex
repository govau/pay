defmodule Pay.Products.Product do
  use Ecto.Schema
  import Ecto.Changeset

  schema "products" do
    field :api_token, :string
    field :description, :string
    field :external_id, Ecto.UUID
    field :gateway_account_id, :string
    field :name, :string
    field :price, :integer
    field :product_name_path, :string
    field :reference_enabled, :boolean, default: false
    field :reference_hint, :string
    field :reference_label, :string
    field :return_url, :string
    field :service_name_path, :string
    field :status, :string

    timestamps()
  end

  @doc false
  def changeset(product, attrs) do
    product
    |> cast(attrs, [
      :external_id,
      :gateway_account_id,
      :api_token,
      :name,
      :description,
      :price,
      :status,
      :return_url,
      :service_name_path,
      :product_name_path,
      :reference_enabled,
      :reference_label,
      :reference_hint
    ])
    |> validate_required([
      :external_id,
      :gateway_account_id,
      :api_token,
      :name,
      :description,
      :price,
      :status,
      :return_url,
      :service_name_path,
      :product_name_path,
      :reference_enabled,
      :reference_label,
      :reference_hint
    ])
  end
end
