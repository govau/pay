defmodule PayWeb.Schema.ContentTypes do
  alias PayWeb.Resolvers
  use Absinthe.Schema.Notation

  defp resolve_as(value) do
    fn _, _ -> {:ok, value} end
  end

  object :admin do
    field :services, non_null(list_of(non_null(:service))) do
      resolve(&Resolvers.services/3)
    end

    field :organisations, non_null(list_of(non_null(:organisation))) do
      resolve(&Resolvers.organisations/3)
    end
  end

  object :user do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
    field :inserted_at, non_null(:string)
    field :updated_at, non_null(:string)
    field :name, non_null(:string)
    field :email, non_null(:string)
    field :telephone_number, :string
    field :platform_admin, :boolean
  end

  object :service_user do
    import_fields(:user)

    field :role, non_null(:role)
  end

  object :role do
    field :id, non_null(:id)
    field :name, non_null(:string)
    field :description, non_null(:string)
  end

  enum :service_go_live_stage do
    value(:not_started, as: "not_started")
    value(:live, as: "live")
  end

  object :service do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
    field :name, non_null(:string)
    field :current_go_live_stage, non_null(:service_go_live_stage)

    field :merchant_address_city, :string
    field :merchant_address_country, :string
    field :merchant_address_line1, :string
    field :merchant_address_line2, :string
    field :merchant_address_postcode, :string
    field :merchant_email, :string
    field :merchant_name, :string
    field :merchant_telephone_number, :string

    field :gateway_account, non_null(:gateway_account) do
      arg(:id, non_null(:id))
      resolve(&Resolvers.gateway_account/3)
    end

    field :gateway_accounts, non_null(list_of(non_null(:gateway_account))) do
      resolve(&Resolvers.gateway_accounts/3)
    end

    field :organisation, :organisation do
      resolve(&Resolvers.organisation/3)
    end

    field :users, non_null(list_of(non_null(:service_user))) do
      resolve(&Resolvers.service_users/3)
    end
  end

  enum :payment_status do
    value(:created, as: "created")
    value(:started, as: "started")
    value(:submitted, as: "submitted")
    value(:capturable, as: "capturable")
    value(:success, as: "success")
    value(:declined, as: "declined")
    value(:timed_out, as: "timed_out")
    value(:cancelled, as: "cancelled")
    value(:error, as: "error")
  end

  enum :product_payment_status do
    value(:created, as: "created")
    value(:submitted, as: "submitted")
    value(:error, as: "error")
  end

  object :payment do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
    field :inserted_at, non_null(:string)
    field :updated_at, non_null(:string)
    field :amount, non_null(:integer)
    field :description, non_null(:string)
    field :email, :string
    field :reference, non_null(:string)
    field :gateway_transaction_id, :string
    field :return_url, non_null(:string)
    field :status, non_null(:payment_status)
    field :card_details, :card_details

    field :gateway_account, non_null(:gateway_account) do
      resolve(&Resolvers.gateway_account/3)
    end

    field :events, non_null(list_of(non_null(:transaction_event))) do
      resolve(&Resolvers.payment_events/3)
    end

    field :refunds, non_null(list_of(non_null(:payment_refund))) do
      resolve(&Resolvers.payment_refunds/3)
    end
  end

  object :product do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
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
    # field :status, non_null(:string)

    field :gateway_account, non_null(:gateway_account) do
      resolve(&Resolvers.gateway_account/3)
    end

    field :payments, non_null(list_of(non_null(:product_payment))) do
      resolve(&Resolvers.product_payments/3)
    end
  end

  object :payment_refund do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
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
    field :external_id, non_null(:id)
    field :inserted_at, non_null(:string)
    field :updated_at, non_null(:string)
    field :status, non_null(:payment_status)
    field :type, non_null(:payment_event_type)

    resolve_type(fn
      %Pay.Payments.PaymentEvent{payment_refund_id: nil}, _ -> :payment_event
      %Pay.Payments.PaymentEvent{}, _ -> :payment_refund_event
    end)
  end

  object :payment_event do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
    field :inserted_at, non_null(:string)
    field :updated_at, non_null(:string)
    field :status, non_null(:payment_status)

    field :type, non_null(:payment_event_type) do
      resolve(resolve_as(:payment))
    end

    interface(:transaction_event)
  end

  object :payment_refund_event do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
    field :inserted_at, non_null(:string)
    field :updated_at, non_null(:string)
    field :status, non_null(:payment_status)

    field :type, non_null(:payment_event_type) do
      resolve(resolve_as(:refund))
    end

    field :refund, :payment_refund do
      resolve(&Resolvers.payment_refund/3)
    end

    interface(:transaction_event)
  end

  object :bambora_credentials do
    field :merchant_id, :string
    field :account_number, :string
    field :api_username, :string
  end

  object :sandbox_credentials do
    field :dummy, :string
  end

  union :gateway_account_credentials do
    types([:bambora_credentials, :sandbox_credentials])

    resolve_type(fn
      %Pay.Payments.GatewayAccount.Credentials.BamboraCredentials{}, _ -> :bambora_credentials
      %Pay.Payments.GatewayAccount.Credentials.SandboxCredentials{}, _ -> :sandbox_credentials
    end)
  end

  enum :payment_provider_label do
    value(:sandbox, as: "sandbox")
    value(:bambora, as: "bambora")
    value(:stripe, as: "stripe")
  end

  enum :gateway_account_type do
    value(:test, as: "test")
    value(:live, as: "live")
  end

  object :gateway_account do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
    field :description, :string
    field :service_name, :string
    field :payment_provider, non_null(:payment_provider_label)
    field :type, non_null(:gateway_account_type)

    field :allow_apple_pay, :boolean
    field :allow_google_pay, :boolean
    field :allow_zero_amount, :boolean
    field :integration_version_3ds, :integer

    # issue with *_N* where n is a digit
    # https://github.com/absinthe-graphql/absinthe/issues/560
    field :requires3ds, :boolean do
      resolve(fn
        %Pay.Payments.GatewayAccount{requires_3ds: req3ds}, _, _ -> {:ok, req3ds}
      end)
    end

    field :credentials, non_null(:gateway_account_credentials) do
      resolve(&Resolvers.gateway_account_credentials/3)
    end

    field :service, non_null(:service) do
      resolve(&Resolvers.service/3)
    end

    field :products, non_null(list_of(non_null(:product))) do
      resolve(&Resolvers.products/3)
    end

    field :payments, non_null(list_of(non_null(:payment))) do
      resolve(&Resolvers.payments/3)
    end

    field :card_types, non_null(list_of(non_null(:card_type))) do
      resolve(&Resolvers.card_types/3)
    end
  end

  object :card_details do
    field :cardholder_name, :string
    field :card_number, :string
    field :last_digits_card_number, :string
    field :first_digits_card_number, :string
    field :expiry_date, :string
    field :card_brand, :string
  end

  object :card_type do
    field :id, non_null(:id)
    field :brand, :string
    field :label, :string
    field :type, :string

    # issue with *_N* where n is a digit
    # https://github.com/absinthe-graphql/absinthe/issues/560
    field :requires3ds, :boolean do
      resolve(fn
        %Pay.Payments.CardType{requires_3ds: req3ds}, _, _ -> {:ok, req3ds}
      end)
    end
  end

  object :gateway_account_card_type do
    field :gateway_account, non_null(:gateway_account) do
      arg(:gateway_account_id, non_null(:id))
      resolve(&Resolvers.gateway_account/3)
    end

    field :card_type, non_null(:card_type) do
      resolve(&Resolvers.card_type/3)
    end
  end

  object :organisation do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
    field :name, :string

    field :type, :string do
      resolve(&Resolvers.organisation_type/3)
    end
  end

  object :product_payment do
    field :id, non_null(:id)
    field :external_id, non_null(:id)
    field :status, non_null(:product_payment_status)
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

  object :signout do
    field :signed_out, non_null(:boolean)
  end
end
