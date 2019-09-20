defmodule Pay.ChargesTest do
  use Pay.DataCase

  alias Pay.Charges

  describe "card_types" do
    alias Pay.Charges.CardType

    @valid_attrs %{
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

    def card_type_fixture(attrs \\ %{}) do
      {:ok, card_type} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Charges.create_card_type()

      card_type
    end

    test "list_card_types/0 returns all card_types" do
      card_type = card_type_fixture()
      assert Charges.list_card_types() == [card_type]
    end

    test "get_card_type!/1 returns the card_type with given id" do
      card_type = card_type_fixture()
      assert Charges.get_card_type!(card_type.id) == card_type
    end

    test "create_card_type/1 with valid data creates a card_type" do
      assert {:ok, %CardType{} = card_type} = Charges.create_card_type(@valid_attrs)
      assert card_type.brand == "some brand"
      assert card_type.label == "some label"
      assert card_type.requires_3ds == true
      assert card_type.type == "some type"
    end

    test "create_card_type/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Charges.create_card_type(@invalid_attrs)
    end

    test "update_card_type/2 with valid data updates the card_type" do
      card_type = card_type_fixture()
      assert {:ok, %CardType{} = card_type} = Charges.update_card_type(card_type, @update_attrs)
      assert card_type.brand == "some updated brand"
      assert card_type.label == "some updated label"
      assert card_type.requires_3ds == false
      assert card_type.type == "some updated type"
    end

    test "update_card_type/2 with invalid data returns error changeset" do
      card_type = card_type_fixture()
      assert {:error, %Ecto.Changeset{}} = Charges.update_card_type(card_type, @invalid_attrs)
      assert card_type == Charges.get_card_type!(card_type.id)
    end

    test "delete_card_type/1 deletes the card_type" do
      card_type = card_type_fixture()
      assert {:ok, %CardType{}} = Charges.delete_card_type(card_type)
      assert_raise Ecto.NoResultsError, fn -> Charges.get_card_type!(card_type.id) end
    end

    test "change_card_type/1 returns a card_type changeset" do
      card_type = card_type_fixture()
      assert %Ecto.Changeset{} = Charges.change_card_type(card_type)
    end
  end
end
