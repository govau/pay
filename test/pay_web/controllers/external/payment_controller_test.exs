defmodule PayWeb.External.PaymentControllerTest do
  use PayWeb.ConnCase
  use PhoenixSwagger.SchemaTest, "priv/static/swagger.json"

  alias Pay.Payments

  @create_attrs %{
    amount: 42,
    authorised_at: "2010-04-17T14:00:00.000000Z",
    card_brand: "some card_brand",
    card_details: %{},
    created_at: "2010-04-17T14:00:00.000000Z",
    delayed_capture: true,
    description: "some description",
    email: "some email",
    fee: 42,
    gateway_transaction_id: "some gateway_transaction_id",
    metadata: %{},
    net_amount: 42,
    payment_outcome: %{},
    payment_provider: "some payment_provider",
    processor_id: "some processor_id",
    provider_id: "some provider_id",
    reference: "some reference",
    refund_summary: %{},
    return_url: "some return_url",
    settlement_summary: %{},
    state: %{},
    telephone_number: "some telephone_number",
    total_amount: 42
  }
  @invalid_attrs %{
    amount: nil,
    authorised_at: nil,
    card_brand: nil,
    card_details: nil,
    created_at: nil,
    delayed_capture: nil,
    description: nil,
    email: nil,
    fee: nil,
    gateway_account_id: nil,
    gateway_transaction_id: nil,
    metadata: nil,
    net_amount: nil,
    payment_outcome: nil,
    payment_provider: nil,
    processor_id: nil,
    provider_id: nil,
    reference: nil,
    refund_summary: nil,
    return_url: nil,
    settlement_summary: nil,
    state: nil,
    telephone_number: nil,
    total_amount: nil
  }

  def fixture(:gateway_account) do
    {:ok, gateway_account} =
      Payments.create_gateway_account(%{
        "type" => Payments.GatewayAccount.Type.Test.value().name,
        "payment_provider" => Payments.GatewayAccount.PaymentProvider.Sandbox.value().name,
        "service_name" => "Test service"
      })

    gateway_account
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all payments", %{conn: conn, swagger_schema: schema} do
      response =
        conn
        |> get(Routes.external_payment_path(conn, :index))
        |> validate_resp_schema(schema, "IndexResponse")
        |> json_response(200)

      assert response["data"] == []
    end
  end

  describe "create payment" do
    setup [:create_gateway_account]

    test "renders payment when data is valid", %{conn: conn, swagger_schema: schema} do
      response =
        conn
        |> post(Routes.external_payment_path(conn, :create), payment: @create_attrs)
        |> validate_resp_schema(schema, "CreateResponse")
        |> json_response(201)

      assert %{"id" => id} = response["data"]

      conn = get(conn, Routes.external_payment_path(conn, :show, id))

      assert %{
               "amount" => 42,
               "authorised_at" => "2010-04-17T14:00:00.000000Z",
               "card_brand" => "some card_brand",
               "card_details" => %{},
               "created_at" => "2010-04-17T14:00:00.000000Z",
               "delayed_capture" => true,
               "description" => "some description",
               "email" => "some email",
               "fee" => 42,
               "gateway_transaction_id" => "some gateway_transaction_id",
               "metadata" => %{},
               "net_amount" => 42,
               "id" => id,
               "payment_outcome" => %{},
               "payment_provider" => "some payment_provider",
               "processor_id" => "some processor_id",
               "provider_id" => "some provider_id",
               "reference" => "some reference",
               "refund_summary" => %{},
               "return_url" => "some return_url",
               "settlement_summary" => %{},
               "state" => %{},
               "telephone_number" => "some telephone_number",
               "total_amount" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, swagger_schema: schema} do
      response =
        conn
        |> post(Routes.external_payment_path(conn, :create), payment: @invalid_attrs)
        |> validate_resp_schema(schema, "CreateErrorResponse")
        |> json_response(422)

      assert response["errors"] != %{}
    end
  end

  defp create_gateway_account(_) do
    gateway_account = fixture(:gateway_account)
    {:ok, gateway_account: gateway_account}
  end
end
