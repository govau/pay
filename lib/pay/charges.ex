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
end
