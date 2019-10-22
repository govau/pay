defmodule Pay.Payments.CardType do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "card_types" do
    field :brand, :string
    field :label, :string
    field :requires_3ds, :boolean, default: false
    field :type, :string

    many_to_many :gateway_accounts, Pay.Payments.GatewayAccount,
      join_through: Pay.Payments.GatewayAccountCardType

    timestamps()
  end

  @doc false
  def changeset(card_type, attrs) do
    card_type
    |> cast(attrs, [:type, :brand, :label, :requires_3ds])
    |> validate_required([:type, :brand, :label, :requires_3ds])
  end
end
