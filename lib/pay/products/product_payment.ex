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
    # change and preserve the existing value (but only if the record is loaded
    # from the database—allow new records to provide their reference).
    case product.reference_enabled do
      true ->
        changeset

      false ->
        case Ecto.get_meta(changeset.data, :state) do
          :loaded -> delete_change(changeset, :reference)
          _ -> changeset
        end
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
      :status,
      :gateway_account_id
    ])
  end

  @doc false
  def update_changeset(product_payment, attrs) do
    product_payment
    |> cast(attrs, [
      :amount,
      :reference
    ])
    |> normalize_amount(product_payment.product)
    |> normalize_reference(product_payment.product)
    |> validate_required([
      :amount,
      :reference
    ])
  end

  @doc false
  def submit_changeset(product_payment, attrs) do
    product_payment
    |> cast(attrs, [
      :payment_id,
      :status,
      :next_url
    ])
    |> validate_required([
      :payment_id,
      :status,
      :next_url
    ])
  end
end

defmodule Pay.Products.ProductPayment.Status do
  alias Pay.Products.ProductPayment.Status

  defstruct [:name]

  @type t :: %Status{}
  @callback value :: Status.t()
end

defmodule Pay.Products.ProductPayment.Status.Created do
  alias Pay.Products.ProductPayment.Status

  @behaviour Status
  def value, do: %Status{name: "created"}
end

defmodule Pay.Products.ProductPayment.Status.Submitted do
  alias Pay.Products.ProductPayment.Status

  @behaviour Status
  def value, do: %Status{name: "submitted"}
end

defmodule Pay.Products.ProductPayment.Status.Error do
  alias Pay.Products.ProductPayment.Status

  @behaviour Status
  def value, do: %Status{name: "error"}
end
