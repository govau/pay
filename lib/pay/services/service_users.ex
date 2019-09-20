defmodule Pay.Services.ServiceUsers do
  use Ecto.Schema
  import Ecto.Changeset

  schema "service_users" do
    field :service_id, :id
    field :user_id, :id
    field :role_id, :id

    timestamps()
  end

  @doc false
  def changeset(service_users, attrs) do
    service_users
    |> cast(attrs, [])
    |> validate_required([])
  end
end
