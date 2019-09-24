defmodule Pay.Payments.Payment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "payments" do
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

    belongs_to :gateway_account, Pay.Payments.GatewayAccount

    timestamps()
  end

  @doc false
  def create_changeset(payment, attrs) do
    payment
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

  # TODO: check what we can update. already removed external_id
  @doc false
  def update_changeset(payment, attrs) do
    payment
    |> cast(attrs, [
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
