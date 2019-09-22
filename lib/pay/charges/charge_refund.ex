defmodule Pay.Charges.ChargeRefund do
  use Ecto.Schema
  import Ecto.Changeset

  schema "charge_refunds" do
    field :amount, :integer
    field :external_id, Ecto.UUID
    field :gateway_transaction_id, Ecto.UUID
    field :reference, :string
    field :status, :string
    field :user_external_id, Ecto.UUID
    field :charge_id, :id

    timestamps()
  end

  @doc false
  def changeset(charge_refund, attrs) do
    charge_refund
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
