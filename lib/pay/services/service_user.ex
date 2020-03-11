defmodule Pay.Services.ServiceUser do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "service_users" do
    belongs_to :service, Pay.Services.Service
    belongs_to :user, Pay.Services.User
    belongs_to :role, Pay.Services.Role

    has_many :permissions, through: [:role, :permissions]

    timestamps()
  end

  @doc false
  def changeset(service_user, attrs) do
    service_user
    |> cast(attrs, [:service_id, :user_id, :role_id])
    |> validate_required([:service_id, :user_id, :role_id])
  end
end
