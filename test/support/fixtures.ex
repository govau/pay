defmodule Pay.Fixtures do
  alias Pay.Repo
  alias Pay.Services.Role
  alias Pay.Services.Service
  alias Pay.Services.User

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
end
