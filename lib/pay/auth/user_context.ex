defmodule Pay.Auth.UserContext do
  alias Pay.Services
  alias Pay.Services.User
  alias Pay.Repo

  defmodule ServiceContext do
    defstruct [:service, :role, :permissions]
  end

  defstruct [:user, :service_id, :services]

  def from_user(user) do
    services = Services.list_services_by_user(user)
  end

  def can_access_service?(t, service_id) do
  end

  def for_service(t, service_id), do: %{t | service_id: service_id}

  def user_has_permission(%User{} = user, service_id, permission) do
    nil

    # with {:ok, service} <- Services.get_user_service(user, service_id),
    # serviceServices.get_user_service(user, service_id)
  end

  def user_has_permissions(%User{} = user, permissions) do
  end
end
