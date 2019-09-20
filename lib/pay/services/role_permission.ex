defmodule Pay.Services.RolePermission do
  use Ecto.Schema
  import Ecto.Changeset

  schema "role_permissions" do
    field :role_id, :id
    field :permission_id, :id

    timestamps()
  end

  @doc false
  def changeset(role_permission, attrs) do
    role_permission
    |> cast(attrs, [])
    |> validate_required([])
  end
end
