defmodule PayWeb.Resolvers.Mutations do
  alias Pay.{Services, Payments, Products}

  defmodule Console do
    def create_service(_, %{service: service_params}, %{context: %{current_user: user}}) do
      Services.create_service(user, service_params)
    end

    def submit_refund(
          _,
          %{
            payment_id: payment_id,
            amount: amount,
            reference: reference
          },
          %{context: %{current_user: current_user}}
        ) do
      with payment <- Payments.get_payment_by_external_id!(payment_id),
           gateway <- Payments.GatewayAccount.payment_provider(payment.gateway_account),
           {:ok, %{reference: refund_reference}} <-
             Payments.Gateway.refund_payment(gateway, payment, %{amount: amount}) do
        Payments.create_payment_refund(payment, %{
          amount: amount,
          reference: reference,
          gateway_transaction_id: refund_reference,
          user_external_id: current_user.external_id
        })
      end
    end

    def create_product(
          _,
          %{gateway_account_id: gateway_account_id, product: product_params},
          _context
        ) do
      gateway_account = Payments.get_gateway_account_by_external_id!(gateway_account_id)
      service_name_slug = Slugger.slugify_downcase(gateway_account.service_name)

      product_params
      |> Map.merge(%{
        gateway_account_id: gateway_account_id,
        api_token: "some api_token",
        service_name_slug: service_name_slug,
        status: "some status",
        return_url: "some return_url"
      })
      |> Products.create_product()
    end
  end
end
