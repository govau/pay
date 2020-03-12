defmodule Pay.Auth.UserContext do
  alias Pay.Services
  alias Pay.Services.User
  alias Pay.Repo

  defstruct [:service_user, :role, :permissions]

  def from_service_user(%Services.ServiceUser{} = service_user) do
    role = service_user.role.name

    permissions =
      Enum.map(service_user.permissions, fn permission ->
        permission.name
      end)

    %__MODULE__{
      service_user: service_user,
      role: role,
      permissions: permissions
    }
  end

  def from_user_service(%Services.User{} = user, service_id) do
    with {:ok, service_user} <- Services.get_user_service(user, service_id) do
      {:ok, from_service_user(service_user)}
    end
  end

  def has_permission?(t, permission) do
    Enum.member?(t.permissions, permission)
  end

  def has_role?(t, role) do
    t.role == role
  end

  def is_platform_admin?(t), do: t.service_user.user.platform_admin

  def permissions() do
    [
      "users-service:read",
      "users-service:create",
      "users-global:create",
      "tokens-active:read",
      "tokens-revoked:read",
      "tokens:create",
      "tokens:update",
      "tokens:delete",
      "transactions:read",
      "transactions-by-date:read",
      "transactions-by-fields:read",
      "transactions-download:read",
      "transactions-details:read",
      "transactions-events:read",
      "refunds:create",
      "transactions-amount:read",
      "transactions-description:read",
      "transactions-email:read",
      "transactions-card-type:read",
      "gateway-credentials:read",
      "gateway-credentials:update",
      "service-name:read",
      "service-name:update",
      "payment-types:read",
      "payment-types:update",
      "email-notification-template:read",
      "email-notification-paragraph:update",
      "email-notification-toggle:update"
    ]
  end
end
