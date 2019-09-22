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

  describe "gateway_accounts" do
    alias Pay.Charges.GatewayAccount

    @valid_attrs %{
      allow_apple_pay: true,
      allow_google_pay: true,
      allow_zero_amount: 42,
      corporate_credit_card_surcharge_amount: 42,
      corporate_debit_card_surcharge_amount: 42,
      corporate_prepaid_credit_card_surcharge_amount: 42,
      corporate_prepaid_debit_card_surcharge_amount: 42,
      credentials: %{},
      description: "some description",
      integration_version_3ds: 42,
      name: "some name",
      requires_3ds: true,
      service_name: "some service_name",
      type: "some type"
    }
    @update_attrs %{
      allow_apple_pay: false,
      allow_google_pay: false,
      allow_zero_amount: 43,
      corporate_credit_card_surcharge_amount: 43,
      corporate_debit_card_surcharge_amount: 43,
      corporate_prepaid_credit_card_surcharge_amount: 43,
      corporate_prepaid_debit_card_surcharge_amount: 43,
      credentials: %{},
      description: "some updated description",
      integration_version_3ds: 43,
      name: "some updated name",
      requires_3ds: false,
      service_name: "some updated service_name",
      type: "some updated type"
    }
    @invalid_attrs %{
      allow_apple_pay: nil,
      allow_google_pay: nil,
      allow_zero_amount: nil,
      corporate_credit_card_surcharge_amount: nil,
      corporate_debit_card_surcharge_amount: nil,
      corporate_prepaid_credit_card_surcharge_amount: nil,
      corporate_prepaid_debit_card_surcharge_amount: nil,
      credentials: nil,
      description: nil,
      integration_version_3ds: nil,
      name: nil,
      requires_3ds: nil,
      service_name: nil,
      type: nil
    }

    def gateway_account_fixture(attrs \\ %{}) do
      {:ok, gateway_account} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Charges.create_gateway_account()

      gateway_account
    end

    test "list_gateway_accounts/0 returns all gateway_accounts" do
      gateway_account = gateway_account_fixture()
      assert Charges.list_gateway_accounts() == [gateway_account]
    end

    test "get_gateway_account!/1 returns the gateway_account with given id" do
      gateway_account = gateway_account_fixture()
      assert Charges.get_gateway_account!(gateway_account.id) == gateway_account
    end

    test "create_gateway_account/1 with valid data creates a gateway_account" do
      assert {:ok, %GatewayAccount{} = gateway_account} =
               Charges.create_gateway_account(@valid_attrs)

      assert gateway_account.allow_apple_pay == true
      assert gateway_account.allow_google_pay == true
      assert gateway_account.allow_zero_amount == 42
      assert gateway_account.corporate_credit_card_surcharge_amount == 42
      assert gateway_account.corporate_debit_card_surcharge_amount == 42
      assert gateway_account.corporate_prepaid_credit_card_surcharge_amount == 42
      assert gateway_account.corporate_prepaid_debit_card_surcharge_amount == 42
      assert gateway_account.credentials == %{}
      assert gateway_account.description == "some description"
      assert gateway_account.integration_version_3ds == 42
      assert gateway_account.name == "some name"
      assert gateway_account.requires_3ds == true
      assert gateway_account.service_name == "some service_name"
      assert gateway_account.type == "some type"
    end

    test "create_gateway_account/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Charges.create_gateway_account(@invalid_attrs)
    end

    test "update_gateway_account/2 with valid data updates the gateway_account" do
      gateway_account = gateway_account_fixture()

      assert {:ok, %GatewayAccount{} = gateway_account} =
               Charges.update_gateway_account(gateway_account, @update_attrs)

      assert gateway_account.allow_apple_pay == false
      assert gateway_account.allow_google_pay == false
      assert gateway_account.allow_zero_amount == 43
      assert gateway_account.corporate_credit_card_surcharge_amount == 43
      assert gateway_account.corporate_debit_card_surcharge_amount == 43
      assert gateway_account.corporate_prepaid_credit_card_surcharge_amount == 43
      assert gateway_account.corporate_prepaid_debit_card_surcharge_amount == 43
      assert gateway_account.credentials == %{}
      assert gateway_account.description == "some updated description"
      assert gateway_account.integration_version_3ds == 43
      assert gateway_account.name == "some updated name"
      assert gateway_account.requires_3ds == false
      assert gateway_account.service_name == "some updated service_name"
      assert gateway_account.type == "some updated type"
    end

    test "update_gateway_account/2 with invalid data returns error changeset" do
      gateway_account = gateway_account_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Charges.update_gateway_account(gateway_account, @invalid_attrs)

      assert gateway_account == Charges.get_gateway_account!(gateway_account.id)
    end

    test "delete_gateway_account/1 deletes the gateway_account" do
      gateway_account = gateway_account_fixture()
      assert {:ok, %GatewayAccount{}} = Charges.delete_gateway_account(gateway_account)
      assert_raise Ecto.NoResultsError, fn -> Charges.get_gateway_account!(gateway_account.id) end
    end

    test "change_gateway_account/1 returns a gateway_account changeset" do
      gateway_account = gateway_account_fixture()
      assert %Ecto.Changeset{} = Charges.change_gateway_account(gateway_account)
    end
  end

  describe "charges" do
    alias Pay.Charges.Charge

    @valid_attrs %{
      amount: 42,
      auth_3ds_details: %{},
      card_details: %{},
      delayed_capture: true,
      description: "some description",
      email: "some email",
      external_id: "7488a646-e31f-11e4-aace-600308960662",
      external_metadata: %{},
      gateway_transaction_id: "some gateway_transaction_id",
      reference: "some reference",
      return_url: "some return_url",
      status: "some status",
      wallet: "some wallet"
    }
    @update_attrs %{
      amount: 43,
      auth_3ds_details: %{},
      card_details: %{},
      delayed_capture: false,
      description: "some updated description",
      email: "some updated email",
      external_id: "7488a646-e31f-11e4-aace-600308960668",
      external_metadata: %{},
      gateway_transaction_id: "some updated gateway_transaction_id",
      reference: "some updated reference",
      return_url: "some updated return_url",
      status: "some updated status",
      wallet: "some updated wallet"
    }
    @invalid_attrs %{
      amount: nil,
      auth_3ds_details: nil,
      card_details: nil,
      delayed_capture: nil,
      description: nil,
      email: nil,
      external_id: nil,
      external_metadata: nil,
      gateway_transaction_id: nil,
      reference: nil,
      return_url: nil,
      status: nil,
      wallet: nil
    }

    def charge_fixture(attrs \\ %{}) do
      {:ok, charge} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Charges.create_charge()

      charge
    end

    test "list_charges/0 returns all charges" do
      charge = charge_fixture()
      assert Charges.list_charges() == [charge]
    end

    test "get_charge!/1 returns the charge with given id" do
      charge = charge_fixture()
      assert Charges.get_charge!(charge.id) == charge
    end

    test "create_charge/1 with valid data creates a charge" do
      assert {:ok, %Charge{} = charge} = Charges.create_charge(@valid_attrs)
      assert charge.amount == 42
      assert charge.auth_3ds_details == %{}
      assert charge.card_details == %{}
      assert charge.delayed_capture == true
      assert charge.description == "some description"
      assert charge.email == "some email"
      assert charge.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert charge.external_metadata == %{}
      assert charge.gateway_transaction_id == "some gateway_transaction_id"
      assert charge.reference == "some reference"
      assert charge.return_url == "some return_url"
      assert charge.status == "some status"
      assert charge.wallet == "some wallet"
    end

    test "create_charge/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Charges.create_charge(@invalid_attrs)
    end

    test "update_charge/2 with valid data updates the charge" do
      charge = charge_fixture()
      assert {:ok, %Charge{} = charge} = Charges.update_charge(charge, @update_attrs)
      assert charge.amount == 43
      assert charge.auth_3ds_details == %{}
      assert charge.card_details == %{}
      assert charge.delayed_capture == false
      assert charge.description == "some updated description"
      assert charge.email == "some updated email"
      assert charge.external_id == "7488a646-e31f-11e4-aace-600308960668"
      assert charge.external_metadata == %{}
      assert charge.gateway_transaction_id == "some updated gateway_transaction_id"
      assert charge.reference == "some updated reference"
      assert charge.return_url == "some updated return_url"
      assert charge.status == "some updated status"
      assert charge.wallet == "some updated wallet"
    end

    test "update_charge/2 with invalid data returns error changeset" do
      charge = charge_fixture()
      assert {:error, %Ecto.Changeset{}} = Charges.update_charge(charge, @invalid_attrs)
      assert charge == Charges.get_charge!(charge.id)
    end

    test "delete_charge/1 deletes the charge" do
      charge = charge_fixture()
      assert {:ok, %Charge{}} = Charges.delete_charge(charge)
      assert_raise Ecto.NoResultsError, fn -> Charges.get_charge!(charge.id) end
    end

    test "change_charge/1 returns a charge changeset" do
      charge = charge_fixture()
      assert %Ecto.Changeset{} = Charges.change_charge(charge)
    end
  end
end
