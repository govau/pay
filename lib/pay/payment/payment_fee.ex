defmodule Pay.Payments.PaymentFee do
  use Ecto.Schema
  import Ecto.Changeset

  schema "payment_fees" do
    field :amount_collected, :integer
    field :amount_due, :integer
    field :collected_at, :utc_datetime_usec
    field :external_id, Ecto.UUID
    field :gateway_transaction_id, :string

    belongs_to :payment, Pay.Payments.Payment

    timestamps()
  end

  @doc false
  def changeset(payment_fee, attrs) do
    payment_fee
    |> cast(attrs, [
      :external_id,
      :amount_due,
      :amount_collected,
      :collected_at,
      :gateway_transaction_id
    ])
    |> validate_required([
      :external_id,
      :amount_due,
      :amount_collected,
      :collected_at,
      :gateway_transaction_id
    ])
  end
end
