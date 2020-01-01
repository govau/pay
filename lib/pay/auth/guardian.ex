defmodule Pay.Auth.Guardian do
  use Guardian, otp_app: :pay

  def subject_for_token(_resource, _claims) do
    {:error, :not_implemented}
  end

  def resource_from_claims(
        %{
          "email_verified" => true,
          "email" => email,
          "name" => name
        } = _claims
      ) do
    Pay.Services.get_or_create_user(%{
      email: email,
      name: name,
      telephone_number: ""
    })
  end

  def resource_from_claims(_claims) do
    {:error, :resource_not_found}
  end

  defmodule JWKSSecretFetcher do
    def fetch_signing_secret(_module, _opts) do
      {:error, :not_implemented}
    end

    defp find_jwk_by_key(kid, %{"kid" => jwk_kid}), do: kid == jwk_kid

    # TODO: cache this key lookup
    def fetch_verifying_secret(_module, %{"kid" => kid}, _opts) do
      jwks_url = "https://#{Pay.auth0_domain()}/.well-known/jwks.json"

      with {:ok, jwks_response} <- HTTPoison.get(jwks_url),
           %{"keys" => jwks} <- Jason.decode!(jwks_response.body),
           key when not is_nil(key) <- Enum.find(jwks, fn jwk -> find_jwk_by_key(kid, jwk) end) do
        {:ok, key}
      else
        _ -> {:error, :issue_fetching_secret}
      end
    end
  end
end
