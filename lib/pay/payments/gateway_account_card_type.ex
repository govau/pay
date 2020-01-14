defmodule Pay.Payments.GatewayAccountCardType do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "gateway_account_card_types" do
    field :gateway_account_id, :id
    field :card_type_id, :id

    timestamps()
  end

  @doc false
  def changeset(gateway_account_card_type, attrs) do
    gateway_account_card_type
    |> cast(attrs, [:gateway_account_id, :card_type_id])
    |> validate_required([:gateway_account_id, :card_type_id])
  end
end
