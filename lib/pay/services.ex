defmodule Pay.Services do
  @moduledoc """
  The Services context.
  """

  import Ecto.Query, warn: false
  alias Pay.Repo

  alias Pay.Payments
  alias Pay.Services.Permission
  alias Pay.Services.Role
  alias Pay.Services.ServiceUser
  alias Pay.Services.ServiceInvite
  alias Pay.Services.ServiceGatewayAccount
  alias Pay.Services.Service.GoLiveStage

  @doc """
  Returns the list of permissions.

  ## Examples

      iex> list_permissions()
      [%Permission{}, ...]

  """
  def list_permissions do
    Repo.all(Permission)
  end

  @doc """
  Gets a single permission.

  Raises `Ecto.NoResultsError` if the Permission does not exist.

  ## Examples

      iex> get_permission!(123)
      %Permission{}

      iex> get_permission!(456)
      ** (Ecto.NoResultsError)

  """
  def get_permission!(id), do: Repo.get!(Permission, id)

  @doc """
  Creates a permission.

  ## Examples

      iex> create_permission(%{field: value})
      {:ok, %Permission{}}

      iex> create_permission(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_permission(attrs \\ %{}) do
    %Permission{}
    |> Permission.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a permission.

  ## Examples

      iex> update_permission(permission, %{field: new_value})
      {:ok, %Permission{}}

      iex> update_permission(permission, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_permission(%Permission{} = permission, attrs) do
    permission
    |> Permission.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Permission.

  ## Examples

      iex> delete_permission(permission)
      {:ok, %Permission{}}

      iex> delete_permission(permission)
      {:error, %Ecto.Changeset{}}

  """
  def delete_permission(%Permission{} = permission) do
    Repo.delete(permission)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking permission changes.

  ## Examples

      iex> change_permission(permission)
      %Ecto.Changeset{source: %Permission{}}

  """
  def change_permission(%Permission{} = permission) do
    Permission.changeset(permission, %{})
  end

  alias Pay.Services.Role

  @doc """
  Returns the list of roles.

  ## Examples

      iex> list_roles()
      [%Role{}, ...]

  """
  def list_roles do
    Repo.all(from Role, preload: :permissions)
  end

  @doc """
  Gets a single role.

  Raises `Ecto.NoResultsError` if the Role does not exist.

  ## Examples

      iex> get_role!(123)
      %Role{}

      iex> get_role!(456)
      ** (Ecto.NoResultsError)

  """
  def get_role!(id), do: Repo.get!(Role, id) |> Repo.preload([:permissions])

  @doc """
  Gets a single role by name.

  Raises `Ecto.NoResultsError` if the Role does not exist.

  ## Examples

      iex> get_role_by_name!("admin")
      %Role{}

      iex> get_role_by_name!("admin2")
      ** (Ecto.NoResultsError)

  """
  def get_role_by_name!(name), do: Repo.get_by!(Role, name: name) |> Repo.preload([:permissions])

  def get_role_by_name(name) do
    case Repo.get_by(from(Role, preload: [:permissions]), name: name) do
      nil -> {:error, "role not found"}
      role -> {:ok, role}
    end
  end

  @doc """
  Creates a role.

  ## Examples

      iex> create_role(%{field: value})
      {:ok, %Role{}}

      iex> create_role(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_role(attrs \\ %{}) do
    case Repo.insert(Role.changeset(%Role{}, attrs)) do
      {:ok, r} -> {:ok, Repo.preload(r, [:permissions])}
      {:error, changeset} -> {:error, changeset}
    end
  end

  @doc """
  Updates a role.

  ## Examples

      iex> update_role(role, %{field: new_value})
      {:ok, %Role{}}

      iex> update_role(role, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_role(%Role{} = role, attrs) do
    role
    |> Role.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Role.

  ## Examples

      iex> delete_role(role)
      {:ok, %Role{}}

      iex> delete_role(role)
      {:error, %Ecto.Changeset{}}

  """
  def delete_role(%Role{} = role) do
    Repo.delete(role)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking role changes.

  ## Examples

      iex> change_role(role)
      %Ecto.Changeset{source: %Role{}}

  """
  def change_role(%Role{} = role) do
    Role.changeset(role, %{})
  end

  alias Pay.Services.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Gets a single user by the given external ID.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62d")
      %User{}

      iex> get_user_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62e")
      ** (Ecto.NoResultsError)

  """
  @spec get_user_by_external_id!(String.t()) :: %User{}
  def get_user_by_external_id!(external_id),
    do: Repo.get_by!(User, external_id: external_id)

  @spec get_user_by_external_id(String.t()) :: %User{} | nil
  def get_user_by_external_id(external_id),
    do: Repo.get_by(User, external_id: external_id)

  @spec get_user_by_email(String.t()) :: %User{} | nil
  def get_user_by_email(email),
    do: Repo.get_by(User, email: email)

  def get_or_create_user(%{email: email} = changes) do
    {:ok, _user} =
      %User{}
      |> User.create_changeset(changes)
      |> Repo.insert(on_conflict: :nothing)

    {:ok, get_user_by_email(email)}
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{
      external_id: Ecto.UUID.generate()
    }
    |> User.create_changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.update_changeset(attrs)
    |> Repo.update()
  end

  def set_platform_admin(%User{} = user, is_platform_admin) do
    user
    |> User.admin_changeset(%{platform_admin: is_platform_admin})
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  alias Pay.Services.OrganisationType

  @doc """
  Returns the list of organisation_types.

  ## Examples

      iex> list_organisation_types()
      [%OrganisationType{}, ...]

  """
  def list_organisation_types do
    Repo.all(OrganisationType)
  end

  @doc """
  Gets a single organisation_type.

  Raises `Ecto.NoResultsError` if the Organisation type does not exist.

  ## Examples

      iex> get_organisation_type!(123)
      %OrganisationType{}

      iex> get_organisation_type!(456)
      ** (Ecto.NoResultsError)

  """
  def get_organisation_type!(id), do: Repo.get!(OrganisationType, id)

  @doc """
  Creates a organisation_type.

  ## Examples

      iex> create_organisation_type(%{field: value})
      {:ok, %OrganisationType{}}

      iex> create_organisation_type(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_organisation_type(attrs \\ %{}) do
    %OrganisationType{}
    |> OrganisationType.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a organisation_type.

  ## Examples

      iex> update_organisation_type(organisation_type, %{field: new_value})
      {:ok, %OrganisationType{}}

      iex> update_organisation_type(organisation_type, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_organisation_type(%OrganisationType{} = organisation_type, attrs) do
    organisation_type
    |> OrganisationType.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a OrganisationType.

  ## Examples

      iex> delete_organisation_type(organisation_type)
      {:ok, %OrganisationType{}}

      iex> delete_organisation_type(organisation_type)
      {:error, %Ecto.Changeset{}}

  """
  def delete_organisation_type(%OrganisationType{} = organisation_type) do
    Repo.delete(organisation_type)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking organisation_type changes.

  ## Examples

      iex> change_organisation_type(organisation_type)
      %Ecto.Changeset{source: %OrganisationType{}}

  """
  def change_organisation_type(%OrganisationType{} = organisation_type) do
    OrganisationType.changeset(organisation_type, %{})
  end

  alias Pay.Services.Organisation

  @doc """
  Returns the list of organisations.

  ## Examples

      iex> list_organisations()
      [%Organisation{}, ...]

  """
  def list_organisations do
    Enum.map(Repo.all(Organisation), fn o -> Repo.preload(o, [:type]) end)
  end

  @doc """
  Gets a single organisation.

  Raises `Ecto.NoResultsError` if the Organisation does not exist.

  ## Examples

      iex> get_organisation!(123)
      %Organisation{}

      iex> get_organisation!(456)
      ** (Ecto.NoResultsError)

  """
  def get_organisation!(id), do: Repo.get!(Organisation, id) |> Repo.preload([:type])

  @doc """
  Gets a single organisation by the given external ID.

  Raises `Ecto.NoResultsError` if the Organisation does not exist.

  ## Examples

      iex> get_organisation_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62d")
      %Organisation{}

      iex> get_organisation_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62e")
      ** (Ecto.NoResultsError)

  """
  def get_organisation_by_external_id!(external_id),
    do: Repo.get_by!(Organisation, external_id: external_id) |> Repo.preload([:type])

  @doc """
  Creates a organisation.

  ## Examples

      iex> create_organisation(%{field: value})
      {:ok, %Organisation{}}

      iex> create_organisation(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_organisation(attrs \\ %{}) do
    case Repo.insert(
           Organisation.create_changeset(
             %Organisation{
               external_id: Ecto.UUID.generate()
             },
             attrs
           )
         ) do
      {:ok, o} -> {:ok, Repo.preload(o, [:type])}
      {:error, changeset} -> {:error, changeset}
    end
  end

  @doc """
  Updates a organisation.

  ## Examples

      iex> update_organisation(organisation, %{field: new_value})
      {:ok, %Organisation{}}

      iex> update_organisation(organisation, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_organisation(%Organisation{} = organisation, attrs) do
    organisation
    |> Organisation.update_changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Organisation.

  ## Examples

      iex> delete_organisation(organisation)
      {:ok, %Organisation{}}

      iex> delete_organisation(organisation)
      {:error, %Ecto.Changeset{}}

  """
  def delete_organisation(%Organisation{} = organisation) do
    Repo.delete(organisation)
  end

  alias Pay.Services.Service

  @doc """
  Returns the list of services.

  ## Examples

      iex> list_services()
      [%Service{}, ...]

  """
  def list_services do
    Repo.all(Service)
  end

  @doc """
  Returns the list of services the user with the given external ID has access to.

  ## Examples

      iex> list_services_by_user_external_id("3bfd1a3c-0960-49da-be66-053b159df62d")
      [%Service{}, ...]

  """
  def list_services_by_user_external_id(external_id) do
    %{services: services} =
      external_id
      |> get_user_by_external_id!()
      |> Repo.preload(:services)

    services
  end

  @doc """
  Gets a single service.

  Raises `Ecto.NoResultsError` if the Service does not exist.

  ## Examples

      iex> get_service!(123)
      %Service{}

      iex> get_service!(456)
      ** (Ecto.NoResultsError)

  """
  def get_service!(id), do: Repo.get!(Service, id)

  @doc """
  Gets a single service by the given external ID.

  Raises `Ecto.NoResultsError` if the Service does not exist.

  ## Examples

      iex> get_service_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62d")
      %Service{}

      iex> get_service_by_external_id!("3bfd1a3c-0960-49da-be66-053b159df62e")
      ** (Ecto.NoResultsError)

  """
  def get_service_by_external_id!(external_id),
    do: Repo.get_by!(Service, external_id: external_id)

  @doc """
  Gets a single service by the given gateway account external ID.

  Raises `Ecto.NoResultsError` if the Service does not exist.

  ## Examples

      iex> get_service_by_gateway_account_external_id!("3bfd1a3c-0960-49da-be66-053b159df62d")
      %Service{}

      iex> get_service_by_gateway_account_external_id!("3bfd1a3c-0960-49da-be66-053b159df62e")
      ** (Ecto.NoResultsError)

  """
  def get_service_by_gateway_account_external_id!(external_id),
    do:
      Repo.one!(
        from s in Service,
          left_join: sga in ServiceGatewayAccount,
          on: s.id == sga.service_id,
          where: sga.gateway_account_id == ^external_id
      )

  @doc """
  Gets a single service by the given external ID.

  Returns nil if the Service does not exist.

  ## Examples

      iex> get_service_by_external_id("3bfd1a3c-0960-49da-be66-053b159df62d")
      %Service{}

      iex> get_service_by_external_id("3bfd1a3c-0960-49da-be66-053b159df62e")
      nil

  """
  def get_service_by_external_id(external_id),
    do: Repo.get_by(Service, external_id: external_id)

  @doc """
  Creates a service using the given user as the service's owner/admin.

  ## Examples

      iex> create_service(%User{}, %{field: value})
      {:ok, %Service{}}

      iex> create_service(%User{}, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_service(%User{} = user, attrs \\ %{}) do
    admin_role = get_role_by_name!(Role.Admin.value().name)

    case Repo.insert(
           Service.create_changeset(
             %Service{
               external_id: Ecto.UUID.generate(),
               current_go_live_stage: GoLiveStage.NotStarted.value().name,
               custom_branding: %{}
             },
             attrs
           )
         ) do
      {:ok, service} ->
        case Repo.insert(
               ServiceUser.changeset(%ServiceUser{}, %{
                 service_id: service.id,
                 user_id: user.id,
                 role_id: admin_role.id
               })
             ) do
          {:ok, _serviceUser} ->
            case Payments.create_gateway_account(%{
                   "service_name" => service.name,
                   "type" => Payments.GatewayAccount.type(:test),
                   "payment_provider" => Payments.GatewayAccount.provider(:sandbox)
                 }) do
              {:ok, gatewayAccount} ->
                case Repo.insert(%ServiceGatewayAccount{
                       gateway_account_id: gatewayAccount.external_id,
                       service_id: service.id
                     }) do
                  {:ok, _assoc} -> {:ok, service}
                  {:error, changeset} -> {:error, changeset}
                end

              {:error, changeset} ->
                {:error, changeset}
            end

          {:error, changeset} ->
            {:error, changeset}
        end

      {:error, changeset} ->
        {:error, changeset}
    end
  end

  @doc """
  Updates a service.

  ## Examples

      iex> update_service(service, %{field: new_value})
      {:ok, %Service{}}

      iex> update_service(service, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_service(%Service{} = service, attrs) do
    service
    |> Service.update_changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Service.

  ## Examples

      iex> delete_service(service)
      {:ok, %Service{}}

      iex> delete_service(service)
      {:error, %Ecto.Changeset{}}

  """
  def delete_service(%Service{} = service) do
    Repo.delete(service)
  end

  alias Pay.Services.RolePermission

  @doc """
  Returns the list of role_permissions.

  ## Examples

      iex> list_role_permissions()
      [%RolePermission{}, ...]

  """
  def list_role_permissions do
    Repo.all(RolePermission)
  end

  @doc """
  Gets a single role_permission.

  Raises `Ecto.NoResultsError` if the Role permission does not exist.

  ## Examples

      iex> get_role_permission!(123)
      %RolePermission{}

      iex> get_role_permission!(456)
      ** (Ecto.NoResultsError)

  """
  def get_role_permission!(id), do: Repo.get!(RolePermission, id)

  @doc """
  Creates a role_permission.

  ## Examples

      iex> create_role_permission(%{field: value})
      {:ok, %RolePermission{}}

      iex> create_role_permission(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_role_permission(attrs \\ %{}) do
    %RolePermission{}
    |> RolePermission.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a role_permission.

  ## Examples

      iex> update_role_permission(role_permission, %{field: new_value})
      {:ok, %RolePermission{}}

      iex> update_role_permission(role_permission, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_role_permission(%RolePermission{} = role_permission, attrs) do
    role_permission
    |> RolePermission.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a RolePermission.

  ## Examples

      iex> delete_role_permission(role_permission)
      {:ok, %RolePermission{}}

      iex> delete_role_permission(role_permission)
      {:error, %Ecto.Changeset{}}

  """
  def delete_role_permission(%RolePermission{} = role_permission) do
    Repo.delete(role_permission)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking role_permission changes.

  ## Examples

      iex> change_role_permission(role_permission)
      %Ecto.Changeset{source: %RolePermission{}}

  """
  def change_role_permission(%RolePermission{} = role_permission) do
    RolePermission.changeset(role_permission, %{})
  end

  alias Pay.Services.OrganisationDomain

  @doc """
  Returns the list of organisation_domains.

  ## Examples

      iex> list_organisation_domains()
      [%OrganisationDomain{}, ...]

  """
  def list_organisation_domains do
    Repo.all(OrganisationDomain)
  end

  @doc """
  Gets a single organisation_domain.

  Raises `Ecto.NoResultsError` if the Organisation domain does not exist.

  ## Examples

      iex> get_organisation_domain!(123)
      %OrganisationDomain{}

      iex> get_organisation_domain!(456)
      ** (Ecto.NoResultsError)

  """
  def get_organisation_domain!(id), do: Repo.get!(OrganisationDomain, id)

  @doc """
  Creates a organisation_domain.

  ## Examples

      iex> create_organisation_domain(%{field: value})
      {:ok, %OrganisationDomain{}}

      iex> create_organisation_domain(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_organisation_domain(attrs \\ %{}) do
    %OrganisationDomain{}
    |> OrganisationDomain.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a organisation_domain.

  ## Examples

      iex> update_organisation_domain(organisation_domain, %{field: new_value})
      {:ok, %OrganisationDomain{}}

      iex> update_organisation_domain(organisation_domain, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_organisation_domain(%OrganisationDomain{} = organisation_domain, attrs) do
    organisation_domain
    |> OrganisationDomain.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a OrganisationDomain.

  ## Examples

      iex> delete_organisation_domain(organisation_domain)
      {:ok, %OrganisationDomain{}}

      iex> delete_organisation_domain(organisation_domain)
      {:error, %Ecto.Changeset{}}

  """
  def delete_organisation_domain(%OrganisationDomain{} = organisation_domain) do
    Repo.delete(organisation_domain)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking organisation_domain changes.

  ## Examples

      iex> change_organisation_domain(organisation_domain)
      %Ecto.Changeset{source: %OrganisationDomain{}}

  """
  def change_organisation_domain(%OrganisationDomain{} = organisation_domain) do
    OrganisationDomain.changeset(organisation_domain, %{})
  end

  alias Pay.Services.ServiceUser

  @doc """
  Returns the list of service_users.

  ## Examples

      iex> list_service_users()
      [%ServiceUser{}, ...]

  """
  def list_service_users do
    Repo.all(ServiceUser)
  end

  @doc """
  Returns the list of service_users for the given service external_id.

  ## Examples

      iex> list_service_users_by_service_external_id("3bfd1a3c-0960-49da-be66-053b159df62e")
      [%ServiceUser{}, ...]

  """
  def list_service_users_by_service_external_id(external_id) do
    Repo.all(
      from su in ServiceUser,
        left_join: s in Service,
        on: su.service_id == s.id,
        left_join: u in User,
        on: su.user_id == u.id,
        where: s.external_id == ^external_id,
        preload: [:user, :role]
    )
  end

  @doc """
  Gets a single service_user.

  Raises `Ecto.NoResultsError` if the Service user does not exist.

  ## Examples

      iex> get_service_user!(123)
      %ServiceUser{}

      iex> get_service_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_service_user!(id), do: Repo.get!(ServiceUser, id)

  @doc """
  Creates a service_user.

  ## Examples

      iex> create_service_user(%{field: value})
      {:ok, %ServiceUser{}}

      iex> create_service_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_service_user(attrs \\ %{}) do
    %ServiceUser{}
    |> ServiceUser.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a service_user.

  ## Examples

      iex> update_service_user(service_user, %{field: new_value})
      {:ok, %ServiceUser{}}

      iex> update_service_user(service_user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_service_user(%ServiceUser{} = service_user, attrs) do
    service_user
    |> ServiceUser.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a ServiceUser.

  ## Examples

      iex> delete_service_user(service_user)
      {:ok, %ServiceUser{}}

      iex> delete_service_user(service_user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_service_user(%ServiceUser{} = service_user) do
    Repo.delete(service_user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking service_user changes.

  ## Examples

      iex> change_service_user(service_user)
      %Ecto.Changeset{source: %ServiceUser{}}

  """
  def change_service_user(%ServiceUser{} = service_user) do
    ServiceUser.changeset(service_user, %{})
  end

  def create_service_invite(%ServiceInvite{} = service_invite, attrs) do
    service_invite
    |> ServiceInvite.changeset(attrs)
    |> Repo.insert()
  end

  def create_service_invite(attrs) do
    create_service_invite(%ServiceInvite{}, attrs)
  end

  defp query_service_invites(%{email: email, service_id: service_id}) do
    from ServiceInvite, where: [email: ^email, service_id: ^service_id]
  end

  defp query_service_invites(%{email: email}) do
    from ServiceInvite, where: [email: ^email]
  end

  defp query_service_invites(%{service_id: service_id}) do
    from ServiceInvite, where: [service_id: ^service_id]
  end

  @doc """
  Get and order service invites with preloads from the perspective of a service.
  Which users have been invited to this service?
  """
  def list_service_invites(%{service_id: _service_id} = params) do
    current_services =
      from query_service_invites(params),
        distinct: [:email, :service_id],
        order_by: [desc: :expires_at],
        preload: [:sender, :service]

    current_services |> Repo.all()
  end

  @doc """
  Get all service invites from the perspective of a user.
  Which services are available to me?
  """
  def list_user_service_invites(email) do
    current_services =
      from query_service_invites(%{email: email}),
        distinct: [:email, :service_id],
        order_by: [desc: :expires_at],
        preload: [:sender, :service]

    current_services |> Repo.all()
  end

  @doc """
  Search for a users' invite to a service that has not yet expired.
  """
  def get_current_service_invite(email, service_id) do
    now = DateTime.utc_now()

    current_services =
      from s in query_service_invites(%{email: email, service_id: service_id}),
        where: s.disabled == ^false and s.expires_at > ^now

    current_services |> last(:expires_at) |> Repo.one!()
  end

  @doc """
  Remove any service invites for an email to a specific service.
  Do this when granting a user access to a service.
  """
  def clear_service_invites(email, service_id) do
    query_service_invites(%{email: email, service_id: service_id})
    |> Repo.delete_all()
  end

  @doc """
  Check that a user has access to a service and return the pair
  """
  def get_user_service(%User{} = user, service_id) do
    service_user =
      ServiceUser
      |> where(user_id: ^user.id, service_id: ^service_id)
      |> preload([:service, :user])
      |> Repo.one()

    with %{service: service, user: user} <- service_user do
      {:ok, %{service: service, user: user}}
    else
      nil -> {:error, "user not associated with service"}
    end
  end

  def get_invite_role(%ServiceInvite{} = invite) do
    with %{role: role} <- Repo.preload(invite, :role) do
      role
    end
  end

  @doc """
  Check that a user has access to a service and return the service
  """
  def service_for_user(%User{} = user, service_id) do
    with {:ok, %{service: service}} <- get_user_service(user, service_id) do
      service
    end
  end

  @doc """
  Check whether a user has access to a service
  """
  def service_has_user?(email, service_id) do
    with %User{} = user <- get_user_by_email(email),
         {:ok, _service_user} <- get_user_service(user, service_id) do
      true
    else
      _ -> false
    end
  end

  defp second, do: 1
  defp minute, do: second() * 60
  defp hour, do: minute() * 60
  defp day, do: hour() * 24

  def invite_user(
        %User{id: sender_id} = sender,
        %{email: email, service_id: service_id, role: role}
      ) do
    expires_at = DateTime.utc_now() |> DateTime.add(day() * 5, :second)

    if service_has_user?(email, service_id) do
      {:error, "user already belongs to service"}
    else
      with {:ok, %{service: service}} <- get_user_service(sender, service_id),
           {:ok, %Role{id: role_id}} <- get_role_by_name(role),
           {:ok, _service_invite} <-
             create_service_invite(%{
               email: email,
               sender_id: sender_id,
               service_id: service_id,
               role_id: role_id,
               expires_at: expires_at
             }) do
        {:ok, service}
      end
    end
  end

  def accept_invite(
        %User{id: user_id, email: email},
        %{service_id: service_id}
      ) do
    with service_invite <- get_current_service_invite(email, service_id),
         {:ok, service_user} <-
           create_service_user(%{
             user_id: user_id,
             service_id: service_id,
             role_id: service_invite.role_id
           }),
         %{service: service} <- Repo.preload(service_user, :service) do
      clear_service_invites(email, service_id)
      {:ok, service}
    end
  end
end
