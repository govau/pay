defmodule Pay.Payments.PaymentRefund do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  @derive {Phoenix.Param, key: :external_id}

  schema "payment_refunds" do
    field :amount, :integer
    field :external_id, Ecto.UUID
    field :gateway_transaction_id, :string
    field :reference, :string
    field :status, :string
    field :user_external_id, Ecto.UUID

    belongs_to :payment, Pay.Payments.Payment
    has_many :events, Pay.Payments.PaymentEvent

    timestamps()
  end

  @doc false
  def create_changeset(payment_refund, attrs) do
    payment_refund
    |> cast(attrs, [
      :reference,
      :amount,
      :user_external_id,
      :gateway_transaction_id
    ])
    |> validate_required([
      :reference,
      :amount,
      :user_external_id,
      :gateway_transaction_id
    ])
    |> foreign_key_constraint(:payment_id)
  end

  @doc false
  def update_changeset(payment_refund, attrs) do
    payment_refund
    |> cast(attrs, [:status])
    |> validate_required([:status])
  end
end

defmodule Pay.Payments.PaymentRefund.Statuses do
  @behaviour StateMachine

  @type t :: :created | :submitted | :success | :error

  @states %{
    "created" => :created,
    "submitted" => :submitted,
    "success" => :success,
    "error" => :error
  }

  @spec initial :: t
  def initial, do: :created

  @spec final(t) :: boolean
  def final(:success), do: true
  def final(_), do: false

  @spec transition(t, event :: String.t()) :: t
  def transition(:created, "submit_refund"), do: :submitted
  def transition(:created, "cancel_refund"), do: :cancelled
  def transition(:created, "refund_succeeded"), do: :success
  def transition(:submitted, "refund_succeeded"), do: :success
  def transition(:created, "failure"), do: :error
  def transition(:submitted, "failure"), do: :error

  @spec status(t) :: String.t()
  def status(t), do: Atom.to_string(t)

  @spec from_string!(String.t()) :: t
  def from_string!(status) do
    case @states[status] do
      nil -> raise(KeyError, key: status, term: @states)
      internal_state -> internal_state
    end
  end
end
