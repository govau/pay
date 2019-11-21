defmodule PayWeb.Schema do
  use Absinthe.Schema
  alias PayWeb.Resolvers

  import_types(PayWeb.Schema.ContentTypes)
  import_types(PayWeb.Schema.InputTypes)

  query do
    # @desc "Get the currently authenticated user"
    # field :me, :user do
    # resolve(&Resolvers.get_current_user/3)
    # end

    @desc "Services that the active user can access"
    field :services, list_of(:service) do
      resolve(&Resolvers.services/3)
    end

    @desc "Services that the active user can access"
    field :service, list_of(:service) do
      arg(:service_id, non_null(:id))
      resolve(&Resolvers.service/3)
    end
  end

  mutation do
    @desc "Create a service"
    field :create_service, type: :service do
      arg(:service, non_null(:create_service_input))

      resolve(&Resolvers.Mutations.Console.create_service/3)
    end

    @desc "Submit a payment refund"
    field :submit_refund, type: :payment_refund do
      arg(:payment_id, non_null(:id))
      arg(:amount, non_null(:integer))
      arg(:reference, :string)

      resolve(&Resolvers.Mutations.Console.submit_refund/3)
    end

    @desc "Create a product"
    field :create_product, type: :product do
      arg(:gateway_account_id, non_null(:id))
      arg(:product, non_null(:create_product_input))

      resolve(&Resolvers.Mutations.Console.create_product/3)
    end
  end
end
