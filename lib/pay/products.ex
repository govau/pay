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
  Returns the list of products by the given gateway account external ID.

  ## Examples

      iex> list_products_by_gateway_external_id("3bfd1a3c-0960-49da-be66-053b159df62d")
      [%Product{}, ...]

  """
  def list_products_by_gateway_external_id(external_id) do
    Repo.all(
      from p in Product,
        where: p.gateway_account_id == ^external_id
    )
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
  Gets a single product by the given external ID.

  Raises `Ecto.NoResultsError` if the Product does not exist.

  ## Examples

      iex> get_product_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62d")
      %Product{}

      iex> get_product_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62e")
      ** (Ecto.NoResultsError)

  """
  def get_product_by_external_id!(external_id),
    do: Repo.get_by!(Product, external_id: external_id)

  @doc """
  Gets a single product by the given service name and product name slugs.

  Raises `Ecto.NoResultsError` if the Product does not exist.

  ## Examples

      iex> get_product_by_slugs!("australian-passport-office", "passport-renewal")
      %Product{}

      iex> get_product_by_slugs!("australian-passport-office", "nonexistent")
      ** (Ecto.NoResultsError)

  """
  def get_product_by_slugs!(service_name_slug, name_slug),
    do: Repo.get_by!(Product, service_name_slug: service_name_slug, name_slug: name_slug)

  @doc """
  Creates a product.

  ## Examples

      iex> create_product(%{field: value})
      {:ok, %Product{}}

      iex> create_product(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_product(attrs \\ %{}) do
    %Product{external_id: Ecto.UUID.generate()}
    |> Product.create_changeset(attrs)
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
    |> Product.update_changeset(attrs)
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

  alias Pay.Products.ProductPayment

  @doc """
  Returns the list of product_payments.

  ## Examples

      iex> list_product_payments()
      [%ProductPayment{}, ...]

  """
  def list_product_payments do
    Enum.map(Repo.all(ProductPayment), fn p -> Repo.preload(p, [:product]) end)
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
  def get_product_payment!(id), do: Repo.get!(ProductPayment, id) |> Repo.preload([:product])

  @doc """
  Gets a single product_payment by the given external ID.

  Raises `Ecto.NoResultsError` if the ProductPayment does not exist.

  ## Examples

      iex> get_product_payment_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62d")
      %ProductPayment{}

      iex> get_product_payment_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62e")
      ** (Ecto.NoResultsError)

  """
  def get_product_payment_by_external_id!(external_id),
    do: Repo.get_by!(ProductPayment, external_id: external_id) |> Repo.preload([:product])

  @doc """
  Creates a product_payment for the given product.

  ## Examples

      iex> create_product_payment(%{field: value}, %Product{})
      {:ok, %ProductPayment{}}

      iex> create_product_payment(%{field: bad_value}, %Product{})
      {:error, %Ecto.Changeset{}}

  """
  def create_product_payment(attrs \\ %{}, %Product{} = product) do
    case Repo.insert(
           ProductPayment.create_changeset(
             %ProductPayment{
               external_id: Ecto.UUID.generate(),
               product: product,
               product_id: product.id,
               gateway_account_id: product.gateway_account_id
             },
             attrs
           )
         ) do
      {:ok, o} -> {:ok, Repo.preload(o, [:product])}
      {:error, changeset} -> {:error, changeset}
    end
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
    |> ProductPayment.update_changeset(attrs)
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
end
