defmodule Pay.Charges.GatewayAccount do
  use Ecto.Schema
  import Ecto.Changeset

  schema "gateway_accounts" do
    field :allow_apple_pay, :boolean, default: false
    field :allow_google_pay, :boolean, default: false
    field :allow_zero_amount, :integer
    field :corporate_credit_card_surcharge_amount, :integer
    field :corporate_debit_card_surcharge_amount, :integer
    field :corporate_prepaid_credit_card_surcharge_amount, :integer
    field :corporate_prepaid_debit_card_surcharge_amount, :integer
    field :credentials, :map
    field :description, :string
    field :integration_version_3ds, :integer
    field :name, :string
    field :requires_3ds, :boolean, default: false
    field :service_name, :string
    field :type, :string

    timestamps()
  end

  @doc false
  def changeset(gateway_account, attrs) do
    gateway_account
    |> cast(attrs, [
      :name,
      :type,
      :credentials,
      :service_name,
      :description,
      :requires_3ds,
      :allow_apple_pay,
      :allow_google_pay,
      :corporate_credit_card_surcharge_amount,
      :corporate_debit_card_surcharge_amount,
      :corporate_prepaid_credit_card_surcharge_amount,
      :corporate_prepaid_debit_card_surcharge_amount,
      :allow_zero_amount,
      :integration_version_3ds
    ])
    |> validate_required([
      :name,
      :type,
      :credentials,
      :service_name,
      :description,
      :requires_3ds,
      :allow_apple_pay,
      :allow_google_pay,
      :corporate_credit_card_surcharge_amount,
      :corporate_debit_card_surcharge_amount,
      :corporate_prepaid_credit_card_surcharge_amount,
      :corporate_prepaid_debit_card_surcharge_amount,
      :allow_zero_amount,
      :integration_version_3ds
    ])
  end
end
