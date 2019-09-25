defmodule Pay.Payments.PaymentRefund do
  use Ecto.Schema
  import Ecto.Changeset

  schema "payment_refunds" do
    field :amount, :integer
    field :external_id, Ecto.UUID
    field :gateway_transaction_id, Ecto.UUID
    field :reference, :string
    field :status, :string
    field :user_external_id, Ecto.UUID

    belongs_to :payment, Pay.Payments.Payment

    timestamps()
  end

  @doc false
  def changeset(payment_refund, attrs) do
    payment_refund
    |> cast(attrs, [
      :external_id,
      :reference,
      :amount,
      :status,
      :user_external_id,
      :gateway_transaction_id
    ])
    |> validate_required([
      :external_id,
      :reference,
      :amount,
      :status,
      :user_external_id,
      :gateway_transaction_id
    ])
  end
end
