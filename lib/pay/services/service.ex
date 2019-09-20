defmodule Pay.Services.Service do
  use Ecto.Schema
  import Ecto.Changeset

  schema "services" do
    field :collect_billing_address, :boolean, default: false
    field :current_go_live_stage, :string
    field :custom_branding, :map
    field :external_id, Ecto.UUID
    field :merchant_address_city, :string
    field :merchant_address_country, :string
    field :merchant_address_line1, :string
    field :merchant_address_line2, :string
    field :merchant_address_postcode, :string
    field :merchant_email, :string
    field :merchant_name, :string
    field :merchant_telephone_number, :string
    field :redirect_to_service_immediately_on_terminal_state, :boolean, default: false

    belongs_to :organisation, Pay.Services.Organisation
    many_to_many :users, Pay.Services.User, join_through: "service_users"

    timestamps()
  end

  @doc false
  def changeset(service, attrs) do
    service
    |> cast(attrs, [
      :external_id,
      :redirect_to_service_immediately_on_terminal_state,
      :collect_billing_address,
      :custom_branding,
      :current_go_live_stage,
      :merchant_name,
      :merchant_telephone_number,
      :merchant_address_line1,
      :merchant_address_line2,
      :merchant_address_city,
      :merchant_address_postcode,
      :merchant_address_country,
      :merchant_email
    ])
    |> validate_required([
      :external_id,
      :redirect_to_service_immediately_on_terminal_state,
      :collect_billing_address,
      :custom_branding,
      :current_go_live_stage,
      :merchant_name,
      :merchant_telephone_number,
      :merchant_address_line1,
      :merchant_address_line2,
      :merchant_address_city,
      :merchant_address_postcode,
      :merchant_address_country,
      :merchant_email
    ])
  end
end