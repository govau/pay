defmodule Pay.Services.ServiceInvite do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "service_invites" do
    field :disabled, :boolean, default: false
    field :email, :string
    field :expires_at, :utc_datetime_usec
    field :service_id, :id
    field :role_id, :id
    field :sender_id, :id

    timestamps()
  end

  @doc false
  def changeset(service_invite, attrs) do
    service_invite
    |> cast(attrs, [:email, :expires_at, :disabled])
    |> validate_required([:email, :expires_at, :disabled])
  end
end
