defmodule Pay.Payments do
  @moduledoc """
  The Payments context.
  """

  import Ecto.Query, warn: false
  alias Pay.Repo

  alias Pay.Payments.CardType

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

  alias Pay.Payments.GatewayAccount

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
  Creates a gateway_account.

  ## Examples

      iex> create_gateway_account(%{field: value})
      {:ok, %GatewayAccount{}}

      iex> create_gateway_account(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_gateway_account(attrs \\ %{}) do
    %GatewayAccount{}
    |> GatewayAccount.changeset(attrs)
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
    |> GatewayAccount.changeset(attrs)
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

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking gateway_account changes.

  ## Examples

      iex> change_gateway_account(gateway_account)
      %Ecto.Changeset{source: %GatewayAccount{}}

  """
  def change_gateway_account(%GatewayAccount{} = gateway_account) do
    GatewayAccount.changeset(gateway_account, %{})
  end

  alias Pay.Payments.Payment

  @doc """
  Returns the list of payments.

  ## Examples

      iex> list_payments()
      [%Payment{}, ...]

  """
  def list_payments do
    Repo.all(Payment)
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
  def get_payment!(id), do: Repo.get!(Payment, id)

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
    do: Repo.get_by!(Payment, external_id: external_id)

  @doc """
  Creates a payment.

  ## Examples

      iex> create_payment(%{field: value})
      {:ok, %Payment{}}

      iex> create_payment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_payment(attrs \\ %{}) do
    %Payment{
      external_id: Ecto.UUID.generate()
    }
    |> Payment.create_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a payment.

  ## Examples

      iex> update_payment(payment, %{field: new_value})
      {:ok, %Payment{}}

      iex> update_payment(payment, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_payment(%Payment{} = payment, attrs) do
    payment
    |> Payment.update_changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Payment.

  ## Examples

      iex> delete_payment(payment)
      {:ok, %Payment{}}

      iex> delete_payment(payment)
      {:error, %Ecto.Changeset{}}

  """
  def delete_payment(%Payment{} = payment) do
    Repo.delete(payment)
  end

  alias Pay.Payments.PaymentFee

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

  alias Pay.Payments.PaymentEvent

  @doc """
  Returns the list of payment_events.

  ## Examples

      iex> list_payment_events()
      [%PaymentEvent{}, ...]

  """
  def list_payment_events do
    Repo.all(PaymentEvent)
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

  @doc """
  Creates a payment_event.

  ## Examples

      iex> create_payment_event(%{field: value})
      {:ok, %PaymentEvent{}}

      iex> create_payment_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_payment_event(attrs \\ %{}) do
    %PaymentEvent{}
    |> PaymentEvent.changeset(attrs)
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

  alias Pay.Payments.PaymentRefund

  @doc """
  Returns the list of payment_refunds.

  ## Examples

      iex> list_payment_refunds()
      [%PaymentRefund{}, ...]

  """
  def list_payment_refunds do
    Repo.all(PaymentRefund)
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

  @doc """
  Creates a payment_refund.

  ## Examples

      iex> create_payment_refund(%{field: value})
      {:ok, %PaymentRefund{}}

      iex> create_payment_refund(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_payment_refund(attrs \\ %{}) do
    %PaymentRefund{
      external_id: Ecto.UUID.generate()
    }
    |> PaymentRefund.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a payment_refund.

  ## Examples

      iex> update_payment_refund(payment_refund, %{field: new_value})
      {:ok, %PaymentRefund{}}

      iex> update_payment_refund(payment_refund, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_payment_refund(%PaymentRefund{} = payment_refund, attrs) do
    payment_refund
    |> PaymentRefund.changeset(attrs)
    |> Repo.update()
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
    PaymentRefund.changeset(payment_refund, %{})
  end

  alias Pay.Payments.GatewayAccountCardType

  @doc """
  Returns the list of gateway_account_card_types.

  ## Examples

      iex> list_gateway_account_card_types()
      [%GatewayAccountCardType{}, ...]

  """
  def list_gateway_account_card_types do
    Repo.all(GatewayAccountCardType)
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
  Updates a gateway_account_card_type.

  ## Examples

      iex> update_gateway_account_card_type(gateway_account_card_type, %{field: new_value})
      {:ok, %GatewayAccountCardType{}}

      iex> update_gateway_account_card_type(gateway_account_card_type, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_gateway_account_card_type(
        %GatewayAccountCardType{} = gateway_account_card_type,
        attrs
      ) do
    gateway_account_card_type
    |> GatewayAccountCardType.changeset(attrs)
    |> Repo.update()
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
