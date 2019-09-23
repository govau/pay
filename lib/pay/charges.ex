defmodule Pay.Charges do
  @moduledoc """
  The Charges context.
  """

  import Ecto.Query, warn: false
  alias Pay.Repo

  alias Pay.Charges.CardType

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

  alias Pay.Charges.GatewayAccount

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

  alias Pay.Charges.Charge

  @doc """
  Returns the list of charges.

  ## Examples

      iex> list_charges()
      [%Charge{}, ...]

  """
  def list_charges do
    Repo.all(Charge)
  end

  @doc """
  Gets a single charge.

  Raises `Ecto.NoResultsError` if the Charge does not exist.

  ## Examples

      iex> get_charge!(123)
      %Charge{}

      iex> get_charge!(456)
      ** (Ecto.NoResultsError)

  """
  def get_charge!(id), do: Repo.get!(Charge, id)

  @doc """
  Creates a charge.

  ## Examples

      iex> create_charge(%{field: value})
      {:ok, %Charge{}}

      iex> create_charge(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_charge(attrs \\ %{}) do
    %Charge{}
    |> Charge.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a charge.

  ## Examples

      iex> update_charge(charge, %{field: new_value})
      {:ok, %Charge{}}

      iex> update_charge(charge, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_charge(%Charge{} = charge, attrs) do
    charge
    |> Charge.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Charge.

  ## Examples

      iex> delete_charge(charge)
      {:ok, %Charge{}}

      iex> delete_charge(charge)
      {:error, %Ecto.Changeset{}}

  """
  def delete_charge(%Charge{} = charge) do
    Repo.delete(charge)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking charge changes.

  ## Examples

      iex> change_charge(charge)
      %Ecto.Changeset{source: %Charge{}}

  """
  def change_charge(%Charge{} = charge) do
    Charge.changeset(charge, %{})
  end

  alias Pay.Charges.GatewayAccountCardTypes

  @doc """
  Returns the list of gateway_account_card_types.

  ## Examples

      iex> list_gateway_account_card_types()
      [%GatewayAccountCardTypes{}, ...]

  """
  def list_gateway_account_card_types do
    Repo.all(GatewayAccountCardTypes)
  end

  @doc """
  Gets a single gateway_account_card_types.

  Raises `Ecto.NoResultsError` if the Gateway account card types does not exist.

  ## Examples

      iex> get_gateway_account_card_types!(123)
      %GatewayAccountCardTypes{}

      iex> get_gateway_account_card_types!(456)
      ** (Ecto.NoResultsError)

  """
  def get_gateway_account_card_types!(id), do: Repo.get!(GatewayAccountCardTypes, id)

  @doc """
  Creates a gateway_account_card_types.

  ## Examples

      iex> create_gateway_account_card_types(%{field: value})
      {:ok, %GatewayAccountCardTypes{}}

      iex> create_gateway_account_card_types(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_gateway_account_card_types(attrs \\ %{}) do
    %GatewayAccountCardTypes{}
    |> GatewayAccountCardTypes.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a gateway_account_card_types.

  ## Examples

      iex> update_gateway_account_card_types(gateway_account_card_types, %{field: new_value})
      {:ok, %GatewayAccountCardTypes{}}

      iex> update_gateway_account_card_types(gateway_account_card_types, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_gateway_account_card_types(
        %GatewayAccountCardTypes{} = gateway_account_card_types,
        attrs
      ) do
    gateway_account_card_types
    |> GatewayAccountCardTypes.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a GatewayAccountCardTypes.

  ## Examples

      iex> delete_gateway_account_card_types(gateway_account_card_types)
      {:ok, %GatewayAccountCardTypes{}}

      iex> delete_gateway_account_card_types(gateway_account_card_types)
      {:error, %Ecto.Changeset{}}

  """
  def delete_gateway_account_card_types(%GatewayAccountCardTypes{} = gateway_account_card_types) do
    Repo.delete(gateway_account_card_types)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking gateway_account_card_types changes.

  ## Examples

      iex> change_gateway_account_card_types(gateway_account_card_types)
      %Ecto.Changeset{source: %GatewayAccountCardTypes{}}

  """
  def change_gateway_account_card_types(%GatewayAccountCardTypes{} = gateway_account_card_types) do
    GatewayAccountCardTypes.changeset(gateway_account_card_types, %{})
  end

  alias Pay.Charges.ChargeFee

  @doc """
  Returns the list of charge_fees.

  ## Examples

      iex> list_charge_fees()
      [%ChargeFee{}, ...]

  """
  def list_charge_fees do
    Repo.all(ChargeFee)
  end

  @doc """
  Gets a single charge_fee.

  Raises `Ecto.NoResultsError` if the Charge fee does not exist.

  ## Examples

      iex> get_charge_fee!(123)
      %ChargeFee{}

      iex> get_charge_fee!(456)
      ** (Ecto.NoResultsError)

  """
  def get_charge_fee!(id), do: Repo.get!(ChargeFee, id)

  @doc """
  Creates a charge_fee.

  ## Examples

      iex> create_charge_fee(%{field: value})
      {:ok, %ChargeFee{}}

      iex> create_charge_fee(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_charge_fee(attrs \\ %{}) do
    %ChargeFee{}
    |> ChargeFee.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a charge_fee.

  ## Examples

      iex> update_charge_fee(charge_fee, %{field: new_value})
      {:ok, %ChargeFee{}}

      iex> update_charge_fee(charge_fee, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_charge_fee(%ChargeFee{} = charge_fee, attrs) do
    charge_fee
    |> ChargeFee.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a ChargeFee.

  ## Examples

      iex> delete_charge_fee(charge_fee)
      {:ok, %ChargeFee{}}

      iex> delete_charge_fee(charge_fee)
      {:error, %Ecto.Changeset{}}

  """
  def delete_charge_fee(%ChargeFee{} = charge_fee) do
    Repo.delete(charge_fee)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking charge_fee changes.

  ## Examples

      iex> change_charge_fee(charge_fee)
      %Ecto.Changeset{source: %ChargeFee{}}

  """
  def change_charge_fee(%ChargeFee{} = charge_fee) do
    ChargeFee.changeset(charge_fee, %{})
  end

  alias Pay.Charges.ChargeEvent

  @doc """
  Returns the list of charge_events.

  ## Examples

      iex> list_charge_events()
      [%ChargeEvent{}, ...]

  """
  def list_charge_events do
    Repo.all(ChargeEvent)
  end

  @doc """
  Gets a single charge_event.

  Raises `Ecto.NoResultsError` if the Charge event does not exist.

  ## Examples

      iex> get_charge_event!(123)
      %ChargeEvent{}

      iex> get_charge_event!(456)
      ** (Ecto.NoResultsError)

  """
  def get_charge_event!(id), do: Repo.get!(ChargeEvent, id)

  @doc """
  Creates a charge_event.

  ## Examples

      iex> create_charge_event(%{field: value})
      {:ok, %ChargeEvent{}}

      iex> create_charge_event(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_charge_event(attrs \\ %{}) do
    %ChargeEvent{}
    |> ChargeEvent.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a charge_event.

  ## Examples

      iex> update_charge_event(charge_event, %{field: new_value})
      {:ok, %ChargeEvent{}}

      iex> update_charge_event(charge_event, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_charge_event(%ChargeEvent{} = charge_event, attrs) do
    charge_event
    |> ChargeEvent.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a ChargeEvent.

  ## Examples

      iex> delete_charge_event(charge_event)
      {:ok, %ChargeEvent{}}

      iex> delete_charge_event(charge_event)
      {:error, %Ecto.Changeset{}}

  """
  def delete_charge_event(%ChargeEvent{} = charge_event) do
    Repo.delete(charge_event)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking charge_event changes.

  ## Examples

      iex> change_charge_event(charge_event)
      %Ecto.Changeset{source: %ChargeEvent{}}

  """
  def change_charge_event(%ChargeEvent{} = charge_event) do
    ChargeEvent.changeset(charge_event, %{})
  end

  alias Pay.Charges.ChargeRefund

  @doc """
  Returns the list of charge_refunds.

  ## Examples

      iex> list_charge_refunds()
      [%ChargeRefund{}, ...]

  """
  def list_charge_refunds do
    Repo.all(ChargeRefund)
  end

  @doc """
  Gets a single charge_refund.

  Raises `Ecto.NoResultsError` if the Charge refund does not exist.

  ## Examples

      iex> get_charge_refund!(123)
      %ChargeRefund{}

      iex> get_charge_refund!(456)
      ** (Ecto.NoResultsError)

  """
  def get_charge_refund!(id), do: Repo.get!(ChargeRefund, id)

  @doc """
  Creates a charge_refund.

  ## Examples

      iex> create_charge_refund(%{field: value})
      {:ok, %ChargeRefund{}}

      iex> create_charge_refund(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_charge_refund(attrs \\ %{}) do
    %ChargeRefund{}
    |> ChargeRefund.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a charge_refund.

  ## Examples

      iex> update_charge_refund(charge_refund, %{field: new_value})
      {:ok, %ChargeRefund{}}

      iex> update_charge_refund(charge_refund, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_charge_refund(%ChargeRefund{} = charge_refund, attrs) do
    charge_refund
    |> ChargeRefund.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a ChargeRefund.

  ## Examples

      iex> delete_charge_refund(charge_refund)
      {:ok, %ChargeRefund{}}

      iex> delete_charge_refund(charge_refund)
      {:error, %Ecto.Changeset{}}

  """
  def delete_charge_refund(%ChargeRefund{} = charge_refund) do
    Repo.delete(charge_refund)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking charge_refund changes.

  ## Examples

      iex> change_charge_refund(charge_refund)
      %Ecto.Changeset{source: %ChargeRefund{}}

  """
  def change_charge_refund(%ChargeRefund{} = charge_refund) do
    ChargeRefund.changeset(charge_refund, %{})
  end
end
