defmodule Pay.Services.User do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Phoenix.Param, key: :external_id}

  schema "users" do
    field :disabled, :boolean, default: false
    field :email, :string
    field :external_id, Ecto.UUID
    field :last_logged_in_at, :utc_datetime_usec
    field :name, :string
    field :platform_admin, :boolean, default: false
    field :telephone_number, :string

    many_to_many :services, Pay.Services.Service, join_through: Pay.Services.ServiceUser

    timestamps()
  end

  @doc false
  def create_changeset(user, attrs) do
    user
    |> cast(attrs, [:external_id, :email, :telephone_number, :name, :disabled, :last_logged_in_at])
    |> validate_required([
      :external_id,
      :email,
      :telephone_number,
      :name,
      :disabled,
      :last_logged_in_at
    ])
    |> unique_constraint(:email)
  end

  # TODO: check what we can update. already removed external_id
  @doc false
  def update_changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :telephone_number, :name, :disabled, :last_logged_in_at])
    |> validate_required([
      :external_id,
      :email,
      :telephone_number,
      :name,
      :disabled,
      :last_logged_in_at
    ])
    |> unique_constraint(:email)
  end
end
