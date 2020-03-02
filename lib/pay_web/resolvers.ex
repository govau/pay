defmodule PayWeb.Resolvers do
  alias Pay.{Services, Payments, Products}

  def get_current_user(_, _params, %{context: %{current_user: user}}) do
    {:ok, user}
  end

  def get_current_user(_, _params, _resolution) do
    {:error, "no active user"}
  end

  def users(_parent, _params, _resolution) do
    {:ok, Services.list_users()}
  end

  defp format_service_invite(%Services.ServiceInvite{} = invite) do
    date_now = DateTime.utc_now()

    # make invite available for resolvers as parent through _invite
    %{
      _invite: invite,
      id: invite.id,
      service_id: invite.service.id,
      service_name: invite.service.name,
      expires_at: invite.expires_at,
      is_expired: DateTime.compare(date_now, invite.expires_at) === :gt,
      invited_by: invite.sender.email,
      email: invite.email
    }
  end

  def service_invites(_params, %{context: %{current_user: user}}) do
    {:ok,
     Enum.map(
       Services.list_user_service_invites(user.email),
       &format_service_invite/1
     )}
  end

  def service_invites(%Services.Service{id: service_id}, _params, %{
        context: %{current_user: _user}
      }) do
    {:ok,
     Enum.map(
       Services.list_service_invites(%{service_id: service_id}),
       &format_service_invite/1
     )}
  end

  def services(%Services.User{platform_admin: true}, _params, _resolution) do
    {:ok, Services.list_services()}
  end

  def services(_parent, _params, %{context: %{current_user: user}}) do
    {:ok, Services.list_services_by_user_external_id(user.external_id)}
  end

  def service(%Payments.GatewayAccount{external_id: external_id}, _params, _resolution) do
    {:ok, Services.get_service_by_gateway_account_external_id!(external_id)}
  end

  def service(_parent, %{id: service_id}, _resolution) do
    {:ok, Services.get_service_by_external_id!(service_id)}
  end

  def gateway_accounts(%Services.Service{external_id: external_id}, _params, _resolution) do
    {:ok, Payments.list_gateway_accounts_by_service_external_id(external_id)}
  end

  def gateway_account(
        %Payments.Payment{gateway_account_id: gateway_account_id},
        _params,
        _resolution
      ) do
    {:ok, Payments.get_gateway_account!(gateway_account_id)}
  end

  def gateway_account(
        %Products.Product{gateway_account_id: gateway_account_id},
        _params,
        _resolution
      ) do
    {:ok, Payments.get_gateway_account_by_external_id!(gateway_account_id)}
  end

  def gateway_account(
        %Products.ProductPayment{gateway_account_id: gateway_account_id},
        _params,
        _resolution
      ) do
    {:ok, Payments.get_gateway_account_by_external_id!(gateway_account_id)}
  end

  def gateway_account(
        _parent,
        %{id: external_id},
        _resolution
      ) do
    {:ok, Payments.get_gateway_account_by_external_id!(external_id)}
  end

  def gateway_account_credentials(
        %Payments.GatewayAccount{} = gateway_account,
        _params,
        _resolution
      ) do
    {:ok, Payments.GatewayAccount.credentials(gateway_account)}
  end

  def card_types(%Payments.GatewayAccount{} = gateway_account, _params, _resolution) do
    {:ok, Payments.list_gateway_account_card_types(gateway_account)}
  end

  def card_types(_parent, _params, _resolution) do
    {:ok, Payments.list_card_types()}
  end

  def products(%Payments.GatewayAccount{external_id: gateway_id}, _params, _resolution) do
    {:ok, Products.list_products_by_gateway_external_id(gateway_id)}
  end

  def product(%Products.ProductPayment{product_id: product_id}, _params, _resolution) do
    {:ok, Products.get_product!(product_id)}
  end

  def product(_parent, %{id: external_id}, _resolution) do
    {:ok, Products.get_product_by_external_id!(external_id)}
  end

  def product_payment(_parent, %{id: external_id}, _resolution) do
    {:ok, Products.get_product_payment_by_external_id!(external_id)}
  end

  def product_payments(%Products.Product{external_id: product_id}, _params, _resolution) do
    {:ok, Products.list_product_payments_by_product_external_id(product_id)}
  end

  def payments(%Payments.GatewayAccount{} = gateway_account, _params, _resolution) do
    {:ok, Payments.list_payments_for_gateway_account(gateway_account)}
  end

  def payments(%Services.Service{} = service, params, _resolution) do
    filters = Map.get(params, :filter_by, %{})
    {:ok, Payments.find_payments_by_service(service, filters)}
  end

  def payment(_parent, %{id: external_id}, _resolution) do
    {:ok, Payments.get_payment_by_external_id!(external_id)}
  end

  def payment(%Payments.PaymentRefund{payment_id: payment_id}, _params, _resolution) do
    {:ok, Payments.get_payment!(payment_id)}
  end

  def payment(%Products.ProductPayment{payment_id: nil}, _params, _resolution) do
    {:ok, nil}
  end

  def payment(%Products.ProductPayment{payment_id: external_id}, _params, _resolution) do
    {:ok, Payments.get_payment_by_external_id!(external_id)}
  end

  def payment_events(%Payments.Payment{} = payment, _params, _resolution) do
    {:ok, Payments.list_payment_events(payment)}
  end

  def payment_refund_events(%Payments.PaymentRefund{} = payment_refund, _params, _resolution) do
    {:ok, Payments.list_payment_events(payment_refund)}
  end

  def payment_refund(
        %Payments.PaymentEvent{payment_refund_id: payment_refund_id},
        _params,
        _resolution
      )
      when not is_nil(payment_refund_id) do
    {:ok, Payments.get_payment_refund!(payment_refund_id)}
  end

  def payment_refunds(%Payments.Payment{} = payment, _params, _resolution) do
    {:ok, Payments.list_payment_refunds(payment)}
  end

  def service_users(%Services.Service{external_id: external_id} = _service, _params, _resolution) do
    service_users =
      external_id
      |> Services.list_service_users_by_service_external_id()
      |> Enum.map(fn %{user: user, role: role} ->
        user
        |> Map.from_struct()
        |> Map.put(:role, role)
      end)

    {:ok, service_users}
  end

  def user(%Payments.PaymentRefund{user_external_id: user_id}, _params, _resolution) do
    {:ok, Services.get_user_by_external_id!(user_id)}
  end

  def organisation(%Services.Service{organisation_id: org_id}, _params, _resolution) do
    {:ok, Services.get_organisation!(org_id)}
  end

  def organisations(%Services.User{platform_admin: true}, _params, _resolution) do
    {:ok, Services.list_organisations()}
  end

  @spec organisation_type(Pay.Services.Organisation.t(), any, any) :: {:ok, String.t()}
  def organisation_type(%Services.Organisation{type_id: org_type_id}, _params, _resolution) do
    {:ok, Services.get_organisation_type!(org_type_id).name}
  end

  def role(%{_invite: invite}, _params, _resolution) do
    {:ok, Services.get_invite_role(invite)}
  end

  def roles(_parent, _params, _resolution) do
    {:ok, Services.list_roles()}
  end
end
