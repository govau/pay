defmodule Pay.Services.ServiceGatewayAccount do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "service_gateway_accounts" do
    belongs_to :gateway_account, Pay.Payments.GatewayAccount,
      references: :external_id,
      type: Ecto.UUID

    belongs_to :service, Pay.Services.Service

    timestamps()
  end

  @doc false
  def changeset(service_gateway_account, attrs) do
    service_gateway_account
    |> cast(attrs, [:gateway_account_id])
    |> validate_required([:gateway_account_id])
  end
end
