defmodule Pay.Payments.PaymentEvent do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "payment_events" do
    field :status, :string

    belongs_to :payment, Pay.Payments.Payment

    timestamps()
  end

  @doc false
  def changeset(payment_event, attrs) do
    payment_event
    |> cast(attrs, [:status])
    |> validate_required([:status])
  end
end
