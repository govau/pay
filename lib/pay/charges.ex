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
end
