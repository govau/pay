defmodule Pay.ServicesTest do
  use Pay.DataCase

  import Pay.Fixtures

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
      last_logged_in_at: "2010-04-17T14:00:00.000000Z",
      name: "some name",
      telephone_number: "some telephone_number"
    }
    @update_attrs %{
      disabled: false,
      email: "some updated email",
      external_id: "7488a646-e31f-11e4-aace-600308960668",
      last_logged_in_at: "2011-05-18T15:01:01.000000Z",
      name: "some updated name",
      telephone_number: "some updated telephone_number"
    }
    @invalid_attrs %{
      disabled: nil,
      email: nil,
      external_id: nil,
      last_logged_in_at: nil,
      name: nil,
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

    test "get_user_by_external_id!/1 returns the user with given external_id" do
      user = user_fixture()
      assert Services.get_user_by_external_id!(user.external_id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Services.create_user(@valid_attrs)
      assert user.disabled == true
      assert user.email == "some email"
      assert user.external_id == "7488a646-e31f-11e4-aace-600308960662"

      assert user.last_logged_in_at ==
               DateTime.from_naive!(~N[2010-04-17T14:00:00.000000Z], "Etc/UTC")

      assert user.name == "some name"
      assert user.platform_admin == false
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
      assert user.external_id == "7488a646-e31f-11e4-aace-600308960662"

      assert user.last_logged_in_at ==
               DateTime.from_naive!(~N[2011-05-18T15:01:01.000000Z], "Etc/UTC")

      assert user.name == "some updated name"
      assert user.platform_admin == false
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

    test "get_organisation_by_external_id!/1 returns the organisation with given external_id" do
      organisation = organisation_fixture()
      assert Services.get_organisation_by_external_id!(organisation.external_id) == organisation
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

      assert organisation.external_id == "7488a646-e31f-11e4-aace-600308960662"
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
  end

  describe "services" do
    alias Pay.Services.Service

    setup [:create_admin_role]

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
      name: "some name",
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
      name: "some updated name",
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
      name: nil,
      redirect_to_service_immediately_on_terminal_state: nil
    }

    test "list_services/0 returns all services" do
      service = fixture(:service)
      assert Services.list_services() == [service]
    end

    test "get_service!/1 returns the service with given id" do
      service = fixture(:service)
      assert Services.get_service!(service.id) == service
    end

    test "get_service_by_external_id!/1 returns the service with given external_id" do
      service = fixture(:service)
      assert Services.get_service_by_external_id!(service.external_id) == service
    end

    test "create_service/2 with valid data creates a service" do
      user = fixture(:user)
      assert {:ok, %Service{} = service} = Services.create_service(user, @valid_attrs)
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
      assert service.name == "some name"
      assert service.redirect_to_service_immediately_on_terminal_state == true
    end

    test "create_service/2 with invalid data returns error changeset" do
      user = fixture(:user)
      assert {:error, %Ecto.Changeset{}} = Services.create_service(user, @invalid_attrs)
    end

    test "update_service/2 with valid data updates the service" do
      service = fixture(:service)
      assert {:ok, %Service{} = service} = Services.update_service(service, @update_attrs)
      assert service.collect_billing_address == false
      assert service.current_go_live_stage == "some updated current_go_live_stage"
      assert service.custom_branding == %{}
      assert service.external_id == "7488a646-e31f-11e4-aace-600308960662"
      assert service.merchant_address_city == "some updated merchant_address_city"
      assert service.merchant_address_country == "some updated merchant_address_country"
      assert service.merchant_address_line1 == "some updated merchant_address_line1"
      assert service.merchant_address_line2 == "some updated merchant_address_line2"
      assert service.merchant_address_postcode == "some updated merchant_address_postcode"
      assert service.merchant_email == "some updated merchant_email"
      assert service.merchant_name == "some updated merchant_name"
      assert service.merchant_telephone_number == "some updated merchant_telephone_number"
      assert service.name == "some updated name"
      assert service.redirect_to_service_immediately_on_terminal_state == false
    end

    test "update_service/2 with invalid data returns error changeset" do
      service = fixture(:service)
      assert {:error, %Ecto.Changeset{}} = Services.update_service(service, @invalid_attrs)
      assert service == Services.get_service!(service.id)
    end

    test "delete_service/1 deletes the service" do
      service = fixture(:service)
      assert {:ok, %Service{}} = Services.delete_service(service)
      assert_raise Ecto.NoResultsError, fn -> Services.get_service!(service.id) end
    end
  end

  describe "role_permissions" do
    alias Pay.Services.RolePermission

    @valid_attrs %{}
    @update_attrs %{}

    def role_permission_fixture(attrs \\ %{}) do
      {:ok, role_permission} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Services.create_role_permission()

      role_permission
    end

    test "list_role_permissions/0 returns all role_permissions" do
      role_permission = role_permission_fixture()
      assert Services.list_role_permissions() == [role_permission]
    end

    test "get_role_permission!/1 returns the role_permission with given id" do
      role_permission = role_permission_fixture()
      assert Services.get_role_permission!(role_permission.id) == role_permission
    end

    test "create_role_permission/1 with valid data creates a role_permission" do
      assert {:ok, %RolePermission{} = role_permission} =
               Services.create_role_permission(@valid_attrs)
    end

    test "update_role_permission/2 with valid data updates the role_permission" do
      role_permission = role_permission_fixture()

      assert {:ok, %RolePermission{} = role_permission} =
               Services.update_role_permission(role_permission, @update_attrs)
    end

    test "delete_role_permission/1 deletes the role_permission" do
      role_permission = role_permission_fixture()
      assert {:ok, %RolePermission{}} = Services.delete_role_permission(role_permission)

      assert_raise Ecto.NoResultsError, fn ->
        Services.get_role_permission!(role_permission.id)
      end
    end

    test "change_role_permission/1 returns a role_permission changeset" do
      role_permission = role_permission_fixture()
      assert %Ecto.Changeset{} = Services.change_role_permission(role_permission)
    end
  end

  describe "organisation_domains" do
    alias Pay.Services.OrganisationDomain

    @valid_attrs %{domain: "some domain"}
    @update_attrs %{domain: "some updated domain"}
    @invalid_attrs %{domain: nil}

    def organisation_domain_fixture(attrs \\ %{}) do
      {:ok, organisation_domain} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Services.create_organisation_domain()

      organisation_domain
    end

    test "list_organisation_domains/0 returns all organisation_domains" do
      organisation_domain = organisation_domain_fixture()
      assert Services.list_organisation_domains() == [organisation_domain]
    end

    test "get_organisation_domain!/1 returns the organisation_domain with given id" do
      organisation_domain = organisation_domain_fixture()
      assert Services.get_organisation_domain!(organisation_domain.id) == organisation_domain
    end

    test "create_organisation_domain/1 with valid data creates a organisation_domain" do
      assert {:ok, %OrganisationDomain{} = organisation_domain} =
               Services.create_organisation_domain(@valid_attrs)

      assert organisation_domain.domain == "some domain"
    end

    test "create_organisation_domain/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Services.create_organisation_domain(@invalid_attrs)
    end

    test "update_organisation_domain/2 with valid data updates the organisation_domain" do
      organisation_domain = organisation_domain_fixture()

      assert {:ok, %OrganisationDomain{} = organisation_domain} =
               Services.update_organisation_domain(organisation_domain, @update_attrs)

      assert organisation_domain.domain == "some updated domain"
    end

    test "update_organisation_domain/2 with invalid data returns error changeset" do
      organisation_domain = organisation_domain_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Services.update_organisation_domain(organisation_domain, @invalid_attrs)

      assert organisation_domain == Services.get_organisation_domain!(organisation_domain.id)
    end

    test "delete_organisation_domain/1 deletes the organisation_domain" do
      organisation_domain = organisation_domain_fixture()

      assert {:ok, %OrganisationDomain{}} =
               Services.delete_organisation_domain(organisation_domain)

      assert_raise Ecto.NoResultsError, fn ->
        Services.get_organisation_domain!(organisation_domain.id)
      end
    end

    test "change_organisation_domain/1 returns a organisation_domain changeset" do
      organisation_domain = organisation_domain_fixture()
      assert %Ecto.Changeset{} = Services.change_organisation_domain(organisation_domain)
    end
  end

  describe "service_users" do
    alias Pay.Services.ServiceUser

    @update_attrs %{}

    def service_user_fixture(attrs \\ %{}) do
      service = fixture(:service)
      user = fixture(:user)
      role = fixture(:admin_role)

      {:ok, service_user} =
        attrs
        |> Enum.into(%{
          service_id: service.id,
          user_id: user.id,
          role_id: role.id
        })
        |> Services.create_service_user()

      service_user
    end

    test "list_service_users/0 returns all service_users" do
      service_user = service_user_fixture()
      assert Services.list_service_users() == [service_user]
    end

    test "list_service_users_by_service_external_id/1 returns all service_users" do
      service_user = service_user_fixture()

      service = Services.get_service!(service_user.service_id)

      assert length(Services.list_service_users_by_service_external_id(service.external_id)) == 1
    end

    test "get_service_user!/1 returns the service_user with given id" do
      service_user = service_user_fixture()
      assert Services.get_service_user!(service_user.id) == service_user
    end

    test "create_service_user/1 with valid data creates a service_user" do
      service = fixture(:service)
      user = fixture(:user)
      role = fixture(:admin_role)

      assert {:ok, %ServiceUser{} = service_user} =
               Services.create_service_user(%{
                 service_id: service.id,
                 user_id: user.id,
                 role_id: role.id
               })
    end

    test "update_service_user/2 with valid data updates the service_user" do
      service_user = service_user_fixture()

      assert {:ok, %ServiceUser{} = service_user} =
               Services.update_service_user(service_user, @update_attrs)
    end

    test "delete_service_user/1 deletes the service_user" do
      service_user = service_user_fixture()
      assert {:ok, %ServiceUser{}} = Services.delete_service_user(service_user)
      assert_raise Ecto.NoResultsError, fn -> Services.get_service_user!(service_user.id) end
    end

    test "change_service_user/1 returns a service_user changeset" do
      service_user = service_user_fixture()
      assert %Ecto.Changeset{} = Services.change_service_user(service_user)
    end
  end

  describe "service_invites" do
    alias Pay.Services.ServiceInvite

    @valid_attrs %{disabled: true, email: "some email", expires_at: "2010-04-17T14:00:00.000000Z"}
    @update_attrs %{
      disabled: false,
      email: "some updated email",
      expires_at: "2011-05-18T15:01:01.000000Z"
    }
    @invalid_attrs %{disabled: nil, email: nil, expires_at: nil}

    def service_invite_fixture(attrs \\ %{}) do
      {:ok, service_invite} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Services.create_service_invite()

      service_invite
    end

    test "list_service_invites/0 returns all service_invites" do
      service_invite = service_invite_fixture()
      assert Services.list_service_invites() == [service_invite]
    end

    test "get_service_invite!/1 returns the service_invite with given id" do
      service_invite = service_invite_fixture()
      assert Services.get_service_invite!(service_invite.id) == service_invite
    end

    test "create_service_invite/1 with valid data creates a service_invite" do
      assert {:ok, %ServiceInvite{} = service_invite} =
               Services.create_service_invite(@valid_attrs)

      assert service_invite.disabled == true
      assert service_invite.email == "some email"

      assert service_invite.expires_at ==
               DateTime.from_naive!(~N[2010-04-17T14:00:00.000000Z], "Etc/UTC")
    end

    test "create_service_invite/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Services.create_service_invite(@invalid_attrs)
    end

    test "update_service_invite/2 with valid data updates the service_invite" do
      service_invite = service_invite_fixture()

      assert {:ok, %ServiceInvite{} = service_invite} =
               Services.update_service_invite(service_invite, @update_attrs)

      assert service_invite.disabled == false
      assert service_invite.email == "some updated email"

      assert service_invite.expires_at ==
               DateTime.from_naive!(~N[2011-05-18T15:01:01.000000Z], "Etc/UTC")
    end

    test "update_service_invite/2 with invalid data returns error changeset" do
      service_invite = service_invite_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Services.update_service_invite(service_invite, @invalid_attrs)

      assert service_invite == Services.get_service_invite!(service_invite.id)
    end

    test "delete_service_invite/1 deletes the service_invite" do
      service_invite = service_invite_fixture()
      assert {:ok, %ServiceInvite{}} = Services.delete_service_invite(service_invite)
      assert_raise Ecto.NoResultsError, fn -> Services.get_service_invite!(service_invite.id) end
    end

    test "change_service_invite/1 returns a service_invite changeset" do
      service_invite = service_invite_fixture()
      assert %Ecto.Changeset{} = Services.change_service_invite(service_invite)
    end
  end

  defp create_admin_role(_) do
    admin_role = fixture(:admin_role)
    {:ok, admin_role: admin_role}
  end
end
