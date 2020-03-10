defmodule Pay.Auth.Permissions do
  alias Pay.Services
  alias Pay.Services.User
  alias Pay.Repo

  def user_has_permission(%User{} = user, service_id, permission) do
    nil
    # with {:ok, service} <- Services.get_user_service(user, service_id),
    # serviceServices.get_user_service(user, service_id)
  end

  def user_has_permissions(%User{} = user, permissions) do
    nil
  end
end
