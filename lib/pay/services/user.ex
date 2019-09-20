defmodule Pay.Services.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :disabled, :boolean, default: false
    field :email, :string
    field :external_id, Ecto.UUID
    field :last_logged_in_at, :utc_datetime
    field :telephone_number, :string

    many_to_many :services, Pay.Services.Service, join_through: "service_users"

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:external_id, :email, :telephone_number, :disabled, :last_logged_in_at])
    |> validate_required([:external_id, :email, :telephone_number, :disabled, :last_logged_in_at])
    |> unique_constraint(:email)
  end
end
