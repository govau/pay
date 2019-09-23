defmodule Pay.Services.ServiceGatewayAccount do
  use Ecto.Schema
  import Ecto.Changeset

  schema "service_gateway_accounts" do
    field :gateway_account_id, :string

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
