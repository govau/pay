defmodule PayWeb.Resolvers do
  alias Pay.{Services, Payments, Products}

  def services(_parent, _params, _resolution) do
    {:ok, Services.list_services()}
  end

  def service(_parent, %{service_id: service_id}, _resolution) do
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

  def card_types(%Payments.GatewayAccount{} = gateway_account, _params, _resolution) do
    {:ok, Payments.list_gateway_account_card_types(gateway_account)}
  end

  def products(%Payments.GatewayAccount{external_id: gateway_id}, _params, _resolution) do
    {:ok, Products.list_products_by_gateway_external_id(gateway_id)}
  end

  def product(%Products.ProductPayment{product_id: product_id}, _params, _resolution) do
    {:ok, Products.get_product!(product_id)}
  end

  def product_payments(%Products.Product{external_id: product_id}, _params, _resolution) do
    {:ok, Products.list_product_payments_by_product_external_id(product_id)}
  end

  def payments(%Payments.GatewayAccount{} = gateway_account, _params, _resolution) do
    {:ok, Payments.list_payments_for_gateway_account(gateway_account)}
  end

  def payment(%Payments.PaymentRefund{payment_id: payment_id}, _params, _resolution) do
    {:ok, Payments.get_payment!(payment_id)}
  end

  def payment(%Products.ProductPayment{payment_id: payment_id}, _params, _resolution) do
    {:ok, Payments.get_payment!(payment_id)}
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

  def users(%Services.Service{} = _service, _params, _resolution) do
    {:ok, Services.list_users()}
  end

  def user(%Payments.PaymentRefund{user_external_id: user_id}, _params, _resolution) do
    {:ok, Services.get_user_by_external_id!(user_id)}
  end

  def organisation(%Services.Service{organisation_id: org_id}, _params, _resolution) do
    {:ok, Services.get_organisation!(org_id)}
  end

  @spec organisation_type(Pay.Services.Organisation.t(), any, any) :: {:ok, String.t()}
  def organisation_type(%Services.Organisation{type_id: org_type_id}, _params, _resolution) do
    {:ok, Services.get_organisation_type!(org_type_id).name}
  end
end
