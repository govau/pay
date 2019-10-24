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
            id(:string, "The ID of the payment", format: "uuid")
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
      CreateRequest:
        swagger_schema do
          title("CreateRequest")
          description("Request schema for create operation")
          property(:payment, Schema.ref(:Payment))
        end,
      Error:
        swagger_schema do
          title("Errors")
          description("Error responses from the API")

          properties do
            error(:string, "The message of the error raised", required: true)
          end
        end
    }
  end

  swagger_path(:index) do
    get("/api/v1/payments")
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

  def index(conn, %{"reference" => _reference}) do
    payments = Payments.list_payments()
    render(conn, "index.json", payments: payments)
  end

  swagger_path(:create) do
    post("/api/v1/payments")
    summary("Create payment")
    description("The payment will be associated with the account in the authentication token.")
    consumes("application/json")
    produces("application/json")

    parameters do
      payment(:body, Schema.ref(:CreateRequest), "", required: true)
    end

    response(201, "OK", Schema.ref(:Payment))
    response(422, "Unprocessable Entity", Schema.ref(:Error))
  end

  def create(conn, %{"payment" => payment_params}) do
    # TODO: just getting one for tests to pass but this should be autoset from
    # the auth token.
    gateway_accounts = Payments.list_gateway_accounts()
    gateway_account = List.first(gateway_accounts)

    with {:ok, %Payment{} = payment} <-
           Payments.create_payment(
             Map.merge(payment_params, %{
               "gateway_account_id" => gateway_account.id,
               "status" => "TODO",
               "auth_3ds_details" => %{},
               "external_metadata" => %{},
               "wallet" => "TODO"
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
