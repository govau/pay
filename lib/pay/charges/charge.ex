defmodule Pay.Charges.Charge do
  use Ecto.Schema
  import Ecto.Changeset

  schema "charges" do
    field :amount, :integer
    field :auth_3ds_details, :map
    field :card_details, :map
    field :delayed_capture, :boolean, default: false
    field :description, :string
    field :email, :string
    field :external_id, Ecto.UUID
    field :external_metadata, :map
    field :gateway_transaction_id, :string
    field :reference, :string
    field :return_url, :string
    field :status, :string
    field :wallet, :string

    belongs_to :gateway_account, Pay.Charges.GatewayAccount

    timestamps()
  end

  @doc false
  def changeset(charge, attrs) do
    charge
    |> cast(attrs, [
      :external_id,
      :amount,
      :status,
      :gateway_transaction_id,
      :return_url,
      :email,
      :card_details,
      :auth_3ds_details,
      :description,
      :reference,
      :delayed_capture,
      :wallet,
      :external_metadata
    ])
    |> validate_required([
      :external_id,
      :amount,
      :status,
      :gateway_transaction_id,
      :return_url,
      :email,
      :card_details,
      :auth_3ds_details,
      :description,
      :reference,
      :delayed_capture,
      :wallet,
      :external_metadata
    ])
  end
end
