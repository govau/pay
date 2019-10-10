defmodule PayWeb.GatewayAccountController do
  use PayWeb, :controller

  alias Pay.Payments
  alias Pay.Payments.GatewayAccount

  action_fallback PayWeb.FallbackController

  def index(conn, %{"service_id" => service_id}) do
    gateway_accounts = Payments.list_gateway_accounts_by_service_external_id(service_id)
    render(conn, "index.json", gateway_accounts: gateway_accounts)
  end

  def index(conn, _params) do
    gateway_accounts = Payments.list_gateway_accounts()
    render(conn, "index.json", gateway_accounts: gateway_accounts)
  end

  def create(conn, %{"gateway_account" => gateway_account_params}) do
    with {:ok, %GatewayAccount{} = gateway_account} <-
           Payments.create_gateway_account(gateway_account_params) do
      conn
      |> put_status(:created)
      |> put_resp_header(
        "location",
        Routes.payments_gateway_account_path(conn, :show, gateway_account)
      )
      |> render("show.json", gateway_account: gateway_account)
    end
  end

  def show(conn, %{"id" => id}) do
    gateway_account = Payments.get_gateway_account_by_external_id!(id)
    render(conn, "show.json", gateway_account: gateway_account)
  end

  def update(conn, %{"id" => id, "gateway_account" => gateway_account_params}) do
    gateway_account = Payments.get_gateway_account_by_external_id!(id)

    with {:ok, %GatewayAccount{} = gateway_account} <-
           Payments.update_gateway_account(gateway_account, gateway_account_params) do
      render(conn, "show.json", gateway_account: gateway_account)
    end
  end

  def delete(conn, %{"id" => id}) do
    gateway_account = Payments.get_gateway_account_by_external_id!(id)

    with {:ok, %GatewayAccount{}} <- Payments.delete_gateway_account(gateway_account) do
      send_resp(conn, :no_content, "")
    end
  end
end
