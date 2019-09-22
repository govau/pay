defmodule Pay.Charges.GatewayAccountCardTypes do
  use Ecto.Schema
  import Ecto.Changeset

  schema "gateway_account_card_types" do
    field :gateway_account_id, :id
    field :card_type_id, :id

    timestamps()
  end

  @doc false
  def changeset(gateway_account_card_types, attrs) do
    gateway_account_card_types
    |> cast(attrs, [])
    |> validate_required([])
  end
end
