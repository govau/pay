defmodule PayWeb.CardTypeView do
  use PayWeb, :view
  alias PayWeb.CardTypeView

  def render("index.json", %{card_types: card_types}) do
    %{data: render_many(card_types, CardTypeView, "card_type.json")}
  end

  def render("show.json", %{card_type: card_type}) do
    %{data: render_one(card_type, CardTypeView, "card_type.json")}
  end

  def render("card_type.json", %{card_type: card_type}) do
    %{
      id: card_type.id,
      type: card_type.type,
      brand: card_type.brand,
      label: card_type.label,
      requires_3ds: card_type.requires_3ds
    }
  end
end
