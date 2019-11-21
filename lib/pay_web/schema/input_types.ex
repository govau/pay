defmodule PayWeb.Schema.InputTypes do
  use Absinthe.Schema.Notation

  input_object :create_service_input do
    field :name, non_null(:string)
    field :merchant_name, :string
    field :merchant_telephone_number, :string
    field :merchant_address_line1, :string
    field :merchant_address_line2, :string
    field :merchant_address_city, :string
    field :merchant_address_postcode, :string
    field :merchant_address_country, :string
    field :merchant_email, :string
  end

  input_object :create_product_input do
    field :name, non_null(:string)
    field :description, :string
    field :reference_enabled, non_null(:boolean)
    field :reference_label, :string
    field :reference_hint, :string
    field :price_fixed, non_null(:boolean)
    field :price, :integer
  end
end
