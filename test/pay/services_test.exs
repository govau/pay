defmodule Pay.ServicesTest do
  use Pay.DataCase

  alias Pay.Services

  describe "permissions" do
    alias Pay.Services.Permission

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{description: "some updated description", name: "some updated name"}
    @invalid_attrs %{description: nil, name: nil}

    def permission_fixture(attrs \\ %{}) do
      {:ok, permission} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Services.create_permission()

      permission
    end

    test "list_permissions/0 returns all permissions" do
      permission = permission_fixture()
      assert Services.list_permissions() == [permission]
    end

    test "get_permission!/1 returns the permission with given id" do
      permission = permission_fixture()
      assert Services.get_permission!(permission.id) == permission
    end

    test "create_permission/1 with valid data creates a permission" do
      assert {:ok, %Permission{} = permission} = Services.create_permission(@valid_attrs)
      assert permission.description == "some description"
      assert permission.name == "some name"
    end

    test "create_permission/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Services.create_permission(@invalid_attrs)
    end

    test "update_permission/2 with valid data updates the permission" do
      permission = permission_fixture()

      assert {:ok, %Permission{} = permission} =
               Services.update_permission(permission, @update_attrs)

      assert permission.description == "some updated description"
      assert permission.name == "some updated name"
    end

    test "update_permission/2 with invalid data returns error changeset" do
      permission = permission_fixture()
      assert {:error, %Ecto.Changeset{}} = Services.update_permission(permission, @invalid_attrs)
      assert permission == Services.get_permission!(permission.id)
    end

    test "delete_permission/1 deletes the permission" do
      permission = permission_fixture()
      assert {:ok, %Permission{}} = Services.delete_permission(permission)
      assert_raise Ecto.NoResultsError, fn -> Services.get_permission!(permission.id) end
    end

    test "change_permission/1 returns a permission changeset" do
      permission = permission_fixture()
      assert %Ecto.Changeset{} = Services.change_permission(permission)
    end
  end

  describe "roles" do
    alias Pay.Services.Role

    @valid_attrs %{description: "some description", name: "some name"}
    @update_attrs %{description: "some updated description", name: "some updated name"}
    @invalid_attrs %{description: nil, name: nil}

    def role_fixture(attrs \\ %{}) do
      {:ok, role} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Services.create_role()

      role
    end

    test "list_roles/0 returns all roles" do
      role = role_fixture()
      assert Services.list_roles() == [role]
    end

    test "get_role!/1 returns the role with given id" do
      role = role_fixture()
      assert Services.get_role!(role.id) == role
    end

    test "create_role/1 with valid data creates a role" do
      assert {:ok, %Role{} = role} = Services.create_role(@valid_attrs)
      assert role.description == "some description"
      assert role.name == "some name"
    end

    test "create_role/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Services.create_role(@invalid_attrs)
    end

    test "update_role/2 with valid data updates the role" do
      role = role_fixture()
      assert {:ok, %Role{} = role} = Services.update_role(role, @update_attrs)
      assert role.description == "some updated description"
      assert role.name == "some updated name"
    end

    test "update_role/2 with invalid data returns error changeset" do
      role = role_fixture()
      assert {:error, %Ecto.Changeset{}} = Services.update_role(role, @invalid_attrs)
      assert role == Services.get_role!(role.id)
    end

    test "delete_role/1 deletes the role" do
      role = role_fixture()
      assert {:ok, %Role{}} = Services.delete_role(role)
      assert_raise Ecto.NoResultsError, fn -> Services.get_role!(role.id) end
    end

    test "change_role/1 returns a role changeset" do
      role = role_fixture()
      assert %Ecto.Changeset{} = Services.change_role(role)
    end
  end

  describe "users" do
    alias Pay.Services.User

    @valid_attrs %{
      disabled: true,
      email: "some email",
      external_id: "7488a646-e31f-11e4-aace-600308960662",
      last_logged_in_at: "2010-04-17T14:00:00Z",
      telephone_number: "some telephone_number"
    }
    @update_attrs %{
      disabled: false,
      email: "some updated email",
      external_id: "7488a646-e31f-11e4-aace-600308960668",
      last_logged_in_at: "2011-05-18T15:01:01Z",
      telephone_number: "some updated telephone_number"
    }
    @invalid_attrs %{
      disabled: nil,
      email: nil,
      external_id: nil,
      last_logged_in_at: nil,
      telephone_number: nil
    }

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Services.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Services.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Services.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Services.create_user(@valid_attrs)
      assert user.disabled == true
      assert user.email == "some email"
      assert user.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert user.last_logged_in_at == DateTime.from_naive!(~N[2010-04-17T14:00:00Z], "Etc/UTC")
      assert user.telephone_number == "some telephone_number"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Services.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Services.update_user(user, @update_attrs)
      assert user.disabled == false
      assert user.email == "some updated email"
      assert user.external_id == "7488a646-e31f-11e4-aace-600308960668"
      assert user.last_logged_in_at == DateTime.from_naive!(~N[2011-05-18T15:01:01Z], "Etc/UTC")
      assert user.telephone_number == "some updated telephone_number"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Services.update_user(user, @invalid_attrs)
      assert user == Services.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Services.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Services.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Services.change_user(user)
    end
  end

  describe "organisation_types" do
    alias Pay.Services.OrganisationType

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def organisation_type_fixture(attrs \\ %{}) do
      {:ok, organisation_type} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Services.create_organisation_type()

      organisation_type
    end

    test "list_organisation_types/0 returns all organisation_types" do
      organisation_type = organisation_type_fixture()
      assert Services.list_organisation_types() == [organisation_type]
    end

    test "get_organisation_type!/1 returns the organisation_type with given id" do
      organisation_type = organisation_type_fixture()
      assert Services.get_organisation_type!(organisation_type.id) == organisation_type
    end

    test "create_organisation_type/1 with valid data creates a organisation_type" do
      assert {:ok, %OrganisationType{} = organisation_type} =
               Services.create_organisation_type(@valid_attrs)

      assert organisation_type.name == "some name"
    end

    test "create_organisation_type/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Services.create_organisation_type(@invalid_attrs)
    end

    test "update_organisation_type/2 with valid data updates the organisation_type" do
      organisation_type = organisation_type_fixture()

      assert {:ok, %OrganisationType{} = organisation_type} =
               Services.update_organisation_type(organisation_type, @update_attrs)

      assert organisation_type.name == "some updated name"
    end

    test "update_organisation_type/2 with invalid data returns error changeset" do
      organisation_type = organisation_type_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Services.update_organisation_type(organisation_type, @invalid_attrs)

      assert organisation_type == Services.get_organisation_type!(organisation_type.id)
    end

    test "delete_organisation_type/1 deletes the organisation_type" do
      organisation_type = organisation_type_fixture()
      assert {:ok, %OrganisationType{}} = Services.delete_organisation_type(organisation_type)

      assert_raise Ecto.NoResultsError, fn ->
        Services.get_organisation_type!(organisation_type.id)
      end
    end

    test "change_organisation_type/1 returns a organisation_type changeset" do
      organisation_type = organisation_type_fixture()
      assert %Ecto.Changeset{} = Services.change_organisation_type(organisation_type)
    end
  end

  describe "organisations" do
    alias Pay.Services.Organisation

    @valid_attrs %{external_id: "7488a646-e31f-11e4-aace-600308960662", name: "some name"}
    @update_attrs %{
      external_id: "7488a646-e31f-11e4-aace-600308960668",
      name: "some updated name"
    }
    @invalid_attrs %{external_id: nil, name: nil}

    def organisation_fixture(attrs \\ %{}) do
      {:ok, organisation} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Services.create_organisation()

      organisation
    end

    test "list_organisations/0 returns all organisations" do
      organisation = organisation_fixture()
      assert Services.list_organisations() == [organisation]
    end

    test "get_organisation!/1 returns the organisation with given id" do
      organisation = organisation_fixture()
      assert Services.get_organisation!(organisation.id) == organisation
    end

    test "create_organisation/1 with valid data creates a organisation" do
      assert {:ok, %Organisation{} = organisation} = Services.create_organisation(@valid_attrs)
      assert organisation.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert organisation.name == "some name"
    end

    test "create_organisation/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Services.create_organisation(@invalid_attrs)
    end

    test "update_organisation/2 with valid data updates the organisation" do
      organisation = organisation_fixture()

      assert {:ok, %Organisation{} = organisation} =
               Services.update_organisation(organisation, @update_attrs)

      assert organisation.external_id == "7488a646-e31f-11e4-aace-600308960668"
      assert organisation.name == "some updated name"
    end

    test "update_organisation/2 with invalid data returns error changeset" do
      organisation = organisation_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Services.update_organisation(organisation, @invalid_attrs)

      assert organisation == Services.get_organisation!(organisation.id)
    end

    test "delete_organisation/1 deletes the organisation" do
      organisation = organisation_fixture()
      assert {:ok, %Organisation{}} = Services.delete_organisation(organisation)
      assert_raise Ecto.NoResultsError, fn -> Services.get_organisation!(organisation.id) end
    end

    test "change_organisation/1 returns a organisation changeset" do
      organisation = organisation_fixture()
      assert %Ecto.Changeset{} = Services.change_organisation(organisation)
    end
  end

  describe "services" do
    alias Pay.Services.Service

    @valid_attrs %{
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
      redirect_to_service_immediately_on_terminal_state: true
    }
    @update_attrs %{
      collect_billing_address: false,
      current_go_live_stage: "some updated current_go_live_stage",
      custom_branding: %{},
      external_id: "7488a646-e31f-11e4-aace-600308960668",
      merchant_address_city: "some updated merchant_address_city",
      merchant_address_country: "some updated merchant_address_country",
      merchant_address_line1: "some updated merchant_address_line1",
      merchant_address_line2: "some updated merchant_address_line2",
      merchant_address_postcode: "some updated merchant_address_postcode",
      merchant_email: "some updated merchant_email",
      merchant_name: "some updated merchant_name",
      merchant_telephone_number: "some updated merchant_telephone_number",
      redirect_to_service_immediately_on_terminal_state: false
    }
    @invalid_attrs %{
      collect_billing_address: nil,
      current_go_live_stage: nil,
      custom_branding: nil,
      external_id: nil,
      merchant_address_city: nil,
      merchant_address_country: nil,
      merchant_address_line1: nil,
      merchant_address_line2: nil,
      merchant_address_postcode: nil,
      merchant_email: nil,
      merchant_name: nil,
      merchant_telephone_number: nil,
      redirect_to_service_immediately_on_terminal_state: nil
    }

    def service_fixture(attrs \\ %{}) do
      {:ok, service} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Services.create_service()

      service
    end

    test "list_services/0 returns all services" do
      service = service_fixture()
      assert Services.list_services() == [service]
    end

    test "get_service!/1 returns the service with given id" do
      service = service_fixture()
      assert Services.get_service!(service.id) == service
    end

    test "create_service/1 with valid data creates a service" do
      assert {:ok, %Service{} = service} = Services.create_service(@valid_attrs)
      assert service.collect_billing_address == true
      assert service.current_go_live_stage == "some current_go_live_stage"
      assert service.custom_branding == %{}
      assert service.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert service.merchant_address_city == "some merchant_address_city"
      assert service.merchant_address_country == "some merchant_address_country"
      assert service.merchant_address_line1 == "some merchant_address_line1"
      assert service.merchant_address_line2 == "some merchant_address_line2"
      assert service.merchant_address_postcode == "some merchant_address_postcode"
      assert service.merchant_email == "some merchant_email"
      assert service.merchant_name == "some merchant_name"
      assert service.merchant_telephone_number == "some merchant_telephone_number"
      assert service.redirect_to_service_immediately_on_terminal_state == true
    end

    test "create_service/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Services.create_service(@invalid_attrs)
    end

    test "update_service/2 with valid data updates the service" do
      service = service_fixture()
      assert {:ok, %Service{} = service} = Services.update_service(service, @update_attrs)
      assert service.collect_billing_address == false
      assert service.current_go_live_stage == "some updated current_go_live_stage"
      assert service.custom_branding == %{}
      assert service.external_id == "7488a646-e31f-11e4-aace-600308960668"
      assert service.merchant_address_city == "some updated merchant_address_city"
      assert service.merchant_address_country == "some updated merchant_address_country"
      assert service.merchant_address_line1 == "some updated merchant_address_line1"
      assert service.merchant_address_line2 == "some updated merchant_address_line2"
      assert service.merchant_address_postcode == "some updated merchant_address_postcode"
      assert service.merchant_email == "some updated merchant_email"
      assert service.merchant_name == "some updated merchant_name"
      assert service.merchant_telephone_number == "some updated merchant_telephone_number"
      assert service.redirect_to_service_immediately_on_terminal_state == false
    end

    test "update_service/2 with invalid data returns error changeset" do
      service = service_fixture()
      assert {:error, %Ecto.Changeset{}} = Services.update_service(service, @invalid_attrs)
      assert service == Services.get_service!(service.id)
    end

    test "delete_service/1 deletes the service" do
      service = service_fixture()
      assert {:ok, %Service{}} = Services.delete_service(service)
      assert_raise Ecto.NoResultsError, fn -> Services.get_service!(service.id) end
    end

    test "change_service/1 returns a service changeset" do
      service = service_fixture()
      assert %Ecto.Changeset{} = Services.change_service(service)
    end
  end
end