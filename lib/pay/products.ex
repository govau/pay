defmodule Pay.Products do
  @moduledoc """
  The Products context.
  """

  import Ecto.Query, warn: false
  alias Pay.Repo

  alias Pay.Products.Product

  @doc """
  Returns the list of products.

  ## Examples

      iex> list_products()
      [%Product{}, ...]

  """
  def list_products do
    Repo.all(Product)
  end

  @doc """
  Gets a single product.

  Raises `Ecto.NoResultsError` if the Product does not exist.

  ## Examples

      iex> get_product!(123)
      %Product{}

      iex> get_product!(456)
      ** (Ecto.NoResultsError)

  """
  def get_product!(id), do: Repo.get!(Product, id)

  @doc """
  Creates a product.

  ## Examples

      iex> create_product(%{field: value})
      {:ok, %Product{}}

      iex> create_product(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_product(attrs \\ %{}) do
    %Product{}
    |> Product.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a product.

  ## Examples

      iex> update_product(product, %{field: new_value})
      {:ok, %Product{}}

      iex> update_product(product, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_product(%Product{} = product, attrs) do
    product
    |> Product.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Product.

  ## Examples

      iex> delete_product(product)
      {:ok, %Product{}}

      iex> delete_product(product)
      {:error, %Ecto.Changeset{}}

  """
  def delete_product(%Product{} = product) do
    Repo.delete(product)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking product changes.

  ## Examples

      iex> change_product(product)
      %Ecto.Changeset{source: %Product{}}

  """
  def change_product(%Product{} = product) do
    Product.changeset(product, %{})
  end

  alias Pay.Products.ProductPayment

  @doc """
  Returns the list of product_payments.

  ## Examples

      iex> list_product_payments()
      [%ProductPayment{}, ...]

  """
  def list_product_payments do
    Repo.all(ProductPayment)
  end

  @doc """
  Returns the list of product_payments for the given product external_id.

  ## Examples

      iex> list_product_payments_by_product_external_id("3bfd1a3c-0960-49da-be66-053b159df62e")
      [%ProductPayment{}, ...]

  """
  def list_product_payments_by_product_external_id(external_id) do
    Repo.all(
      from pp in ProductPayment,
        left_join: p in Product,
        on: pp.product_id == p.id,
        where: p.external_id == ^external_id
    )
  end

  @doc """
  Gets a single product_payment.

  Raises `Ecto.NoResultsError` if the Product payment does not exist.

  ## Examples

      iex> get_product_payment!(123)
      %ProductPayment{}

      iex> get_product_payment!(456)
      ** (Ecto.NoResultsError)

  """
  def get_product_payment!(id), do: Repo.get!(ProductPayment, id)

  @doc """
  Creates a product_payment.

  ## Examples

      iex> create_product_payment(%{field: value})
      {:ok, %ProductPayment{}}

      iex> create_product_payment(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_product_payment(attrs \\ %{}) do
    %ProductPayment{}
    |> ProductPayment.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a product_payment.

  ## Examples

      iex> update_product_payment(product_payment, %{field: new_value})
      {:ok, %ProductPayment{}}

      iex> update_product_payment(product_payment, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_product_payment(%ProductPayment{} = product_payment, attrs) do
    product_payment
    |> ProductPayment.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a ProductPayment.

  ## Examples

      iex> delete_product_payment(product_payment)
      {:ok, %ProductPayment{}}

      iex> delete_product_payment(product_payment)
      {:error, %Ecto.Changeset{}}

  """
  def delete_product_payment(%ProductPayment{} = product_payment) do
    Repo.delete(product_payment)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking product_payment changes.

  ## Examples

      iex> change_product_payment(product_payment)
      %Ecto.Changeset{source: %ProductPayment{}}

  """
  def change_product_payment(%ProductPayment{} = product_payment) do
    ProductPayment.changeset(product_payment, %{})
  end
end
