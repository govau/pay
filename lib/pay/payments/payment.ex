defmodule Pay.Payments.Payment do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  @derive {Phoenix.Param, key: :external_id}

  schema "payments" do
    field :amount, :integer
    field :auth_3ds_details, :map
    field :card_details, :map
    field :delayed_capture, :boolean, default: false
    field :description, :string
    field :email, :string
    field :external_id, Ecto.UUID
    field :external_metadata, :map
    field :gateway_transaction_id, :string
    field :reference, :string
    field :return_url, :string
    field :status, :string
    field :wallet, :string

    belongs_to :gateway_account, Pay.Payments.GatewayAccount
    has_many :events, Pay.Payments.PaymentEvent
    has_many :refunds, Pay.Payments.PaymentRefund

    has_one :service, through: [:gateway_account, :service_gateway_account, :service]

    timestamps()
  end

  @doc false
  def create_changeset(payment, attrs) do
    payment
    |> cast(attrs, [
      :external_id,
      :gateway_account_id,
      :amount,
      :status,
      :gateway_transaction_id,
      :return_url,
      :email,
      :card_details,
      :auth_3ds_details,
      :description,
      :reference,
      :delayed_capture,
      :wallet,
      :external_metadata
    ])
    |> validate_required([
      :external_id,
      :amount,
      :status,
      :gateway_account_id,
      :return_url,
      :description,
      :reference,
      :delayed_capture,
      :external_metadata
    ])
  end

  # TODO: check what we can update. already removed external_id
  @doc false
  def update_changeset(payment, attrs) do
    payment
    |> cast(attrs, [:status, :gateway_transaction_id, :card_details])
    |> validate_required([:status])
  end
end

defmodule StateMachine do
  @callback initial :: term
  @callback final(state :: term) :: bool
  @callback transition(state :: term, event :: String.t()) :: term

  def transition(machine, state, event) do
    try do
      {:ok, machine.transition(state, event)}
    rescue
      FunctionClauseError -> {:err, state}
    end
  end

  def valid?(machine, state, []), do: machine.final(state)

  def valid?(machine, state, [event | events]),
    do: valid?(machine, machine.transition(event, state), events)

  def valid?(machine, transitions), do: valid?(machine, machine.initial, transitions)
end

defmodule Pay.Payments.Payment.Statuses do
  @behaviour StateMachine
  @type t ::
          :created
          | :started
          | :submitted
          | :capturable
          | :success
          | :declined
          | :timed_out
          | :cancelled
          | :error

  @states %{
    "created" => :created,
    "started" => :started,
    "submitted" => :submitted,
    "capturable" => :capturable,
    "success" => :success,
    "declined" => :declined,
    "timed_out" => :timed_out,
    "cancelled" => :cancelled,
    "error" => :error
  }

  @spec initial :: t
  def initial, do: :created

  @spec final(t) :: boolean
  def final(:success), do: true
  def final(_), do: false

  @spec transition(t, event :: String.t()) :: t
  def transition(:created, "submit_payment"), do: :submitted
  def transition(:created, "cancel_payment"), do: :cancelled

  def transition(:created, "payment_succeeded"), do: :success
  def transition(:submitted, "payment_succeeded"), do: :success

  def transition(:submitted, "reject"), do: :declined

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
