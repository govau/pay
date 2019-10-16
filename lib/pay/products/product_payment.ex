defmodule Pay.Products.ProductPayment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Pay.Products.Product

  @derive {Phoenix.Param, key: :external_id}

  schema "product_payments" do
    field :external_id, Ecto.UUID
    field :gateway_account_id, :string
    field :payment_id, :string
    field :status, :string
    field :reference, :string
    field :amount, :integer
    field :next_url, :string

    belongs_to :product, Product

    timestamps()
  end

  @spec normalize_amount(Ecto.Changeset.t(), Pay.Products.Product.t()) :: Ecto.Changeset.t()
  def normalize_amount(changeset, %Product{} = product) do
    # If the product's price is fixed, the payment amount should always be the
    # product's price, so put a new value in the changeset. Otherwise, the price
    # can be manually provided, so return the existing changeset.
    case product.price_fixed do
      true -> put_change(changeset, :amount, product.price)
      false -> changeset
    end
  end

  @spec normalize_reference(Ecto.Changeset.t(), Pay.Products.Product.t()) :: Ecto.Changeset.t()
  def normalize_reference(changeset, %Product{} = product) do
    # If the product's reference field is enabled, the payment reference can be
    # manually provided, so return the existing changeset. Otherwise, delete the
    # change and preserve the existing value.
    case product.reference_enabled do
      true -> changeset
      false -> delete_change(changeset, :reference)
    end
  end

  @doc false
  def create_changeset(product_payment, attrs) do
    product_payment
    |> cast(attrs, [
      :external_id,
      :product_id,
      :payment_id,
      :next_url,
      :amount,
      :status,
      :gateway_account_id,
      :reference
    ])
    |> normalize_amount(product_payment.product)
    |> normalize_reference(product_payment.product)
    |> validate_required([
      :external_id,
      :product_id,
      :payment_id,
      :next_url,
      :status,
      :gateway_account_id
    ])
  end

  @doc false
  def update_changeset(product_payment, attrs) do
    product_payment
    |> cast(attrs, [
      :next_url,
      :amount,
      :status,
      :reference
    ])
    |> normalize_amount(product_payment.product)
    |> normalize_reference(product_payment.product)
    |> validate_required([
      :next_url,
      :status
    ])
  end
end
