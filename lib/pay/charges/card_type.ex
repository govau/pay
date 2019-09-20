defmodule Pay.Charges.CardType do
  use Ecto.Schema
  import Ecto.Changeset

  schema "card_types" do
    field :brand, :string
    field :label, :string
    field :requires_3ds, :boolean, default: false
    field :type, :string

    timestamps()
  end

  @doc false
  def changeset(card_type, attrs) do
    card_type
    |> cast(attrs, [:type, :brand, :label, :requires_3ds])
    |> validate_required([:type, :brand, :label, :requires_3ds])
  end
end
