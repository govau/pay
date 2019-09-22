defmodule Pay.Charges.ChargeEvent do
  use Ecto.Schema
  import Ecto.Changeset

  schema "charge_events" do
    field :status, :string
    field :charge_id, :id

    timestamps()
  end

  @doc false
  def changeset(charge_event, attrs) do
    charge_event
    |> cast(attrs, [:status])
    |> validate_required([:status])
  end
end
