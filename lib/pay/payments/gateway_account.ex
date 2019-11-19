defmodule Pay.Payments.GatewayAccount do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

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

    has_many :payments, Pay.Payments.Payment

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

  defmodule Type do
    @type t :: :test | :live

    def from_string("test"), do: :test
    def from_string("live"), do: :live
  end

  defmodule Provider do
    @type t :: :sandbox | :bambora

    def from_string("sandbox"), do: :sandbox
    def from_string("bambora"), do: :bambora
  end

  @spec type(Type.t()) :: String.t()
  def type(t), do: Atom.to_string(t)

  @spec provider(Provider.t()) :: String.t()
  def provider(t), do: Atom.to_string(t)

  @spec payment_provider(%Pay.Payments.GatewayAccount{}) :: Pay.Payments.Gateway.t()
  def payment_provider(
        %Pay.Payments.GatewayAccount{
          payment_provider: provider,
          credentials: credentials
        } = gateway_account
      ) do
    case Provider.from_string(provider) do
      :bambora -> Pay.Payments.Gateway.BamboraGateway.from_credentials(credentials)
      :sandbox -> Pay.Payments.Gateway.Sandbox.from_gateway_account(gateway_account)
    end
  end
end
