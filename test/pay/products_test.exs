defmodule Pay.ProductsTest do
  use Pay.DataCase

  alias Pay.Products

  describe "products" do
    alias Pay.Products.Product

    @valid_attrs %{
      api_token: "some api_token",
      description: "some description",
      external_id: "7488a646-e31f-11e4-aace-600308960662",
      gateway_account_id: "some gateway_account_id",
      name: "some name",
      price: 42,
      product_name_path: "some product_name_path",
      reference_enabled: true,
      reference_hint: "some reference_hint",
      reference_label: "some reference_label",
      return_url: "some return_url",
      service_name_path: "some service_name_path",
      status: "some status"
    }
    @update_attrs %{
      api_token: "some updated api_token",
      description: "some updated description",
      external_id: "7488a646-e31f-11e4-aace-600308960668",
      gateway_account_id: "some updated gateway_account_id",
      name: "some updated name",
      price: 43,
      product_name_path: "some updated product_name_path",
      reference_enabled: false,
      reference_hint: "some updated reference_hint",
      reference_label: "some updated reference_label",
      return_url: "some updated return_url",
      service_name_path: "some updated service_name_path",
      status: "some updated status"
    }
    @invalid_attrs %{
      api_token: nil,
      description: nil,
      external_id: nil,
      gateway_account_id: nil,
      name: nil,
      price: nil,
      product_name_path: nil,
      reference_enabled: nil,
      reference_hint: nil,
      reference_label: nil,
      return_url: nil,
      service_name_path: nil,
      status: nil
    }

    def product_fixture(attrs \\ %{}) do
      {:ok, product} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Products.create_product()

      product
    end

    test "list_products/0 returns all products" do
      product = product_fixture()
      assert Products.list_products() == [product]
    end

    test "get_product!/1 returns the product with given id" do
      product = product_fixture()
      assert Products.get_product!(product.id) == product
    end

    test "create_product/1 with valid data creates a product" do
      assert {:ok, %Product{} = product} = Products.create_product(@valid_attrs)
      assert product.api_token == "some api_token"
      assert product.description == "some description"
      assert product.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert product.gateway_account_id == "some gateway_account_id"
      assert product.name == "some name"
      assert product.price == 42
      assert product.product_name_path == "some product_name_path"
      assert product.reference_enabled == true
      assert product.reference_hint == "some reference_hint"
      assert product.reference_label == "some reference_label"
      assert product.return_url == "some return_url"
      assert product.service_name_path == "some service_name_path"
      assert product.status == "some status"
    end

    test "create_product/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Products.create_product(@invalid_attrs)
    end

    test "update_product/2 with valid data updates the product" do
      product = product_fixture()
      assert {:ok, %Product{} = product} = Products.update_product(product, @update_attrs)
      assert product.api_token == "some updated api_token"
      assert product.description == "some updated description"
      assert product.external_id == "7488a646-e31f-11e4-aace-600308960668"
      assert product.gateway_account_id == "some updated gateway_account_id"
      assert product.name == "some updated name"
      assert product.price == 43
      assert product.product_name_path == "some updated product_name_path"
      assert product.reference_enabled == false
      assert product.reference_hint == "some updated reference_hint"
      assert product.reference_label == "some updated reference_label"
      assert product.return_url == "some updated return_url"
      assert product.service_name_path == "some updated service_name_path"
      assert product.status == "some updated status"
    end

    test "update_product/2 with invalid data returns error changeset" do
      product = product_fixture()
      assert {:error, %Ecto.Changeset{}} = Products.update_product(product, @invalid_attrs)
      assert product == Products.get_product!(product.id)
    end

    test "delete_product/1 deletes the product" do
      product = product_fixture()
      assert {:ok, %Product{}} = Products.delete_product(product)
      assert_raise Ecto.NoResultsError, fn -> Products.get_product!(product.id) end
    end

    test "change_product/1 returns a product changeset" do
      product = product_fixture()
      assert %Ecto.Changeset{} = Products.change_product(product)
    end
  end

  describe "product_payments" do
    alias Pay.Products.ProductPayment

    @valid_attrs %{
      amount: 42,
      external_id: "7488a646-e31f-11e4-aace-600308960662",
      gateway_account_id: "some gateway_account_id",
      next_url: "some next_url",
      payment_id: "some payment_id",
      reference_number: "some reference_number",
      status: "some status"
    }
    @update_attrs %{
      amount: 43,
      external_id: "7488a646-e31f-11e4-aace-600308960668",
      gateway_account_id: "some updated gateway_account_id",
      next_url: "some updated next_url",
      payment_id: "some updated payment_id",
      reference_number: "some updated reference_number",
      status: "some updated status"
    }
    @invalid_attrs %{
      amount: nil,
      external_id: nil,
      gateway_account_id: nil,
      next_url: nil,
      payment_id: nil,
      reference_number: nil,
      status: nil
    }

    def product_payment_fixture(attrs \\ %{}) do
      {:ok, product_payment} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Products.create_product_payment()

      product_payment
    end

    test "list_product_payments/0 returns all product_payments" do
      product_payment = product_payment_fixture()
      assert Products.list_product_payments() == [product_payment]
    end

    test "get_product_payment!/1 returns the product_payment with given id" do
      product_payment = product_payment_fixture()
      assert Products.get_product_payment!(product_payment.id) == product_payment
    end

    test "create_product_payment/1 with valid data creates a product_payment" do
      assert {:ok, %ProductPayment{} = product_payment} =
               Products.create_product_payment(@valid_attrs)

      assert product_payment.amount == 42
      assert product_payment.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert product_payment.gateway_account_id == "some gateway_account_id"
      assert product_payment.next_url == "some next_url"
      assert product_payment.payment_id == "some payment_id"
      assert product_payment.reference_number == "some reference_number"
      assert product_payment.status == "some status"
    end

    test "create_product_payment/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Products.create_product_payment(@invalid_attrs)
    end

    test "update_product_payment/2 with valid data updates the product_payment" do
      product_payment = product_payment_fixture()

      assert {:ok, %ProductPayment{} = product_payment} =
               Products.update_product_payment(product_payment, @update_attrs)

      assert product_payment.amount == 43
      assert product_payment.external_id == "7488a646-e31f-11e4-aace-600308960668"
      assert product_payment.gateway_account_id == "some updated gateway_account_id"
      assert product_payment.next_url == "some updated next_url"
      assert product_payment.payment_id == "some updated payment_id"
      assert product_payment.reference_number == "some updated reference_number"
      assert product_payment.status == "some updated status"
    end

    test "update_product_payment/2 with invalid data returns error changeset" do
      product_payment = product_payment_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Products.update_product_payment(product_payment, @invalid_attrs)

      assert product_payment == Products.get_product_payment!(product_payment.id)
    end

    test "delete_product_payment/1 deletes the product_payment" do
      product_payment = product_payment_fixture()
      assert {:ok, %ProductPayment{}} = Products.delete_product_payment(product_payment)

      assert_raise Ecto.NoResultsError, fn ->
        Products.get_product_payment!(product_payment.id)
      end
    end

    test "change_product_payment/1 returns a product_payment changeset" do
      product_payment = product_payment_fixture()
      assert %Ecto.Changeset{} = Products.change_product_payment(product_payment)
    end
  end
end
