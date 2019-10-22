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
    |> cast(attrs, [
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
  end
end

defmodule Pay.Payments.Payment.Status do
  alias Pay.Payments.Payment.Status

  defstruct [:name]

  @type t :: %Status{}
  @callback value :: Status.t()
end

defmodule Pay.Payments.Payment.Status.Created do
  alias Pay.Payments.Payment.Status

  @behaviour Status
  def value, do: %Status{name: "created"}
end
