defmodule Pay.Payments do
  @moduledoc """
  The Payments context.
  """

  import Ecto.Query, warn: false
  alias Ecto.Multi
  alias Pay.Repo
  alias Pay.Payments
  alias Pay.Services.{ServiceGatewayAccount, Service}

  alias Pay.Payments.{
    Payment,
    PaymentEvent,
    GatewayAccount,
    CardType,
    PaymentFee,
    PaymentRefund,
    GatewayAccountCardType
  }

  @doc """
  Returns the list of card_types.

  ## Examples

      iex> list_card_types()
      [%CardType{}, ...]

  """
  def list_card_types do
    Repo.all(CardType)
  end

  @doc """
  Gets a single card_type.

  Raises `Ecto.NoResultsError` if the Card type does not exist.

  ## Examples

      iex> get_card_type!(123)
      %CardType{}

      iex> get_card_type!(456)
      ** (Ecto.NoResultsError)

  """
  def get_card_type!(id), do: Repo.get!(CardType, id)

  @doc """
  Creates a card_type.

  ## Examples

      iex> create_card_type(%{field: value})
      {:ok, %CardType{}}

      iex> create_card_type(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_card_type(attrs \\ %{}) do
    %CardType{}
    |> CardType.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a card_type.

  ## Examples

      iex> update_card_type(card_type, %{field: new_value})
      {:ok, %CardType{}}

      iex> update_card_type(card_type, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_card_type(%CardType{} = card_type, attrs) do
    card_type
    |> CardType.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a CardType.

  ## Examples

      iex> delete_card_type(card_type)
      {:ok, %CardType{}}

      iex> delete_card_type(card_type)
      {:error, %Ecto.Changeset{}}

  """
  def delete_card_type(%CardType{} = card_type) do
    Repo.delete(card_type)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking card_type changes.

  ## Examples

      iex> change_card_type(card_type)
      %Ecto.Changeset{source: %CardType{}}

  """
  def change_card_type(%CardType{} = card_type) do
    CardType.changeset(card_type, %{})
  end

  @doc """
  Returns the list of gateway_accounts.

  ## Examples

      iex> list_gateway_accounts()
      [%GatewayAccount{}, ...]

  """
  def list_gateway_accounts do
    Repo.all(GatewayAccount)
  end

  @doc """
  Returns the list of gateway_accounts for the given service external_id.

  ## Examples

      iex> list_gateway_accounts_by_service_external_id("3bfd1a3c-0960-49da-be66-053b159df62e")
      [%GatewayAccount{}, ...]

  """
  @spec list_gateway_accounts_by_service_external_id(String.t()) :: [%GatewayAccount{}]
  def list_gateway_accounts_by_service_external_id(external_id) do
    Repo.all(
      from ga in GatewayAccount,
        left_join: sga in ServiceGatewayAccount,
        on: ga.external_id == sga.gateway_account_id,
        left_join: s in Service,
        on: sga.service_id == s.id,
        where: s.external_id == ^external_id
    )
  end

  @doc """
  Gets a single gateway_account.

  Raises `Ecto.NoResultsError` if the Gateway account does not exist.

  ## Examples

      iex> get_gateway_account!(123)
      %GatewayAccount{}

      iex> get_gateway_account!(456)
      ** (Ecto.NoResultsError)

  """
  def get_gateway_account!(id), do: Repo.get!(GatewayAccount, id)

  @doc """
  Gets a single gateway_account by the given external ID.

  Raises `Ecto.NoResultsError` if the GatewayAccount does not exist.

  ## Examples

      iex> get_gateway_account_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62d")
      %GatewayAccount{}

      iex> get_gateway_account_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62e")
      ** (Ecto.NoResultsError)

  """
  def get_gateway_account_by_external_id!(external_id),
    do: Repo.get_by!(GatewayAccount, external_id: external_id)

  @doc """
  Creates a gateway_account.

  ## Examples

      iex> create_gateway_account(%{field: value})
      {:ok, %GatewayAccount{}}

      iex> create_gateway_account(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_gateway_account(attrs \\ %{}) do
    %GatewayAccount{
      external_id: Ecto.UUID.generate(),
      credentials: %{}
    }
    |> GatewayAccount.create_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a gateway_account.

  ## Examples

      iex> update_gateway_account(gateway_account, %{field: new_value})
      {:ok, %GatewayAccount{}}

      iex> update_gateway_account(gateway_account, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_gateway_account(%GatewayAccount{} = gateway_account, attrs) do
    gateway_account
    |> GatewayAccount.update_changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a GatewayAccount.

  ## Examples

      iex> delete_gateway_account(gateway_account)
      {:ok, %GatewayAccount{}}

      iex> delete_gateway_account(gateway_account)
      {:error, %Ecto.Changeset{}}

  """
  def delete_gateway_account(%GatewayAccount{} = gateway_account) do
    Repo.delete(gateway_account)
  end

  defp query_payments() do
    from(Payment, preload: :gateway_account)
  end

  @doc """
  Returns the list of payments.

  ## Examples

      iex> list_payments()
      [%Payment{}, ...]

  """
  def list_payments do
    Repo.all(query_payments())
  end

  def list_payments_for_gateway_account(%GatewayAccount{} = gateway_account) do
    with %{payments: payments} <-
           Repo.preload(gateway_account, payments: from(Payment, order_by: [desc: :inserted_at])) do
      payments
    end
  end

  @doc """
  Returns the list of payments for the given gateway_account external_id.

  ## Examples

      iex> list_payments_by_gateway_account_external_id("3bfd1a3c-0960-49da-be66-053b159df62e")
      [%Payment{}, ...]

  """
  def list_payments_by_gateway_account_external_id(external_id) do
    Repo.all(
      from p in Payment,
        left_join: ga in GatewayAccount,
        on: p.gateway_account_id == ga.id,
        where: ga.external_id == ^external_id,
        order_by: [desc: p.inserted_at],
        preload: [:gateway_account]
    )
  end

  @doc """
  Gets a single payment.

  Raises `Ecto.NoResultsError` if the Payment does not exist.

  ## Examples

      iex> get_payment!(123)
      %Payment{}

      iex> get_payment!(456)
      ** (Ecto.NoResultsError)

  """
  def get_payment!(id), do: Repo.get!(query_payments(), id)

  @doc """
  Gets a single payment by the given external ID.

  Raises `Ecto.NoResultsError` if the Payment does not exist.

  ## Examples

      iex> get_payment_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62d")
      %Payment{}

      iex> get_payment_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62e")
      ** (Ecto.NoResultsError)

  """
  def get_payment_by_external_id!(external_id),
    do: Repo.get_by!(query_payments(), external_id: external_id)

  defp create_payment_changeset(attrs) do
    alias Payments.Payment.Statuses
    created = Statuses.initial() |> Statuses.status()

    Payment.create_changeset(
      %Payment{
        external_id: Ecto.UUID.generate(),
        external_metadata: %{},
        status: created,
        events: [
          %{status: created}
        ]
      },
      attrs
    )
  end

  @doc """
  Creates a payment and an associated payment_event.
  ## Examples
      iex> create_payment(%{field: value})
      {:ok, %Payment{}}
      iex> create_payment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}
  """
  def create_payment(attrs \\ %{}) do
    case Repo.insert(create_payment_changeset(attrs)) do
      {:ok, p} -> {:ok, Repo.preload(p, [:gateway_account])}
      {:error, changeset} -> {:error, changeset}
    end
  end

  defp update_payment_changeset(%Payment{} = payment, attrs) do
    Payment.update_changeset(payment, attrs)
  end

  defp update_payment_changeset(%Payment{} = payment, transition, attrs) do
    next_status =
      payment.status
      |> Payments.Payment.Statuses.from_string!()
      |> Payments.Payment.Statuses.transition(transition)
      |> Payments.Payment.Statuses.status()

    Multi.new()
    |> Multi.update(
      :payment,
      update_payment_changeset(payment, Map.merge(attrs, %{status: next_status}))
    )
    |> Multi.insert(
      :payment_event,
      create_payment_event_changeset(%{payment_id: payment.id, status: next_status})
    )
  end

  @doc """
  update a payment's status through a transition event

  Check `Payments.Payment.Statuses` for valid transitions
  """
  def update_payment(%Payment{} = payment, transition, attrs) do
    changes = update_payment_changeset(payment, transition, attrs)

    with {:ok, %{payment: payment}} <- Repo.transaction(changes),
         payment <- Repo.preload(payment, :gateway_account) do
      {:ok, payment}
    end
  end

  @doc """
  Returns the list of payment_fees.

  ## Examples

      iex> list_payment_fees()
      [%PaymentFee{}, ...]

  """
  def list_payment_fees do
    Repo.all(PaymentFee)
  end

  @doc """
  Gets a single payment_fee.

  Raises `Ecto.NoResultsError` if the Payment fee does not exist.

  ## Examples

      iex> get_payment_fee!(123)
      %PaymentFee{}

      iex> get_payment_fee!(456)
      ** (Ecto.NoResultsError)

  """
  def get_payment_fee!(id), do: Repo.get!(PaymentFee, id)

  @doc """
  Creates a payment_fee.

  ## Examples

      iex> create_payment_fee(%{field: value})
      {:ok, %PaymentFee{}}

      iex> create_payment_fee(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_payment_fee(attrs \\ %{}) do
    %PaymentFee{
      external_id: Ecto.UUID.generate()
    }
    |> PaymentFee.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a payment_fee.

  ## Examples

      iex> update_payment_fee(payment_fee, %{field: new_value})
      {:ok, %PaymentFee{}}

      iex> update_payment_fee(payment_fee, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_payment_fee(%PaymentFee{} = payment_fee, attrs) do
    payment_fee
    |> PaymentFee.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a PaymentFee.

  ## Examples

      iex> delete_payment_fee(payment_fee)
      {:ok, %PaymentFee{}}

      iex> delete_payment_fee(payment_fee)
      {:error, %Ecto.Changeset{}}

  """
  def delete_payment_fee(%PaymentFee{} = payment_fee) do
    Repo.delete(payment_fee)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking payment_fee changes.

  ## Examples

      iex> change_payment_fee(payment_fee)
      %Ecto.Changeset{source: %PaymentFee{}}

  """
  def change_payment_fee(%PaymentFee{} = payment_fee) do
    PaymentFee.changeset(payment_fee, %{})
  end

  @doc """
  Returns the list of payment_events.

  ## Examples

      iex> list_payment_events()
      [%PaymentEvent{}, ...]

  """
  def list_payment_events do
    Repo.all(PaymentEvent)
  end

  @spec list_payment_events(%Payment{}) :: [%PaymentEvent{}]
  def list_payment_events(%Payment{} = payment) do
    with %{events: events} <-
           Repo.preload(payment,
             events: from(PaymentEvent, order_by: [desc: :inserted_at])
           ) do
      events
    end
  end

  @spec list_payment_events(%PaymentRefund{}) :: [%PaymentEvent{}]
  def list_payment_events(%PaymentRefund{} = payment_refund) do
    with %{events: events} <- Repo.preload(payment_refund, :events) do
      events
    end
  end

  @doc """
  Gets a single payment_event.

  Raises `Ecto.NoResultsError` if the Payment event does not exist.

  ## Examples

      iex> get_payment_event!(123)
      %PaymentEvent{}

      iex> get_payment_event!(456)
      ** (Ecto.NoResultsError)

  """
  def get_payment_event!(id), do: Repo.get!(PaymentEvent, id)

  defp create_payment_event_changeset(attrs) do
    %PaymentEvent{} |> PaymentEvent.changeset(attrs)
  end

  @doc """
  Creates a payment_event.

  ## Examples

      iex> create_payment_event(%{field: value})
      {:ok, %PaymentEvent{}}

      iex> create_payment_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_payment_event(attrs \\ %{}) do
    attrs
    |> create_payment_event_changeset()
    |> Repo.insert()
  end

  @doc """
  Updates a payment_event.

  ## Examples

      iex> update_payment_event(payment_event, %{field: new_value})
      {:ok, %PaymentEvent{}}

      iex> update_payment_event(payment_event, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_payment_event(%PaymentEvent{} = payment_event, attrs) do
    payment_event
    |> PaymentEvent.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a PaymentEvent.

  ## Examples

      iex> delete_payment_event(payment_event)
      {:ok, %PaymentEvent{}}

      iex> delete_payment_event(payment_event)
      {:error, %Ecto.Changeset{}}

  """
  def delete_payment_event(%PaymentEvent{} = payment_event) do
    Repo.delete(payment_event)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking payment_event changes.

  ## Examples

      iex> change_payment_event(payment_event)
      %Ecto.Changeset{source: %PaymentEvent{}}

  """
  def change_payment_event(%PaymentEvent{} = payment_event) do
    PaymentEvent.changeset(payment_event, %{})
  end

  @doc """
  Returns the list of payment_refunds.

  ## Examples

      iex> list_payment_refunds()
      [%PaymentRefund{}, ...]

  """
  def list_payment_refunds do
    Repo.all(PaymentRefund)
  end

  @spec list_payment_refunds(%Payment{}) :: [%PaymentRefund{}]
  def list_payment_refunds(%Payment{} = payment) do
    with %{refunds: refunds} <-
           Repo.preload(
             payment,
             refunds: from(PaymentRefund, order_by: [desc: :inserted_at])
           ) do
      refunds
    end
  end

  @doc """
  Gets a single payment_refund.

  Raises `Ecto.NoResultsError` if the Payment refund does not exist.

  ## Examples

      iex> get_payment_refund!(123)
      %PaymentRefund{}

      iex> get_payment_refund!(456)
      ** (Ecto.NoResultsError)

  """
  def get_payment_refund!(id), do: Repo.get!(PaymentRefund, id)

  defp create_payment_refund_changeset(%Payment{} = payment, attrs) do
    alias PaymentRefund.Statuses
    created = Statuses.initial() |> Statuses.status()

    PaymentRefund.create_changeset(
      %PaymentRefund{
        payment_id: payment.id,
        external_id: Ecto.UUID.generate(),
        status: created,
        events: [
          %{payment_id: payment.id, status: created}
        ]
      },
      attrs
    )
  end

  defp update_payment_refund_changeset(%PaymentRefund{} = payment_refund, attrs) do
    PaymentRefund.update_changeset(payment_refund, attrs)
  end

  defp update_payment_refund_changeset(%PaymentRefund{} = payment_refund, transition, attrs) do
    next_status =
      payment_refund.status
      |> Payments.PaymentRefund.Statuses.from_string!()
      |> Payments.PaymentRefund.Statuses.transition(transition)
      |> Payments.PaymentRefund.Statuses.status()

    Multi.new()
    |> Multi.update(
      :payment_refund,
      update_payment_refund_changeset(payment_refund, Map.merge(attrs, %{status: next_status}))
    )
    |> Multi.insert(
      :payment_event,
      create_payment_event_changeset(%{
        payment_id: payment_refund.payment_id,
        status: next_status,
        payment_refund_id: payment_refund.id
      })
    )
  end

  def create_payment_refund(%Payment{} = payment, attrs) do
    create_payment_refund_changeset(payment, attrs) |> Repo.insert()
  end

  @doc """
  Updates a payment_refund.

  ## Examples

      iex> update_payment_refund(payment_refund, transition, %{field: new_value})
      {:ok, %PaymentRefund{}}

      iex> update_payment_refund(payment_refund, transition, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_payment_refund(%PaymentRefund{} = payment_refund, transition, attrs) do
    changes = update_payment_refund_changeset(payment_refund, transition, attrs)

    with {:ok, %{payment_refund: refund}} <- Repo.transaction(changes) do
      {:ok, refund}
    end
  end

  @doc """
  Deletes a PaymentRefund.

  ## Examples

      iex> delete_payment_refund(payment_refund)
      {:ok, %PaymentRefund{}}

      iex> delete_payment_refund(payment_refund)
      {:error, %Ecto.Changeset{}}

  """
  def delete_payment_refund(%PaymentRefund{} = payment_refund) do
    Repo.delete(payment_refund)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking payment_refund changes.

  ## Examples

      iex> change_payment_refund(payment_refund)
      %Ecto.Changeset{source: %PaymentRefund{}}

  """
  def change_payment_refund(%PaymentRefund{} = payment_refund) do
    PaymentRefund.update_changeset(payment_refund, %{})
  end

  @doc """
  Returns the list of gateway_account_card_types.

  ## Examples

      iex> list_gateway_account_card_types()
      [%GatewayAccountCardType{}, ...]

  """

  def list_gateway_account_card_types do
    Repo.all(GatewayAccountCardType)
  end

  def list_gateway_account_card_types(%GatewayAccount{} = gateway_account) do

    with %{card_types: card_types} <- Repo.preload(gateway_account, :card_types) do
      card_types
    end
  end

  @doc """
  Gets a single gateway_account_card_type.

  Raises `Ecto.NoResultsError` if the Gateway account card type does not exist.

  ## Examples

      iex> get_gateway_account_card_type!(123)
      %GatewayAccountCardType{}

      iex> get_gateway_account_card_type!(456)
      ** (Ecto.NoResultsError)

  """
  def get_gateway_account_card_type!(id), do: Repo.get!(GatewayAccountCardType, id)

  @doc """
  Creates a gateway_account_card_type.

  ## Examples

      iex> create_gateway_account_card_type(%{field: value})
      {:ok, %GatewayAccountCardType{}}

      iex> create_gateway_account_card_type(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_gateway_account_card_type(attrs \\ %{}) do
    %GatewayAccountCardType{}
    |> GatewayAccountCardType.changeset(attrs)
    |> Repo.insert()
  end



  @doc """
  Deletes a GatewayAccountCardType.

  ## Examples

      iex> delete_gateway_account_card_type(gateway_account_card_type)
      {:ok, %GatewayAccountCardType{}}

      iex> delete_gateway_account_card_type(gateway_account_card_type)
      {:error, %Ecto.Changeset{}}

  """
  def delete_gateway_account_card_type(%GatewayAccountCardType{} = gateway_account_card_type) do
    Repo.delete(gateway_account_card_type)
  end


  #TODO : Replace Repo.delete_all with put_assoc

  @doc """
  Clears gateway_account_card_type table entries for given gateway_account_id

  ## Examples

      iex> clear_gateway_account_card_types(%{field: value})
      {:ok, n}

  """

  def clear_gateway_account_card_types(gateway_account_id) do
    {n, _} = from(g in GatewayAccountCardType, where: g.gateway_account_id == ^gateway_account_id) |> Repo.delete_all
    {:ok, n}
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking gateway_account_card_type changes.

  ## Examples

      iex> change_gateway_account_card_type(gateway_account_card_type)
      %Ecto.Changeset{source: %GatewayAccountCardType{}}

  """
  def change_gateway_account_card_type(%GatewayAccountCardType{} = gateway_account_card_type) do
    GatewayAccountCardType.changeset(gateway_account_card_type, %{})
  end
end
