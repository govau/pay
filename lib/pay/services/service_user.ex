defmodule Pay.Services.ServiceUser do
  use Ecto.Schema
  import Ecto.Changeset
  alias Pay.Services.Service
  alias Pay.Services.User
  alias Pay.Services.Role
  @timestamps_opts [type: :utc_datetime_usec]

  schema "service_users" do
    belongs_to :service, Service
    belongs_to :user, User
    belongs_to :role, Role

    timestamps()
  end

  @doc false
  def changeset(service_user, attrs) do
    service_user
    |> cast(attrs, [:service_id, :user_id, :role_id])
    |> validate_required([:service_id, :user_id, :role_id])
  end
end
