defmodule PayWeb.CardTypeController do
  use PayWeb, :controller

  alias Pay.Charges
  alias Pay.Charges.CardType

  action_fallback PayWeb.FallbackController

  def index(conn, _params) do
    card_types = Charges.list_card_types()
    render(conn, "index.json", card_types: card_types)
  end

  def create(conn, %{"card_type" => card_type_params}) do
    with {:ok, %CardType{} = card_type} <- Charges.create_card_type(card_type_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.card_type_path(conn, :show, card_type))
      |> render("show.json", card_type: card_type)
    end
  end

  def show(conn, %{"id" => id}) do
    card_type = Charges.get_card_type!(id)
    render(conn, "show.json", card_type: card_type)
  end

  def update(conn, %{"id" => id, "card_type" => card_type_params}) do
    card_type = Charges.get_card_type!(id)

    with {:ok, %CardType{} = card_type} <- Charges.update_card_type(card_type, card_type_params) do
      render(conn, "show.json", card_type: card_type)
    end
  end

  def delete(conn, %{"id" => id}) do
    card_type = Charges.get_card_type!(id)

    with {:ok, %CardType{}} <- Charges.delete_card_type(card_type) do
      send_resp(conn, :no_content, "")
    end
  end
end
