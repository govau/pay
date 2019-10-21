defmodule Pay.Services.Role do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  schema "roles" do
    field :description, :string
    field :name, :string

    many_to_many :permissions, Pay.Services.Permission, join_through: Pay.Services.RolePermission

    timestamps()
  end

  # @type t :: %Role{}
  @callback value :: Role.t()

  @doc false
  def changeset(role, attrs) do
    role
    |> cast(attrs, [:name, :description])
    |> validate_required([:name, :description])
  end
end

defmodule Pay.Services.Role.SuperAdmin do
  alias Pay.Services.Role

  @behaviour Role
  def value, do: %Role{name: "super_admin"}
end

defmodule Pay.Services.Role.Admin do
  alias Pay.Services.Role

  @behaviour Role
  def value, do: %Role{name: "admin"}
end

defmodule Pay.Services.Role.ViewAndRefund do
  alias Pay.Services.Role

  @behaviour Role
  def value, do: %Role{name: "view_and_refund"}
end

defmodule Pay.Services.Role.ViewOnly do
  alias Pay.Services.Role

  @behaviour Role
  def value, do: %Role{name: "view_only"}
end
