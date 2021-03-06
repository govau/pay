defmodule Pay.PaymentsTest do
  use Pay.DataCase

  import Pay.Fixtures

  alias Pay.Payments
  alias Pay.Support.Associations

  defp create_gateway_account(_context) do
    gateway_account = fixture(:gateway_account)
    [gateway_account: gateway_account]
  end

  defp create_payment(%{gateway_account: gateway_account}) do
    payment = fixture(:payment, gateway_account)
    [payment: Associations.clear(payment, :events)]
  end

  defp create_payment_event(%{payment: payment}) do
    {:ok, payment_event} =
      Payments.create_payment_event(%{payment_id: payment.id, status: "created"})

    [payment_event: payment_event]
  end

  defp create_payment_refund(%{payment: payment}) do
    {:ok, payment_refund} =
      Payments.create_payment_refund(payment, %{
        payment_id: payment.id,
        amount: 42,
        external_id: "7488a646-e31f-11e4-aace-600308960662",
        gateway_transaction_id: "7488a646-e31f-11e4-aace-600308960662",
        reference: "some reference",
        status: "some status",
        user_external_id: "7488a646-e31f-11e4-aace-600308960662"
      })

    [payment_refund: Associations.clear(payment_refund)]
  end

  defp create_card_type(_context) do
    {:ok, card_type} =
      Payments.create_card_type(%{
        id: 1,
        label: "Mastercard",
        brand: "Mastercard",
        requires_3ds: true,
        type: "CREDIT"
      })
    [card_type: card_type]
  end

  defp create_gateway_account_card_type(%{gateway_account: gateway_account, card_type: card_type}) do
    {:ok, gateway_account_card_type} =
      Payments.create_gateway_account_card_type(%{
        gateway_account_id: gateway_account.id,
        card_type_id: card_type.id
      })
    [gateway_account_card_type: gateway_account_card_type]
  end


  describe "card_types" do
    alias Pay.Payments.CardType

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
        |> Payments.create_card_type()

      card_type
    end

    test "list_card_types/0 returns all card_types" do
      card_type = card_type_fixture()
      assert Payments.list_card_types() == [card_type]
    end

    test "get_card_type!/1 returns the card_type with given id" do
      card_type = card_type_fixture()
      assert Payments.get_card_type!(card_type.id) == card_type
    end

    test "create_card_type/1 with valid data creates a card_type" do
      assert {:ok, %CardType{} = card_type} = Payments.create_card_type(@valid_attrs)
      assert card_type.brand == "some brand"
      assert card_type.label == "some label"
      assert card_type.requires_3ds == true
      assert card_type.type == "some type"
    end

    test "create_card_type/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Payments.create_card_type(@invalid_attrs)
    end

    test "update_card_type/2 with valid data updates the card_type" do
      card_type = card_type_fixture()
      assert {:ok, %CardType{} = card_type} = Payments.update_card_type(card_type, @update_attrs)
      assert card_type.brand == "some updated brand"
      assert card_type.label == "some updated label"
      assert card_type.requires_3ds == false
      assert card_type.type == "some updated type"
    end

    test "update_card_type/2 with invalid data returns error changeset" do
      card_type = card_type_fixture()
      assert {:error, %Ecto.Changeset{}} = Payments.update_card_type(card_type, @invalid_attrs)
      assert card_type == Payments.get_card_type!(card_type.id)
    end

    test "delete_card_type/1 deletes the card_type" do
      card_type = card_type_fixture()
      assert {:ok, %CardType{}} = Payments.delete_card_type(card_type)
      assert_raise Ecto.NoResultsError, fn -> Payments.get_card_type!(card_type.id) end
    end

    test "change_card_type/1 returns a card_type changeset" do
      card_type = card_type_fixture()
      assert %Ecto.Changeset{} = Payments.change_card_type(card_type)
    end
  end

  describe "gateway_accounts" do
    alias Pay.Payments.GatewayAccount

    @valid_attrs %{
      allow_apple_pay: true,
      allow_google_pay: true,
      allow_zero_amount: true,
      credentials: %{},
      description: "some description",
      external_id: "7488a646-e31f-11e4-aace-600308960662",
      integration_version_3ds: 42,
      payment_provider: "some payment_provider",
      requires_3ds: true,
      service_name: "some service_name",
      type: "some type"
    }
    @update_attrs %{
      allow_apple_pay: false,
      allow_google_pay: false,
      allow_zero_amount: false,
      credentials: %{},
      description: "some updated description",
      external_id: "7488a646-e31f-11e4-aace-600308960668",
      integration_version_3ds: 43,
      payment_provider: "some updated payment_provider",
      requires_3ds: false,
      service_name: "some updated service_name",
      type: "some updated type"
    }
    @invalid_attrs %{
      allow_apple_pay: nil,
      allow_google_pay: nil,
      allow_zero_amount: nil,
      credentials: nil,
      description: nil,
      external_id: nil,
      integration_version_3ds: nil,
      payment_provider: nil,
      requires_3ds: nil,
      service_name: nil,
      type: nil
    }

    def gateway_account_fixture(attrs \\ %{}) do
      {:ok, gateway_account} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Payments.create_gateway_account()

      gateway_account
    end

    test "list_gateway_accounts/0 returns all gateway_accounts" do
      gateway_account = gateway_account_fixture()
      assert Payments.list_gateway_accounts() == [gateway_account]
    end

    test "get_gateway_account!/1 returns the gateway_account with given id" do
      gateway_account = gateway_account_fixture()
      assert Payments.get_gateway_account!(gateway_account.id) == gateway_account
    end

    test "get_gateway_account_by_external_id!/1 returns the gateway_account with given external_id" do
      gateway_account = gateway_account_fixture()

      assert Payments.get_gateway_account_by_external_id!(gateway_account.external_id) ==
               gateway_account
    end

    test "create_gateway_account/1 with valid data creates a gateway_account" do
      assert {:ok, %GatewayAccount{} = gateway_account} =
               Payments.create_gateway_account(@valid_attrs)

      assert gateway_account.allow_apple_pay == true
      assert gateway_account.allow_google_pay == true
      assert gateway_account.allow_zero_amount == true
      assert gateway_account.credentials == %{}
      assert gateway_account.description == "some description"
      assert gateway_account.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert gateway_account.integration_version_3ds == 42
      assert gateway_account.payment_provider == "some payment_provider"
      assert gateway_account.requires_3ds == true
      assert gateway_account.service_name == "some service_name"
      assert gateway_account.type == "some type"
    end

    test "create_gateway_account/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Payments.create_gateway_account(@invalid_attrs)
    end

    test "update_gateway_account/2 with valid data updates the gateway_account" do
      gateway_account = gateway_account_fixture()

      assert {:ok, %GatewayAccount{} = gateway_account} =
               Payments.update_gateway_account(gateway_account, @update_attrs)

      assert gateway_account.allow_apple_pay == false
      assert gateway_account.allow_google_pay == false
      assert gateway_account.allow_zero_amount == false
      assert gateway_account.credentials == %{}
      assert gateway_account.description == "some updated description"
      assert gateway_account.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert gateway_account.integration_version_3ds == 43
      assert gateway_account.payment_provider == "some updated payment_provider"
      assert gateway_account.requires_3ds == false
      assert gateway_account.service_name == "some updated service_name"
      assert gateway_account.type == "some updated type"
    end

    test "update_gateway_account/2 with invalid data returns error changeset" do
      gateway_account = gateway_account_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Payments.update_gateway_account(gateway_account, @invalid_attrs)

      assert gateway_account == Payments.get_gateway_account!(gateway_account.id)
    end

    test "delete_gateway_account/1 deletes the gateway_account" do
      gateway_account = gateway_account_fixture()
      assert {:ok, %GatewayAccount{}} = Payments.delete_gateway_account(gateway_account)

      assert_raise Ecto.NoResultsError, fn ->
        Payments.get_gateway_account!(gateway_account.id)
      end
    end
  end

  describe "payments" do
    alias Pay.Payments.Payment
    setup [:create_gateway_account, :create_payment]

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
      status: "created",
      wallet: "some wallet"
    }
    @update_attrs %{
      amount: 43,
      auth_3ds_details: %{},
      card_details: %{},
      delayed_capture: false,
      description: "some updated description",
      email: "some updated email",
      external_id: "7488a646-e31f-11e4-aace-600308960662",
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

    def payment_fixture(attrs \\ %{}) do
      gateway_account = fixture(:gateway_account)

      {:ok, payment} =
        attrs
        |> Enum.into(
          Map.merge(@valid_attrs, %{
            gateway_account_id: gateway_account.id
          })
        )
        |> Payments.create_payment()

      {gateway_account, payment}
    end

    test "list_payments/0 returns all payments", %{payment: payment} do
      assert Payments.list_payments() == [payment]
    end

    test "list_payments_by_gateway_account_external_id/1 returns all payments", %{
      gateway_account: gateway_account,
      payment: payment
    } do
      assert Payments.list_payments_by_gateway_account_external_id(gateway_account.external_id) ==
               [payment]
    end

    test "get_payment!/1 returns the payment with given id", %{payment: payment} do
      assert Payments.get_payment!(payment.id) == payment
    end

    test "get_payment_by_external_id!/1 returns the payment with given external_id", %{
      payment: payment
    } do
      assert Payments.get_payment_by_external_id!(payment.external_id) == payment
    end

    test "create_payment/1 with valid data creates a payment", %{gateway_account: gateway_account} do
      assert {:ok, %Payment{} = payment} =
               Payments.create_payment(
                 Map.merge(
                   @valid_attrs,
                   %{
                     gateway_account_id: gateway_account.id
                   }
                 )
               )

      assert payment.amount == 42
      assert payment.auth_3ds_details == %{}
      assert payment.card_details == %{}
      assert payment.delayed_capture == true
      assert payment.description == "some description"
      assert payment.email == "some email"
      assert payment.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert payment.external_metadata == %{}
      assert payment.gateway_transaction_id == "some gateway_transaction_id"
      assert payment.reference == "some reference"
      assert payment.return_url == "some return_url"
      assert payment.status == "created"
      assert payment.wallet == "some wallet"
    end

    test "create_payment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Payments.create_payment(@invalid_attrs)
    end

    test "update_payment/3 changes status according to transition", %{payment: payment} do
      submit_payment = "submit_payment"

      assert {:ok, %Payment{} = updated_payment} =
               Payments.update_payment(payment, submit_payment, @update_attrs)

      assert updated_payment != payment

      payment_status = Payment.Statuses.from_string!(payment.status)

      expected_status =
        payment_status
        |> Pay.Payments.Payment.Statuses.transition(submit_payment)
        |> Pay.Payments.Payment.Statuses.status()

      assert updated_payment == %{
               payment
               | status: expected_status,
                 gateway_transaction_id: @update_attrs.gateway_transaction_id,
                 updated_at: updated_payment.updated_at
             }
    end

    test "update_payment/3 only permits specific transitions", %{payment: payment} do
      assert catch_error(Payments.update_payment(payment, "start", @update_attrs))
      assert catch_error(Payments.update_payment(payment, "finish", @update_attrs))
      assert catch_error(Payments.update_payment(payment, "whatever", @update_attrs))
      assert catch_error(Payments.update_payment(payment, "end", @update_attrs))

      assert {:ok, payment} = Payments.update_payment(payment, "submit_payment", @update_attrs)
      assert {:ok, payment} = Payments.update_payment(payment, "payment_succeeded", @update_attrs)
    end

    test "update_payment/3 creates a payment event when updated", %{payment: payment} do
      assert {:ok, payment} = Payments.update_payment(payment, "submit_payment", @update_attrs)
      [event, created] = Payments.list_payment_events(payment)
      assert Payments.list_payment_events() == [created, event]

      assert {:ok, payment} = Payments.update_payment(payment, "payment_succeeded", @update_attrs)
      [event2, ^event, ^created] = Payments.list_payment_events(payment)
      assert Payments.list_payment_events() == [created, event, event2]
    end
  end

  describe "payment_fees" do
    alias Pay.Payments.PaymentFee

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

    def payment_fee_fixture(attrs \\ %{}) do
      {:ok, payment_fee} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Payments.create_payment_fee()

      payment_fee
    end

    test "list_payment_fees/0 returns all payment_fees" do
      payment_fee = payment_fee_fixture()
      assert Payments.list_payment_fees() == [payment_fee]
    end

    test "get_payment_fee!/1 returns the payment_fee with given id" do
      payment_fee = payment_fee_fixture()
      assert Payments.get_payment_fee!(payment_fee.id) == payment_fee
    end

    test "create_payment_fee/1 with valid data creates a payment_fee" do
      assert {:ok, %PaymentFee{} = payment_fee} = Payments.create_payment_fee(@valid_attrs)
      assert payment_fee.amount_collected == 42
      assert payment_fee.amount_due == 42

      assert payment_fee.collected_at ==
               DateTime.from_naive!(~N[2010-04-17T14:00:00.000000Z], "Etc/UTC")

      assert payment_fee.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert payment_fee.gateway_transaction_id == "some gateway_transaction_id"
    end

    test "create_payment_fee/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Payments.create_payment_fee(@invalid_attrs)
    end

    test "update_payment_fee/2 with valid data updates the payment_fee" do
      payment_fee = payment_fee_fixture()

      assert {:ok, %PaymentFee{} = payment_fee} =
               Payments.update_payment_fee(payment_fee, @update_attrs)

      assert payment_fee.amount_collected == 43
      assert payment_fee.amount_due == 43

      assert payment_fee.collected_at ==
               DateTime.from_naive!(~N[2011-05-18T15:01:01.000000Z], "Etc/UTC")

      assert payment_fee.external_id == "7488a646-e31f-11e4-aace-600308960668"
      assert payment_fee.gateway_transaction_id == "some updated gateway_transaction_id"
    end

    test "update_payment_fee/2 with invalid data returns error changeset" do
      payment_fee = payment_fee_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Payments.update_payment_fee(payment_fee, @invalid_attrs)

      assert payment_fee == Payments.get_payment_fee!(payment_fee.id)
    end

    test "delete_payment_fee/1 deletes the payment_fee" do
      payment_fee = payment_fee_fixture()
      assert {:ok, %PaymentFee{}} = Payments.delete_payment_fee(payment_fee)
      assert_raise Ecto.NoResultsError, fn -> Payments.get_payment_fee!(payment_fee.id) end
    end

    test "change_payment_fee/1 returns a payment_fee changeset" do
      payment_fee = payment_fee_fixture()
      assert %Ecto.Changeset{} = Payments.change_payment_fee(payment_fee)
    end
  end

  describe "payment_events" do
    setup [:create_gateway_account, :create_payment, :create_payment_event]

    alias Pay.Payments.PaymentEvent

    @valid_attrs %{status: "some status"}
    @update_attrs %{status: "some updated status"}
    @invalid_attrs %{status: nil}

    test "list_payment_events/0 returns all payment_events", context do
      payment_event = context[:payment_event]
      assert [_created, ^payment_event] = Payments.list_payment_events()
    end

    test "get_payment_event!/1 returns the payment_event with given id", context do
      payment_event = context[:payment_event]
      assert Payments.get_payment_event!(payment_event.id) == payment_event
    end

    test "create_payment_event/1 with valid data creates a payment_event", %{payment: payment} do
      assert {:ok, %PaymentEvent{} = payment_event} =
               Payments.create_payment_event(Map.merge(@valid_attrs, %{payment_id: payment.id}))

      assert payment_event.status == "some status"
    end

    test "create_payment_event/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Payments.create_payment_event(@invalid_attrs)
    end

    test "update_payment_event/2 with valid data updates the payment_event", context do
      payment_event = context[:payment_event]

      assert {:ok, %PaymentEvent{} = payment_event} =
               Payments.update_payment_event(payment_event, @update_attrs)

      assert payment_event.status == "some updated status"
    end

    test "update_payment_event/2 with invalid data returns error changeset", context do
      payment_event = context[:payment_event]

      assert {:error, %Ecto.Changeset{}} =
               Payments.update_payment_event(payment_event, @invalid_attrs)

      assert payment_event == Payments.get_payment_event!(payment_event.id)
    end

    test "delete_payment_event/1 deletes the payment_event", context do
      payment_event = context[:payment_event]
      assert {:ok, %PaymentEvent{}} = Payments.delete_payment_event(payment_event)
      assert_raise Ecto.NoResultsError, fn -> Payments.get_payment_event!(payment_event.id) end
    end

    test "change_payment_event/1 returns a payment_event changeset", context do
      payment_event = context[:payment_event]
      assert %Ecto.Changeset{} = Payments.change_payment_event(payment_event)
    end
  end

  describe "payment_refunds" do
    setup [:create_gateway_account, :create_payment, :create_payment_refund]

    alias Pay.Payments.PaymentRefund

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

    test "list_payment_refunds/0 returns all payment_refunds", %{payment_refund: payment_refund} do
      assert Payments.list_payment_refunds() == [payment_refund]
    end

    test "get_payment_refund!/1 returns the payment_refund with given id", %{
      payment_refund: payment_refund
    } do
      assert Payments.get_payment_refund!(payment_refund.id) == payment_refund
    end

    test "create_payment_refund/1 with valid data creates a payment_refund", %{
      payment_refund: payment_refund
    } do
      assert payment_refund.amount == 42
      assert payment_refund.gateway_transaction_id == "7488a646-e31f-11e4-aace-600308960662"
      assert payment_refund.reference == "some reference"
      assert payment_refund.status == "created"
      assert payment_refund.user_external_id == "7488a646-e31f-11e4-aace-600308960662"
    end

    test "create_payment_refund/1 also creates a refund event", %{
      payment: payment,
      payment_refund: payment_refund
    } do
      [refund_event, _created] = Payments.list_payment_events(payment)
      assert refund_event.status == "created"
      assert refund_event.payment_id == payment.id
      assert refund_event.payment_refund_id == payment_refund.id
    end

    test "create_payment_refund/1 with invalid data returns error changeset", %{payment: payment} do
      assert {:error, %Ecto.Changeset{}} = Payments.create_payment_refund(payment, @invalid_attrs)
    end

    test "update_payment_refund/2 with valid data updates the payment_refund", %{
      payment_refund: fixture_payment_refund
    } do
      assert {:ok, %PaymentRefund{} = payment_refund} =
               Payments.update_payment_refund(
                 fixture_payment_refund,
                 "refund_succeeded",
                 @update_attrs
               )

      # ensure does not change
      assert payment_refund.amount == 42
      assert payment_refund.external_id == fixture_payment_refund.external_id
      assert payment_refund.gateway_transaction_id == "7488a646-e31f-11e4-aace-600308960662"
      assert payment_refund.reference == "some reference"
      assert payment_refund.user_external_id == "7488a646-e31f-11e4-aace-600308960662"

      assert payment_refund.status == "success"
    end

    test "update_payment_refund/2 with dodgy data only changes status", %{
      payment_refund: payment_refund
    } do
      assert {:ok, refund} =
               Payments.update_payment_refund(
                 payment_refund,
                 "refund_succeeded",
                 @invalid_attrs
               )

      # only these two fields should change
      payment_refund = %{payment_refund | status: "success", updated_at: refund.updated_at}

      assert refund == payment_refund
      assert payment_refund == Payments.get_payment_refund!(payment_refund.id)
    end

    test "delete_payment_refund/1 fails while event exists the payment_refund", %{
      payment_refund: payment_refund
    } do
      payment_refund_id = payment_refund.id
      assert_raise Ecto.ConstraintError, fn -> Payments.delete_payment_refund(payment_refund) end
      assert %{id: ^payment_refund_id} = Payments.get_payment_refund!(payment_refund_id)

      [refund_event, _create_event] =
        payment_refund.payment_id
        |> Payments.get_payment!()
        |> Payments.list_payment_events()

      assert {:ok, _event} = Payments.delete_payment_event(refund_event)

      assert {:ok, %PaymentRefund{}} = Payments.delete_payment_refund(payment_refund)
      assert_raise Ecto.NoResultsError, fn -> Payments.get_payment_refund!(payment_refund.id) end
    end

    test "change_payment_refund/1 returns a payment_refund changeset", %{
      payment_refund: payment_refund
    } do
      assert %Ecto.Changeset{} = Payments.change_payment_refund(payment_refund)
    end
  end

  describe "gateway_account_card_types" do
    setup [:create_gateway_account, :create_card_type, :create_gateway_account_card_type]

    alias Pay.Payments.GatewayAccountCardType


    def gateway_account_card_type_fixture(attrs \\ %{}) do
      {:ok, gateway_account_card_type} = Payments.create_gateway_account_card_type(attrs)
      gateway_account_card_type
    end

    test "list_gateway_account_card_types/0 returns all gateway_account_card_types", %{gateway_account_card_type: gateway_account_card_type} do
      assert Payments.list_gateway_account_card_types() == [gateway_account_card_type]
    end

    test "get_gateway_account_card_type!/1 returns the gateway_account_card_type with given id", %{
      gateway_account: gateway_account,
      card_type: card_type
    } do
      gateway_account_card_type = gateway_account_card_type_fixture(%{
        gateway_account_id: gateway_account.id,
        card_type_id: card_type.id
      })

      assert Payments.get_gateway_account_card_type!(gateway_account_card_type.id) ==
               gateway_account_card_type
    end

    test "create_gateway_account_card_type/1 with valid data creates a gateway_account_card_type", %{
      gateway_account: gateway_account,
      card_type: card_type,
      gateway_account_card_type: gateway_account_card_type
    } do

        assert gateway_account_card_type.gateway_account_id == gateway_account.id
        assert gateway_account_card_type.card_type_id == card_type.id
    end

    test "clear_gateway_account_card_types/1 clears the gateway_account_card_type for given gateway_account_id", %{
      gateway_account_card_type: gateway_account_card_type
    }  do

      assert {:ok, 1} = Payments.clear_gateway_account_card_types(gateway_account_card_type.gateway_account_id)
      assert_raise Ecto.NoResultsError, fn ->
        Payments.get_gateway_account_card_type!(gateway_account_card_type.id)
      end
    end

    test "delete_gateway_account_card_type/1 deletes the gateway_account_card_type", %{
      gateway_account: gateway_account,
      card_type: card_type
    }  do

      gateway_account_card_type = gateway_account_card_type_fixture(%{
        gateway_account_id: gateway_account.id,
        card_type_id: card_type.id
      })

      assert {:ok, %GatewayAccountCardType{}} =
               Payments.delete_gateway_account_card_type(gateway_account_card_type)

      assert_raise Ecto.NoResultsError, fn ->
        Payments.get_gateway_account_card_type!(gateway_account_card_type.id)
      end
    end
  end
end
