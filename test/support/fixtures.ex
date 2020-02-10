defmodule Pay.Fixtures do
  alias Pay.Repo
  alias Pay.Services
  alias Pay.Services.Role
  alias Pay.Services.Service
  alias Pay.Services.User
  alias Pay.Products.Product
  alias Pay.Payments.GatewayAccount
  alias Pay.Payments.Payment

  def fixture(:admin_role) do
    Repo.insert!(%Role{
      description: "some description",
      name: "admin"
    })
  end

  def fixture(:user) do
    %User{}
    |> User.create_changeset(%{
      disabled: false,
      email: "some email",
      external_id: "7488a646-e31f-11e4-aace-600308960662",
      last_logged_in_at: "2010-04-17T14:00:00.000000Z",
      name: "some name",
      telephone_number: "some telephone_number"
    })
    |> Repo.insert!()
  end

  def fixture(:gateway_account) do
    Repo.insert!(%GatewayAccount{
      external_id: "7488a646-e31f-11e4-aace-600308960500",
      credentials: %{},
      type: GatewayAccount.type(:test),
      payment_provider: GatewayAccount.provider(:sandbox),
      service_name: "some name"
    })
  end

  def fixture(:payment) do
    Repo.insert!(%Payment{
      external_id: "7488a646-e31f-11e4-aace-600308960200"
    })
  end

  def fixture(:service) do
    Repo.insert!(%Service{
      collect_billing_address: true,
      current_go_live_stage: "some current_go_live_stage",
      custom_branding: %{},
      external_id: "7488a646-e31f-11e4-aace-600308960662",
      merchant_address_city: "some merchant_address_city",
      merchant_address_country: "some merchant_address_country",
      merchant_address_line1: "some merchant_address_line1",
      merchant_address_line2: "some merchant_address_line2",
      merchant_address_postcode: "some merchant_address_postcode",
      merchant_email: "some merchant_email",
      merchant_name: "some merchant_name",
      merchant_telephone_number: "some merchant_telephone_number",
      name: "some name",
      redirect_to_service_immediately_on_terminal_state: true
    })
  end

  def fixture(:product) do
    Repo.insert!(%Product{
      external_id: "7488a646-e31f-11e4-aace-600308960662",
      name: "some name",
      name_slug: "some-name",
      service_name_slug: "service-name-slug",
      description: "some description",
      price_fixed: true,
      price: 43000,
      reference_enabled: true,
      reference_label: "some reference_label",
      reference_hint: "some reference_hint"
    })
  end

  def fixture(:service, %{
        user: %User{} = user,
        role: %Role{} = role
      }) do
    service = fixture(:service)

    fixture(:service_user, %{
      user: user,
      role: role,
      service: service
    })

    service
  end

  def fixture(:service_user, %{
        service: %Service{} = service,
        user: %User{} = user,
        role: %Role{} = role
      }) do
    {:ok, service_user} =
      Services.create_service_user(%{
        user_id: user.id,
        service_id: service.id,
        role_id: role.id
      })

    service_user
  end

  def fixture(:payment, gateway_account) do
    {:ok, payment} =
      Pay.Payments.create_payment(%{
        amount: 42,
        auth_3ds_details: %{},
        card_details: %{},
        delayed_capture: true,
        description: "some description",
        email: "some email",
        external_id: "7488a646-e31f-11e4-aace-600308960662",
        external_metadata: %{},
        gateway_account_id: gateway_account.id,
        gateway_transaction_id: "some gateway_transaction_id",
        reference: "some reference",
        return_url: "some return_url",
        status: "created",
        wallet: "some wallet"
      })

    payment
  end

  def fixture(:payment_refund, %{payment: payment, user: user}) do
    {:ok, payment_refund} =
      Pay.Payments.create_payment_refund(payment, %{
        payment_id: payment.id,
        amount: 512,
        gateway_transaction_id: "7488a646-e31f-11e4-aace-600308960662",
        reference: "reference123456",
        user_external_id: user.external_id
      })

    payment_refund
  end
end
