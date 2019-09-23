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

  describe "charge_fees" do
    alias Pay.Charges.ChargeFee

    @valid_attrs %{
      amount_collected: 42,
      amount_due: 42,
      collected_at: "2010-04-17T14:00:00.000000Z",
      external_id: "7488a646-e31f-11e4-aace-600308960662",
      gateway_transaction_id: "some gateway_transaction_id"
    }
    @update_attrs %{
      amount_collected: 43,
      amount_due: 43,
      collected_at: "2011-05-18T15:01:01.000000Z",
      external_id: "7488a646-e31f-11e4-aace-600308960668",
      gateway_transaction_id: "some updated gateway_transaction_id"
    }
    @invalid_attrs %{
      amount_collected: nil,
      amount_due: nil,
      collected_at: nil,
      external_id: nil,
      gateway_transaction_id: nil
    }

    def charge_fee_fixture(attrs \\ %{}) do
      {:ok, charge_fee} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Charges.create_charge_fee()

      charge_fee
    end

    test "list_charge_fees/0 returns all charge_fees" do
      charge_fee = charge_fee_fixture()
      assert Charges.list_charge_fees() == [charge_fee]
    end

    test "get_charge_fee!/1 returns the charge_fee with given id" do
      charge_fee = charge_fee_fixture()
      assert Charges.get_charge_fee!(charge_fee.id) == charge_fee
    end

    test "create_charge_fee/1 with valid data creates a charge_fee" do
      assert {:ok, %ChargeFee{} = charge_fee} = Charges.create_charge_fee(@valid_attrs)
      assert charge_fee.amount_collected == 42
      assert charge_fee.amount_due == 42

      assert charge_fee.collected_at ==
               DateTime.from_naive!(~N[2010-04-17T14:00:00.000000Z], "Etc/UTC")

      assert charge_fee.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert charge_fee.gateway_transaction_id == "some gateway_transaction_id"
    end

    test "create_charge_fee/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Charges.create_charge_fee(@invalid_attrs)
    end

    test "update_charge_fee/2 with valid data updates the charge_fee" do
      charge_fee = charge_fee_fixture()

      assert {:ok, %ChargeFee{} = charge_fee} =
               Charges.update_charge_fee(charge_fee, @update_attrs)

      assert charge_fee.amount_collected == 43
      assert charge_fee.amount_due == 43

      assert charge_fee.collected_at ==
               DateTime.from_naive!(~N[2011-05-18T15:01:01.000000Z], "Etc/UTC")

      assert charge_fee.external_id == "7488a646-e31f-11e4-aace-600308960668"
      assert charge_fee.gateway_transaction_id == "some updated gateway_transaction_id"
    end

    test "update_charge_fee/2 with invalid data returns error changeset" do
      charge_fee = charge_fee_fixture()
      assert {:error, %Ecto.Changeset{}} = Charges.update_charge_fee(charge_fee, @invalid_attrs)
      assert charge_fee == Charges.get_charge_fee!(charge_fee.id)
    end

    test "delete_charge_fee/1 deletes the charge_fee" do
      charge_fee = charge_fee_fixture()
      assert {:ok, %ChargeFee{}} = Charges.delete_charge_fee(charge_fee)
      assert_raise Ecto.NoResultsError, fn -> Charges.get_charge_fee!(charge_fee.id) end
    end

    test "change_charge_fee/1 returns a charge_fee changeset" do
      charge_fee = charge_fee_fixture()
      assert %Ecto.Changeset{} = Charges.change_charge_fee(charge_fee)
    end
  end

  describe "charge_events" do
    alias Pay.Charges.ChargeEvent

    @valid_attrs %{status: "some status"}
    @update_attrs %{status: "some updated status"}
    @invalid_attrs %{status: nil}

    def charge_event_fixture(attrs \\ %{}) do
      {:ok, charge_event} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Charges.create_charge_event()

      charge_event
    end

    test "list_charge_events/0 returns all charge_events" do
      charge_event = charge_event_fixture()
      assert Charges.list_charge_events() == [charge_event]
    end

    test "get_charge_event!/1 returns the charge_event with given id" do
      charge_event = charge_event_fixture()
      assert Charges.get_charge_event!(charge_event.id) == charge_event
    end

    test "create_charge_event/1 with valid data creates a charge_event" do
      assert {:ok, %ChargeEvent{} = charge_event} = Charges.create_charge_event(@valid_attrs)
      assert charge_event.status == "some status"
    end

    test "create_charge_event/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Charges.create_charge_event(@invalid_attrs)
    end

    test "update_charge_event/2 with valid data updates the charge_event" do
      charge_event = charge_event_fixture()

      assert {:ok, %ChargeEvent{} = charge_event} =
               Charges.update_charge_event(charge_event, @update_attrs)

      assert charge_event.status == "some updated status"
    end

    test "update_charge_event/2 with invalid data returns error changeset" do
      charge_event = charge_event_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Charges.update_charge_event(charge_event, @invalid_attrs)

      assert charge_event == Charges.get_charge_event!(charge_event.id)
    end

    test "delete_charge_event/1 deletes the charge_event" do
      charge_event = charge_event_fixture()
      assert {:ok, %ChargeEvent{}} = Charges.delete_charge_event(charge_event)
      assert_raise Ecto.NoResultsError, fn -> Charges.get_charge_event!(charge_event.id) end
    end

    test "change_charge_event/1 returns a charge_event changeset" do
      charge_event = charge_event_fixture()
      assert %Ecto.Changeset{} = Charges.change_charge_event(charge_event)
    end
  end

  describe "charge_refunds" do
    alias Pay.Charges.ChargeRefund

    @valid_attrs %{
      amount: 42,
      external_id: "7488a646-e31f-11e4-aace-600308960662",
      gateway_transaction_id: "7488a646-e31f-11e4-aace-600308960662",
      reference: "some reference",
      status: "some status",
      user_external_id: "7488a646-e31f-11e4-aace-600308960662"
    }
    @update_attrs %{
      amount: 43,
      external_id: "7488a646-e31f-11e4-aace-600308960668",
      gateway_transaction_id: "7488a646-e31f-11e4-aace-600308960668",
      reference: "some updated reference",
      status: "some updated status",
      user_external_id: "7488a646-e31f-11e4-aace-600308960668"
    }
    @invalid_attrs %{
      amount: nil,
      external_id: nil,
      gateway_transaction_id: nil,
      reference: nil,
      status: nil,
      user_external_id: nil
    }

    def charge_refund_fixture(attrs \\ %{}) do
      {:ok, charge_refund} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Charges.create_charge_refund()

      charge_refund
    end

    test "list_charge_refunds/0 returns all charge_refunds" do
      charge_refund = charge_refund_fixture()
      assert Charges.list_charge_refunds() == [charge_refund]
    end

    test "get_charge_refund!/1 returns the charge_refund with given id" do
      charge_refund = charge_refund_fixture()
      assert Charges.get_charge_refund!(charge_refund.id) == charge_refund
    end

    test "create_charge_refund/1 with valid data creates a charge_refund" do
      assert {:ok, %ChargeRefund{} = charge_refund} = Charges.create_charge_refund(@valid_attrs)
      assert charge_refund.amount == 42
      assert charge_refund.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert charge_refund.gateway_transaction_id == "7488a646-e31f-11e4-aace-600308960662"
      assert charge_refund.reference == "some reference"
      assert charge_refund.status == "some status"
      assert charge_refund.user_external_id == "7488a646-e31f-11e4-aace-600308960662"
    end

    test "create_charge_refund/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Charges.create_charge_refund(@invalid_attrs)
    end

    test "update_charge_refund/2 with valid data updates the charge_refund" do
      charge_refund = charge_refund_fixture()

      assert {:ok, %ChargeRefund{} = charge_refund} =
               Charges.update_charge_refund(charge_refund, @update_attrs)

      assert charge_refund.amount == 43
      assert charge_refund.external_id == "7488a646-e31f-11e4-aace-600308960668"
      assert charge_refund.gateway_transaction_id == "7488a646-e31f-11e4-aace-600308960668"
      assert charge_refund.reference == "some updated reference"
      assert charge_refund.status == "some updated status"
      assert charge_refund.user_external_id == "7488a646-e31f-11e4-aace-600308960668"
    end

    test "update_charge_refund/2 with invalid data returns error changeset" do
      charge_refund = charge_refund_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Charges.update_charge_refund(charge_refund, @invalid_attrs)

      assert charge_refund == Charges.get_charge_refund!(charge_refund.id)
    end

    test "delete_charge_refund/1 deletes the charge_refund" do
      charge_refund = charge_refund_fixture()
      assert {:ok, %ChargeRefund{}} = Charges.delete_charge_refund(charge_refund)
      assert_raise Ecto.NoResultsError, fn -> Charges.get_charge_refund!(charge_refund.id) end
    end

    test "change_charge_refund/1 returns a charge_refund changeset" do
      charge_refund = charge_refund_fixture()
      assert %Ecto.Changeset{} = Charges.change_charge_refund(charge_refund)
    end
  end

  describe "gateway_account_card_types" do
    alias Pay.Charges.GatewayAccountCardType

    @valid_attrs %{}
    @update_attrs %{}

    def gateway_account_card_type_fixture(attrs \\ %{}) do
      {:ok, gateway_account_card_type} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Charges.create_gateway_account_card_type()

      gateway_account_card_type
    end

    test "list_gateway_account_card_types/0 returns all gateway_account_card_types" do
      gateway_account_card_type = gateway_account_card_type_fixture()
      assert Charges.list_gateway_account_card_types() == [gateway_account_card_type]
    end

    test "get_gateway_account_card_type!/1 returns the gateway_account_card_type with given id" do
      gateway_account_card_type = gateway_account_card_type_fixture()

      assert Charges.get_gateway_account_card_type!(gateway_account_card_type.id) ==
               gateway_account_card_type
    end

    test "create_gateway_account_card_type/1 with valid data creates a gateway_account_card_type" do
      assert {:ok, %GatewayAccountCardType{} = gateway_account_card_type} =
               Charges.create_gateway_account_card_type(@valid_attrs)
    end

    test "update_gateway_account_card_type/2 with valid data updates the gateway_account_card_type" do
      gateway_account_card_type = gateway_account_card_type_fixture()

      assert {:ok, %GatewayAccountCardType{} = gateway_account_card_type} =
               Charges.update_gateway_account_card_type(gateway_account_card_type, @update_attrs)
    end

    test "delete_gateway_account_card_type/1 deletes the gateway_account_card_type" do
      gateway_account_card_type = gateway_account_card_type_fixture()

      assert {:ok, %GatewayAccountCardType{}} =
               Charges.delete_gateway_account_card_type(gateway_account_card_type)

      assert_raise Ecto.NoResultsError, fn ->
        Charges.get_gateway_account_card_type!(gateway_account_card_type.id)
      end
    end

    test "change_gateway_account_card_type/1 returns a gateway_account_card_type changeset" do
      gateway_account_card_type = gateway_account_card_type_fixture()

      assert %Ecto.Changeset{} =
               Charges.change_gateway_account_card_type(gateway_account_card_type)
    end
  end
end
