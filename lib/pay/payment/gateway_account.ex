defmodule Pay.Payments.GatewayAccount do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Phoenix.Param, key: :external_id}

  schema "gateway_accounts" do
    field :allow_apple_pay, :boolean, default: false
    field :allow_google_pay, :boolean, default: false
    field :allow_zero_amount, :boolean, default: false
    field :credentials, :map
    field :description, :string
    field :external_id, Ecto.UUID
    field :integration_version_3ds, :integer
    field :payment_provider, :string
    field :requires_3ds, :boolean, default: false
    field :service_name, :string
    field :type, :string

    many_to_many :card_types, Pay.Payments.CardType,
      join_through: Pay.Payments.GatewayAccountCardType

    timestamps()
  end

  @doc false
  def create_changeset(gateway_account, attrs) do
    gateway_account
    |> cast(attrs, [
      :external_id,
      :payment_provider,
      :type,
      :credentials,
      :service_name,
      :description,
      :requires_3ds,
      :allow_apple_pay,
      :allow_google_pay,
      :allow_zero_amount,
      :integration_version_3ds
    ])
    |> validate_required([
      :external_id,
      :payment_provider,
      :type,
      :credentials,
      :service_name,
      :requires_3ds,
      :allow_apple_pay,
      :allow_google_pay,
      :allow_zero_amount
    ])
  end

  # TODO: check what we can update. already removed external_id
  @doc false
  def update_changeset(gateway_account, attrs) do
    gateway_account
    |> cast(attrs, [
      :payment_provider,
      :type,
      :credentials,
      :service_name,
      :description,
      :requires_3ds,
      :allow_apple_pay,
      :allow_google_pay,
      :allow_zero_amount,
      :integration_version_3ds
    ])
    |> validate_required([
      :payment_provider,
      :type,
      :credentials,
      :service_name,
      :requires_3ds,
      :allow_apple_pay,
      :allow_google_pay,
      :allow_zero_amount
    ])
  end
end

defmodule Pay.Payments.GatewayAccount.Type do
  alias Pay.Payments.GatewayAccount.Type

  defstruct [:name]

  @type t :: %Type{}
  @callback value :: Type.t()
end

defmodule Pay.Payments.GatewayAccount.Type.Test do
  alias Pay.Payments.GatewayAccount.Type

  @behaviour Type
  def value, do: %Type{name: "test"}
end

defmodule Pay.Payments.GatewayAccount.Type.Live do
  alias Pay.Payments.GatewayAccount.Type

  @behaviour Type
  def value, do: %Type{name: "live"}
end

defmodule Pay.Payments.GatewayAccount.PaymentProvider do
  alias Pay.Payments.GatewayAccount.PaymentProvider

  defstruct [:name]

  @type t :: %PaymentProvider{}
  @callback value :: PaymentProvider.t()
end

defmodule Pay.Payments.GatewayAccount.PaymentProvider.Sandbox do
  alias Pay.Payments.GatewayAccount.PaymentProvider

  @behaviour PaymentProvider
  def value, do: %PaymentProvider{name: "sandbox"}
end

defmodule Pay.Payments.GatewayAccount.PaymentProvider.Bambora do
  alias Pay.Payments.GatewayAccount.PaymentProvider

  @behaviour PaymentProvider
  def value, do: %PaymentProvider{name: "bambora"}
end
