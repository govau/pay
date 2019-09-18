defmodule Pay.VCAP do
  def services(source_env \\ "VCAP_SERVICES") do
    with vcap when not is_nil(vcap) <- System.get_env(source_env),
         {:ok, services} <- Jason.decode(vcap) do
      {:ok, services}
    else
      err ->
        {:error, "could not decode vcap json", err}
    end
  end

  def user_provided_service(service_name) do
    with {:ok, services} <- services(),
         user_provided <- services["user-provided"],
         %{"credentials" => credentials} <-
           Enum.find(user_provided, &(&1["name"] == service_name)) do
      {:ok, credentials}
    else
      _ ->
        {:error, "user_provided_service #{service_name} not found"}
    end
  end

  def user_provided(service_name, key) do
    with {:ok, service} <- user_provided_service(service_name),
         value when not is_nil(value) <- service[key] do
      {:ok, value}
    else
      _ ->
        {:error, "vcap value #{key} not found"}
    end
  end
end
