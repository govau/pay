defmodule PayWeb.Schema do
  use Absinthe.Schema
  alias PayWeb.Resolvers

  import_types(PayWeb.Schema.ContentTypes)
  import_types(PayWeb.Schema.InputTypes)

  def middleware(middleware, _field, %{identifier: :mutation}) do
    middleware ++ [PayWeb.Schema.Middleware.HandleChangesetErrors]
  end

  def middleware(middleware, _field, _object), do: middleware

  query do
    @desc "Get the currently authenticated user"
    field :me, :user do
      resolve(&Resolvers.get_current_user/3)
    end

    @desc "Access all resources based on admin rights"
    field :admin, non_null(:admin) do
      resolve(&Resolvers.get_current_user/3)
    end

    @desc "List all available users"
    field :users, non_null(list_of(non_null(:user))) do
      deprecate("Will be removed as we implement authentication")
      resolve(&Resolvers.users/3)
    end

    @desc "Services that the active user can access"
    field :services, non_null(list_of(non_null(:service))) do
      resolve(&Resolvers.services/3)
    end

    @desc "Services that the active user can access"
    field :service_invites, non_null(list_of(non_null(:service_invite))) do
      resolve(&Resolvers.service_invites/2)
    end

    @desc "Services that the active user can access"
    field :service, non_null(:service) do
      arg(:id, non_null(:id))
      resolve(&Resolvers.service/3)
    end

    field :gateway_account, non_null(:gateway_account) do
      arg(:id, non_null(:id))
      resolve(&Resolvers.gateway_account/3)
    end

    field :payment, non_null(:payment) do
      arg(:id, non_null(:id))
      resolve(&Resolvers.payment/3)
    end

    field :product_payment, non_null(:product_payment) do
      arg(:id, non_null(:id))
      resolve(&Resolvers.product_payment/3)
    end

    field :card_types, non_null(list_of(non_null(:card_type))) do
      resolve(&Resolvers.card_types/3)
    end

    field :organisations, non_null(list_of(non_null(:organisation))) do
      resolve(&Resolvers.organisations/3)
    end
  end

  mutation do
    # "Console"

    @desc "Invite a user to your service"
    field :invite_user, type: non_null(:service) do
      arg(:service_id, non_null(:id))
      arg(:email, non_null(:string))
      arg(:role, non_null(:string))

      resolve(&Resolvers.Mutations.Console.invite_user/2)
    end

    @desc "Accept a pending service invite"
    field :accept_invite, type: non_null(:service) do
      arg(:service_id, non_null(:id))

      resolve(&Resolvers.Mutations.Console.accept_invite/2)
    end

    @desc "Create a service"
    field :create_service, type: non_null(:service) do
      arg(:service, non_null(:create_service_input))

      resolve(&Resolvers.Mutations.Console.create_service/3)
    end

    @desc "Submit the details of an existing service"
    field :update_service, type: non_null(:service) do
      arg(:id, non_null(:id))
      arg(:service, non_null(:update_service_input))

      resolve(&Resolvers.Mutations.Console.update_service/3)
    end

    @desc "Submit a payment refund"
    field :submit_refund, type: non_null(:payment_refund) do
      arg(:payment_id, non_null(:id))
      arg(:amount, non_null(:integer))
      arg(:reference, :string)
      resolve(&Resolvers.Mutations.Console.submit_refund/3)
    end

    @desc "Update a gateway account card types"
    field :update_gateway_account_card_types, type: non_null(:gateway_account) do
      arg(:gateway_account_id, non_null(:id))
      arg(:card_type_ids, list_of(non_null(:id)))

      resolve(&Resolvers.Mutations.Console.update_gateway_account_card_types/3)
    end

    @desc "Create a product"
    field :create_product, type: non_null(:product) do
      arg(:gateway_account_id, non_null(:id))
      arg(:product, non_null(:create_product_input))

      resolve(&Resolvers.Mutations.Console.create_product/3)
    end

    field :update_gateway_account_credentials, type: non_null(:gateway_account) do
      arg(:gateway_account_id, non_null(:id))
      arg(:credentials, non_null(:bambora_credentials_input))

      resolve(&Resolvers.Mutations.Console.update_bambora_credentials/3)
    end

    # "Product"
    @desc "instantiate a product payment"
    field :create_product_payment, type: non_null(:product_payment) do
      arg(:service_name_slug, non_null(:string))
      arg(:name_slug, non_null(:string))

      resolve(&Resolvers.Mutations.ProductResolvers.create_product_payment/3)
    end

    field :update_product_payment, type: non_null(:product_payment) do
      arg(:id, non_null(:id), description: "Product payment ID to update")
      arg(:product_payment, non_null(:update_product_payment_input))

      resolve(&Resolvers.Mutations.ProductResolvers.update_product_payment/3)
    end

    field :submit_product_payment, type: non_null(:product_payment) do
      arg(:id, non_null(:id), description: "Product payment ID to update")

      resolve(&Resolvers.Mutations.ProductResolvers.submit_product_payment/3)
    end

    # "Checkout"
    field :submit_bambora_payment, type: non_null(:payment) do
      arg(:payment_id, non_null(:id))
      arg(:transition, non_null(:string))
      arg(:payment_input, non_null(:bambora_payment_input))

      resolve(&Resolvers.Mutations.Checkout.submit_payment/3)
    end

    field :submit_sandbox_payment, type: non_null(:payment) do
      arg(:payment_id, non_null(:id))
      arg(:transition, non_null(:string))
      arg(:payment_input, non_null(:sandbox_payment_input))

      resolve(&Resolvers.Mutations.Checkout.submit_payment/3)
    end

    field :signout, type: non_null(:signout) do
      resolve(&Resolvers.Mutations.signout/3)
    end
  end
end
