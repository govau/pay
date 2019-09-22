defmodule PayWeb.GatewayAccountController do
  use PayWeb, :controller

  alias Pay.Charges
  alias Pay.Charges.GatewayAccount

  action_fallback PayWeb.FallbackController

  def index(conn, _params) do
    gateway_accounts = Charges.list_gateway_accounts()
    render(conn, "index.json", gateway_accounts: gateway_accounts)
  end

  def create(conn, %{"gateway_account" => gateway_account_params}) do
    with {:ok, %GatewayAccount{} = gateway_account} <-
           Charges.create_gateway_account(gateway_account_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.gateway_account_path(conn, :show, gateway_account))
      |> render("show.json", gateway_account: gateway_account)
    end
  end

  def show(conn, %{"id" => id}) do
    gateway_account = Charges.get_gateway_account!(id)
    render(conn, "show.json", gateway_account: gateway_account)
  end

  def update(conn, %{"id" => id, "gateway_account" => gateway_account_params}) do
    gateway_account = Charges.get_gateway_account!(id)

    with {:ok, %GatewayAccount{} = gateway_account} <-
           Charges.update_gateway_account(gateway_account, gateway_account_params) do
      render(conn, "show.json", gateway_account: gateway_account)
    end
  end

  def delete(conn, %{"id" => id}) do
    gateway_account = Charges.get_gateway_account!(id)

    with {:ok, %GatewayAccount{}} <- Charges.delete_gateway_account(gateway_account) do
      send_resp(conn, :no_content, "")
    end
  end
end
