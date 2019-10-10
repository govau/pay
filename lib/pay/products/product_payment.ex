defmodule Pay.Products.ProductPayment do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Phoenix.Param, key: :external_id}

  schema "product_payments" do
    field :amount, :integer
    field :external_id, Ecto.UUID
    field :gateway_account_id, :string
    field :next_url, :string
    field :payment_id, :string
    field :reference_number, :string
    field :status, :string
    field :product_id, :id

    timestamps()
  end

  @doc false
  def changeset(product_payment, attrs) do
    product_payment
    |> cast(attrs, [
      :external_id,
      :payment_id,
      :next_url,
      :amount,
      :status,
      :gateway_account_id,
      :reference_number
    ])
    |> validate_required([
      :external_id,
      :payment_id,
      :next_url,
      :amount,
      :status,
      :gateway_account_id,
      :reference_number
    ])
  end
end
