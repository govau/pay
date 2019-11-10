defmodule Pay.VCAP do
  @spec services(String.t()) :: {:error, String.t()} | {:ok, map}
  def services(source_env \\ "VCAP_SERVICES") when is_binary(source_env) do
    with vcap when not is_nil(vcap) <- System.get_env(source_env),
         {:ok, services} <- Jason.decode(vcap) do
      {:ok, services}
    else
      err ->
        {:error, "could not decode #{inspect(source_env)} json: #{err}"}
    end
  end

  @spec user_provided_service(String.t()) :: {:error, String.t()} | {:ok, map}
  def user_provided_service(service_name) when is_binary(service_name) do
    with {:ok, services} <- services(),
         user_provided <- services["user-provided"],
         %{"credentials" => credentials} <-
           Enum.find(user_provided, &(&1["name"] == service_name)) do
      {:ok, credentials}
    else
      _ ->
        {:error, "could not fetch user provided service #{inspect(service_name)}"}
    end
  end

  @spec user_provided(String.t(), String.t(), String.t() | nil) :: {:ok, String.t() | nil}
  def user_provided(service_name, key, default \\ nil)
      when is_binary(service_name) and is_binary(key) and (is_binary(default) or is_nil(default)) do
    with {:ok, service} <- user_provided_service(service_name),
         value when not is_nil(value) <- service[key] do
      {:ok, value}
    else
      _ -> {:ok, default}
    end
  end
end
