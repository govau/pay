defmodule PayWeb.External.PaymentController do
  use PayWeb, :controller
  use PhoenixSwagger

  alias Pay.Payments
  alias Pay.Payments.Payment

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
            metadata(:object, "Additional metadata to associate with the payment")
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
            metadata(:object, "Additional metadata to associate with the payment")
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
    get("/api/v1/payments")
    operation_id("ListPayments")
    summary("List payments")

    description("See parameters for available search filters.")

    produces("application/json")

    parameters do
      reference(
        :query,
        "string",
        "Payment reference to search (exact match, case insensitive)"
      )
    end

    response(200, "OK", Schema.ref(:IndexResponse))
  end

  def index(conn, _params) do
    payments = Payments.list_payments()
    render(conn, "index.json", payments: payments)
  end

  swagger_path(:create) do
    post("/api/v1/payments")
    operation_id("CreatePayment")
    summary("Create payment")
    description("The payment will be associated with the account in the authentication token.")
    consumes("application/json")
    produces("application/json")

    parameters do
      payment(:body, Schema.ref(:CreateRequest), "", required: true)
    end

    response(201, "OK", Schema.ref(:CreateResponse))
    response(422, "Unprocessable Entity", Schema.ref(:CreateErrorResponse))
  end

  def create(conn, %{"payment" => payment_params}) do
    with {:ok, %Payment{} = payment} <-
           Payments.create_payment(
             Map.merge(payment_params, %{
               # TODO: should be autoset from the auth token.
               #  "gateway_account_id" => gateway_account.id,
               "auth_3ds_details" => %{},
               "external_metadata" => payment_params["metadata"] || %{}
             })
           ) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.external_payment_path(conn, :show, payment))
      |> render("show.json", payment: payment)
    end
  end

  swagger_path(:show) do
    get("/api/v1/payments/{id}")
    operation_id("GetPayment")
    summary("Show payment")
    description("Retrieve information about the payment with the given ID.")
    produces("application/json")

    parameter(:id, :path, :string, "Payment ID",
      required: true,
      format: "uuid",
      example: "5adc6f55-5b86-45be-b9d7-e70029e2d529"
    )

    response(200, "OK", Schema.ref(:ShowResponse),
      example: %{
        data: %{
          id: "5adc6f55-5b86-45be-b9d7-e70029e2d529"
        }
      }
    )
  end

  def show(conn, %{"id" => id}) do
    payment = Payments.get_payment_by_external_id!(id)
    render(conn, "show.json", payment: payment)
  end
end
