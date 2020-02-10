defmodule Pay.Services.ServiceInvite do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "service_invites" do
    field :disabled, :boolean, default: false
    field :email, :string
    field :expires_at, :utc_datetime_usec

    belongs_to :service, Pay.Services.Service
    belongs_to :role, Pay.Services.Role
    belongs_to :sender, Pay.Services.User

    timestamps()
  end

  @doc false
  def changeset(service_invite, attrs) do
    service_invite
    |> cast(attrs, [:email, :service_id, :role_id, :sender_id, :expires_at, :disabled])
    |> validate_required([:email, :service_id, :role_id, :sender_id, :expires_at, :disabled])
  end
end
