defmodule PayWeb.External.PaymentControllerTest do
  use PayWeb.ConnCase

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

  def fixture(:payment) do
    {:ok, payment} = Payments.create_payment(@create_attrs)
    payment
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all payments", %{conn: conn} do
      conn = get(conn, Routes.external_payment_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create payment" do
    test "renders payment when data is valid", %{conn: conn} do
      conn = post(conn, Routes.external_payment_path(conn, :create), payment: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

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

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.external_payment_path(conn, :create), payment: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end
end
