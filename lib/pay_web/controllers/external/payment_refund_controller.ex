defmodule PayWeb.External.PaymentRefundController do
  use PayWeb, :controller
  use PhoenixSwagger

  alias Pay.Payments
  alias Pay.Payments.Payment
  alias Pay.Payments.PaymentRefund

  action_fallback PayWeb.FallbackController

  def swagger_definitions do
    %{
      Payment:
        swagger_schema do
          title("Payment")

          properties do
            id(:string, "ID of the payment", format: "uuid")
            amount(:integer, "Payment amount (in cents)", format: "int32")
            reference(:string, "Reference to associate with the payment")
            description(:string, "Description of the goods being paid for")
            email(:string, "Email address to associate with the payment")
            return_url(:string, "URL to redirect user to after payment")
            next_url(:string, "URL where your service should direct your user next")
          end

          example(%{
            id: "5adc6f55-5b86-45be-b9d7-e70029e2d534"
          })
        end,
      Payments:
        swagger_schema do
          title("Payments")
          type(:array)
          items(Schema.ref(:Payment))
        end,
      IndexResponse:
        swagger_schema do
          title("IndexResponse")
          description("Response schema for index operation")
          property(:data, Schema.ref(:Payments))
        end,
      ShowResponse:
        swagger_schema do
          title("ShowResponse")
          description("Response schema for show operation")
          property(:data, Schema.ref(:Payment))
        end,
      CreateRequestPayment:
        swagger_schema do
          title("CreateRequestPayment")

          properties do
            # TODO: remove gateway_account_id (will come from auth token)
            gateway_account_id(:integer, "The gateway_account_id of the payment", format: "int32")

            amount(:integer, "Payment amount (in cents)", format: "int32")
            reference(:string, "Reference to associate with the payment")
            description(:string, "Description of the goods being paid for")
            email(:string, "Email address to associate with the payment")
            return_url(:string, "URL to redirect user to after payment")
          end
        end,
      CreateRequest:
        swagger_schema do
          title("CreateRequest")
          description("Request schema for create operation")
          property(:payment, Schema.ref(:CreateRequestPayment))
        end,
      CreateResponse:
        swagger_schema do
          title("CreateResponse")
          description("Response schema for create operation")
          property(:data, Schema.ref(:Payment))
        end,
      FieldError:
        swagger_schema do
          title("FieldError")
        end,
      CreateErrorResponse:
        swagger_schema do
          title("CreateErrorResponse")

          property(:errors, Schema.ref(:FieldError))
        end
    }
  end

  swagger_path(:index) do
    get("/api/v1/{paymentId}/refunds")
    operation_id("ListPaymentRefunds")
    summary("List payment refunds")

    description("See parameters for available search filters.")

    produces("application/json")

    parameters do
      reference(
        :query,
        "string",
        "Refund reference to search (exact match, case insensitive)"
      )
    end

    response(200, "OK", Schema.ref(:IndexResponse))
  end

  def index(conn, %{"payment_id" => payment_id}) do
    payment_refunds =
      payment_id |> Payments.get_payment_by_external_id!() |> Payments.list_payment_refunds()

    render(conn, "index.json", payment_refunds: payment_refunds)
  end

  swagger_path(:index) do
    get("/api/v1/refunds")
    operation_id("ListRefunds")
    summary("List refunds")

    description("See parameters for available search filters.")

    produces("application/json")

    parameters do
      reference(
        :query,
        "string",
        "Refund reference to search (exact match, case insensitive)"
      )
    end

    response(200, "OK", Schema.ref(:IndexResponse))
  end

  def index(conn, _params) do
    payment_refunds = Payments.list_payment_refunds()
    render(conn, "index.json", payment_refunds: payment_refunds)
  end
end
