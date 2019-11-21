defmodule PayWeb.Schema.ContentTypes do
  alias PayWeb.Resolvers
  use Absinthe.Schema.Notation

  defp resolve_as(value) do
    fn _, _ -> {:ok, value} end
  end

  object :user do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :email, non_null(:string)
    field :telephone_number, :string
  end

  object :service do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
    field :name, non_null(:string)
    field :current_go_live_stage, non_null(:string)

    field :merchant_address_city, :string
    field :merchant_address_country, :string
    field :merchant_address_line1, :string
    field :merchant_address_line2, :string
    field :merchant_address_postcode, :string
    field :merchant_email, :string
    field :merchant_name, :string
    field :merchant_telephone_number, :string

    field :organisation, :organisation do
      resolve(&Resolvers.organisation/3)
    end

    field :gateway_accounts, list_of(:gateway_account) do
      resolve(&Resolvers.gateway_accounts/3)
    end

    field :users, list_of(:user) do
      resolve(&Resolvers.users/3)
    end
  end

  object :payment do
    field :id, non_null(:id)
    field :amount, non_null(:integer)
    field :description, non_null(:string)
    field :email, :string
    field :reference, non_null(:string)
    field :gateway_transaction_id, :string
    field :return_url, non_null(:string)
    field :status, non_null(:string)

    field :gateway_account, :gateway_account do
      resolve(&Resolvers.gateway_account/3)
    end

    field :events, list_of(:transaction_event) do
      resolve(&Resolvers.payment_events/3)
    end
  end

  object :product do
    field :id, :id
    field :api_token, non_null(:string)
    field :description, :string
    field :name, non_null(:string)
    field :price_fixed, non_null(:boolean)
    field :price, non_null(:integer)
    field :name_slug, non_null(:string)
    field :reference_enabled, non_null(:boolean)
    field :reference_hint, :string
    field :reference_label, :string
    field :return_url, :string
    field :service_name_slug, non_null(:string)
    field :status, non_null(:string)

    field :gateway_account, :gateway_account do
      resolve(&Resolvers.gateway_account/3)
    end

    field :payments, list_of(non_null(:product_payment)) do
      resolve(&Resolvers.product_payments/3)
    end
  end

  object :payment_refund do
    field :id, non_null(:id)
    field :amount, non_null(:integer)
    field :gateway_transaction_id, non_null(:string)
    field :reference, non_null(:string)
    field :status, non_null(:string)

    field :payment, :payment do
      resolve(&Resolvers.payment/3)
    end

    field :user, :user do
      resolve(&Resolvers.user/3)
    end

    field :events, list_of(non_null(:payment_refund_event)) do
      resolve(&Resolvers.payment_refund_events/3)
    end
  end

  enum :payment_event_type do
    value(:payment)
    value(:refund)
  end

  interface :transaction_event do
    field :id, non_null(:id)
    field :status, non_null(:string)
    field :type, non_null(:payment_event_type)

    resolve_type(fn
      %Pay.Payments.PaymentEvent{payment_refund_id: nil}, _ -> :payment_event
      %Pay.Payments.PaymentEvent{}, _ -> :payment_refund_event
    end)
  end

  object :payment_event do
    field :id, non_null(:id)
    field :status, non_null(:string)

    field :type, non_null(:payment_event_type) do
      resolve(resolve_as(:payment))
    end

    interface(:transaction_event)
  end

  object :payment_refund_event do
    field :id, non_null(:id)
    field :status, non_null(:string)

    field :type, non_null(:payment_event_type) do
      resolve(resolve_as(:refund))
    end

    field :refund, :payment_refund do
      resolve(&Resolvers.payment_refund/3)
    end

    interface(:transaction_event)
  end

  object :gateway_account do
    field :id, :id
    field :description, :string
    field :payment_provider, :string
    field :service_name, :string
    field :type, :string

    field :allow_apple_pay, :boolean
    field :allow_google_pay, :boolean
    field :allow_zero_amount, :boolean
    field :integration_version_3ds, :integer
    field :requires_3ds, :boolean

    field :products, list_of(non_null(:product)) do
      resolve(&Resolvers.products/3)
    end

    field :payments, list_of(non_null(:payment)) do
      resolve(&Resolvers.payments/3)
    end

    field :card_types, list_of(non_null(:card_type)) do
      resolve(&Resolvers.card_types/3)
    end
  end

  object :card_type do
    field :id, :id
    field :brand, :string
    field :label, :string
    field :requires_3ds, :boolean
    field :type, :string
  end

  object :organisation do
    field :id, :id
    field :name, :string

    field :type, :string do
      resolve(&Resolvers.organisation_type/3)
    end
  end

  object :product_payment do
    field :id, non_null(:id)
    field :status, non_null(:string)
    field :amount, :integer
    field :reference, :string
    field :next_url, :string

    field :gateway_account, non_null(:gateway_account) do
      resolve(&Resolvers.gateway_account/3)
    end

    field :product, non_null(:product) do
      resolve(&Resolvers.product/3)
    end

    field :payment, :payment do
      resolve(&Resolvers.payment/3)
    end
  end
end
