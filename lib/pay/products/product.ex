defmodule Pay.Products.Product do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  @derive {Phoenix.Param, key: :external_id}

  schema "products" do
    field :api_token, :string
    field :description, :string
    field :external_id, Ecto.UUID
    field :gateway_account_id, Ecto.UUID
    field :name, :string
    field :price_fixed, :boolean, default: false
    field :price, :integer
    field :name_slug, :string
    field :reference_enabled, :boolean, default: false
    field :reference_hint, :string
    field :reference_label, :string
    field :return_url, :string
    field :service_name_slug, :string
    field :status, :string

    timestamps()
  end

  @spec slug(Ecto.Changeset.t(), atom, atom) :: Ecto.Changeset.t()
  def slug(changeset, from_field, to_field) when is_atom(from_field) and is_atom(to_field) do
    put_change(
      changeset,
      to_field,
      (get_change(changeset, from_field) || "") |> Slugger.slugify_downcase()
    )
  end

  @doc false
  def create_changeset(product, attrs) do
    product
    |> cast(attrs, [
      :external_id,
      :gateway_account_id,
      :api_token,
      :name,
      :description,
      :price_fixed,
      :price,
      :status,
      :return_url,
      :service_name_slug,
      :name_slug,
      :reference_enabled,
      :reference_label,
      :reference_hint
    ])
    |> slug(:name, :name_slug)
    |> validate_required([
      :external_id,
      :gateway_account_id,
      :api_token,
      :name,
      :price_fixed,
      :price,
      :status,
      :return_url,
      :service_name_slug,
      :name_slug,
      :reference_enabled
    ])
    |> unique_constraint(:name_slug, name: :products_name_slug_service_name_slug_index)
  end

  @doc false
  def update_changeset(product, attrs) do
    product
    |> cast(attrs, [
      :name,
      :description,
      :price_fixed,
      :price,
      :status,
      :reference_enabled,
      :reference_label,
      :reference_hint
    ])
    |> slug(:name, :name_slug)
    |> unique_constraint(:name_slug, name: :products_name_slug_service_name_slug_index)
  end
end
