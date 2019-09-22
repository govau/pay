defmodule PayWeb.ChargeController do
  use PayWeb, :controller

  alias Pay.Charges
  alias Pay.Charges.Charge

  action_fallback PayWeb.FallbackController

  def index(conn, _params) do
    charges = Charges.list_charges()
    render(conn, "index.json", charges: charges)
  end

  def create(conn, %{"charge" => charge_params}) do
    with {:ok, %Charge{} = charge} <- Charges.create_charge(charge_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.charge_path(conn, :show, charge))
      |> render("show.json", charge: charge)
    end
  end

  def show(conn, %{"id" => id}) do
    charge = Charges.get_charge!(id)
    render(conn, "show.json", charge: charge)
  end

  def update(conn, %{"id" => id, "charge" => charge_params}) do
    charge = Charges.get_charge!(id)

    with {:ok, %Charge{} = charge} <- Charges.update_charge(charge, charge_params) do
      render(conn, "show.json", charge: charge)
    end
  end

  def delete(conn, %{"id" => id}) do
    charge = Charges.get_charge!(id)

    with {:ok, %Charge{}} <- Charges.delete_charge(charge) do
      send_resp(conn, :no_content, "")
    end
  end
end
