defmodule PayWeb.Schema.InputTypes do
  use Absinthe.Schema.Notation

  input_object :create_service_input do
    field :name, non_null(:string)
  end

  input_object :update_service_input do
    field :name, non_null(:string)
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

  input_object :update_service_input do
    field :name, non_null(:string)
  end

  input_object :update_product_payment_input do
    field :reference, non_null(:string)
    field :amount, :integer
  end

  input_object :bambora_payment_input do
    field :ott, non_null(:string)
    field :last4, non_null(:string)
    field :expiry_month, non_null(:string)
    field :expiry_year, non_null(:string)
  end

  input_object :sandbox_payment_input do
    field :last4, non_null(:string)
    field :expiry_month, non_null(:string)
    field :expiry_year, non_null(:string)
  end

  input_object :bambora_credentials_input do
    field :merchant_id, non_null(:string)
    field :api_username, non_null(:string)
    field :api_password, :string
    field :account_number, :string
  end
end
