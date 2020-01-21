defmodule PayWeb.Resolvers.Mutations do
  alias Pay.{Services, Payments, Products}

  def signout(_, _, _) do
    {:ok, %{signed_out: true}}
  end

  defmodule Console do
    def create_service(_, %{service: service_params}, %{context: %{current_user: user}}) do
      Services.create_service(user, service_params)
    end

    def update_service(_, %{id: service_id, service: service_params}, _) do
      service = Services.get_service_by_external_id!(service_id)
      Services.update_service(service, service_params)
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

    def update_gateway_account_card_types(
          _,
          %{
            gateway_account_id: gateway_account_id,
            card_type_ids: card_type_ids
          },
          _
        ) do
          Pay.Payments.clear_gateway_account_card_types(gateway_account_id)

          Enum.each(card_type_ids, fn card_type_id ->
            {:ok, _} = Payments.create_gateway_account_card_type(%{
              gateway_account_id: gateway_account_id,
              card_type_id: card_type_id
            })
          end
          )

      {:ok, Payments.get_gateway_account!(gateway_account_id)}
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

    def update_bambora_credentials(
          _,
          %{gateway_account_id: gateway_account_id, credentials: credentials},
          _resolution
        ) do
      gateway_account = Payments.get_gateway_account_by_external_id!(gateway_account_id)
      Payments.update_gateway_account(gateway_account, %{credentials: credentials})
    end
  end

  defmodule ProductResolvers do
    def create_product_payment(_, %{service_name_slug: service_name, name_slug: name}, _) do
      product = Products.get_product_by_slugs!(service_name, name)

      reference =
        if product.reference_enabled,
          do: "",
          else: PayWeb.Products.ProductPaymentController.random_reference()

      Products.create_product_payment(%{"reference" => reference}, product)
    end

    def update_product_payment(
          _,
          %{
            id: product_payment_id,
            product_payment: product_payment_params
          },
          _
        ) do
      product_payment = Products.get_product_payment_by_external_id!(product_payment_id)
      Products.update_product_payment(product_payment, product_payment_params)
    end

    def submit_product_payment(_, %{id: product_payment_id}, _) do
      product_payment = Products.get_product_payment_by_external_id!(product_payment_id)

      gateway_account =
        Payments.get_gateway_account_by_external_id!(product_payment.product.gateway_account_id)

      reference =
        case product_payment.reference do
          nil -> "got-no-reference"
          ref -> ref
        end

      payment_request = %PayGovAu.Model.CreateRequest{
        payment: %{
          # TODO: we pass the gateway account ID.
          # Eventually we will pass the product's token as auth (which has
          # the gateway account implied in it).
          gateway_account_id: gateway_account.id,
          reference: reference,
          amount: product_payment.amount,
          description: product_payment.product.name,
          # We pass a URL here so that the pay page knows how to redirect
          # back to the products page to show a confirmation page.
          return_url: "/products/pay/#{product_payment.external_id}/status",
          metadata: %{
            "product_id" => product_payment_id
          }
        }
      }

      with {:ok, resp} <-
             PayGovAu.Api.Payment.create_payment(
               PayWeb.Products.PayClient.new(),
               payment_request
             ) do
        Products.submit_product_payment(
          product_payment,
          resp.data.id,
          resp.data.next_url
        )
      end
    end
  end

  defmodule Checkout do
    def submit_payment(
          _,
          %{
            payment_id: payment_id,
            transition: transition,
            payment_input: payment_params
          },
          _
        ) do
      with payment <- Payments.get_payment_by_external_id!(payment_id),
           payment <- Pay.Repo.preload(payment, :gateway_account),
           gateway <- Payments.GatewayAccount.payment_provider(payment.gateway_account),
           {:ok, %{reference: payment_reference} = payment_response} <-
             Payments.Gateway.submit_payment(gateway, payment, payment_params) do
        Payments.update_payment(payment, transition, %{
          gateway_transaction_id: payment_reference,
          card_details: %{
            card_brand: payment_response.card_brand,
            card_number: payment_response.card_number,
            expiry_date: payment_response.card_expiry
          }
        })
      end
    end
  end
end
