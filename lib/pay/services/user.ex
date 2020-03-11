defmodule Pay.Services.User do
  use Ecto.Schema
  import Ecto.Changeset
  @timestamps_opts [type: :utc_datetime_usec]

  @derive {Phoenix.Param, key: :external_id}

  schema "users" do
    field :disabled, :boolean, default: false
    field :email, :string
    field :external_id, Ecto.UUID, autogenerate: true
    field :last_logged_in_at, :utc_datetime_usec
    field :name, :string
    field :platform_admin, :boolean, default: false
    field :telephone_number, :string

    has_many :service_roles, Pay.Services.ServiceUser
    many_to_many :services, Pay.Services.Service, join_through: Pay.Services.ServiceUser

    timestamps()
  end

  @doc false
  def create_changeset(user, attrs) do
    user
    |> cast(attrs, [:external_id, :email, :telephone_number, :name, :disabled, :last_logged_in_at])
    |> validate_required([
      :email,
      :name
    ])
    |> unique_constraint(:email)
    |> unique_constraint(:external_id)
  end

  @doc false
  def update_changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :telephone_number, :name, :disabled, :last_logged_in_at])
    |> validate_required([
      :email,
      :name
    ])
    |> unique_constraint(:email)
  end

  def admin_changeset(user, attrs) do
    user
    |> cast(attrs, [:platform_admin])
    |> validate_required([:platform_admin])
  end
end
