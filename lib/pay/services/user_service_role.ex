defmodule Pay.Services.UserServiceRole do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "user_service_roles" do
    belongs_to :user, Pay.Services.User
    belongs_to :service, Pay.Services.Service
    belongs_to :role, Pay.Services.Role

    has_many :permissions, through: [:role, :permissions]

    timestamps()
  end

  @doc false
  def changeset(user_service_role, attrs) do
    user_service_role
    |> cast(attrs, [:user_id, :service_id, :role_id])
    |> validate_required([:user_id, :service_id, :role_id])
  end
end
