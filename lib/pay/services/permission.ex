defmodule Pay.Services.Permission do
  use Ecto.Schema
  import Ecto.Changeset

  schema "permissions" do
    field :description, :string
    field :name, :string

    many_to_many :roles, Pay.Services.Role, join_through: "role_permissions"

    timestamps()
  end

  @doc false
  def changeset(permission, attrs) do
    permission
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end
