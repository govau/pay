defmodule PayWeb.CardTypeControllerTest do
  use PayWeb.ConnCase

  alias Pay.Payments
  alias Pay.Payments.CardType

  @create_attrs %{
    brand: "some brand",
    label: "some label",
    requires_3ds: true,
    type: "some type"
  }
  @update_attrs %{
    brand: "some updated brand",
    label: "some updated label",
    requires_3ds: false,
    type: "some updated type"
  }
  @invalid_attrs %{brand: nil, label: nil, requires_3ds: nil, type: nil}

  def fixture(:card_type) do
    {:ok, card_type} = Payments.create_card_type(@create_attrs)
    card_type
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all card_types", %{conn: conn} do
      conn = get(conn, Routes.card_type_path(conn, :index))
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create card_type" do
    test "renders card_type when data is valid", %{conn: conn} do
      conn = post(conn, Routes.card_type_path(conn, :create), card_type: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.card_type_path(conn, :show, id))

      assert %{
               "id" => id,
               "brand" => "some brand",
               "label" => "some label",
               "requires_3ds" => true,
               "type" => "some type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.card_type_path(conn, :create), card_type: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update card_type" do
    setup [:create_card_type]

    test "renders card_type when data is valid", %{
      conn: conn,
      card_type: %CardType{id: id} = card_type
    } do
      conn = put(conn, Routes.card_type_path(conn, :update, card_type), card_type: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.card_type_path(conn, :show, id))

      assert %{
               "id" => id,
               "brand" => "some updated brand",
               "label" => "some updated label",
               "requires_3ds" => false,
               "type" => "some updated type"
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, card_type: card_type} do
      conn = put(conn, Routes.card_type_path(conn, :update, card_type), card_type: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete card_type" do
    setup [:create_card_type]

    test "deletes chosen card_type", %{conn: conn, card_type: card_type} do
      conn = delete(conn, Routes.card_type_path(conn, :delete, card_type))
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, Routes.card_type_path(conn, :show, card_type))
      end
    end
  end

  defp create_card_type(_) do
    card_type = fixture(:card_type)
    {:ok, card_type: card_type}
  end
end
