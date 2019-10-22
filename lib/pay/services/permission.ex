defmodule Pay.Services.Permission do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "permissions" do
    field :description, :string
    field :name, :string

    many_to_many :roles, Pay.Services.Role, join_through: Pay.Services.RolePermission

    timestamps()
  end

  @doc false
  def changeset(permission, attrs) do
    permission
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
