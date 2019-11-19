defmodule Pay.Payments.PaymentEvent do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "payment_events" do
    field :status, :string

    belongs_to :payment, Pay.Payments.Payment
    belongs_to :payment_refund, Pay.Payments.PaymentRefund

    timestamps()
  end

  @doc false
  def changeset(payment_event, attrs) do
    payment_event
    |> cast(attrs, [:status, :payment_id, :payment_refund_id])
    |> validate_required([:status, :payment_id])
    |> foreign_key_constraint(:payment_id)
    |> foreign_key_constraint(:payment_refund_id)
  end
end
