defmodule Bambora.Client.Request do
  alias XmlBuilder, as: X

  @type xml_element ::
          {String.t(), %{optional(String.t()) => String.t()}, [xml_element] | String.t()}
          | {:cdata, String.t()}
  @type t :: {:cdata, xml_element}

  @spec auth() :: {String.t(), String.t()}
  defp auth do
    api_username = Application.fetch_env!(:bambora, :api_username)
    api_password = Application.fetch_env!(:bambora, :api_password)

    {api_username, api_password}
  end

  @spec security_element({String.t(), String.t()}) :: xml_element
  def security_element({user, pass}) do
    X.element("Security", nil, [
      X.element("UserName", user),
      X.element("Password", pass)
    ])
  end

  @spec cdata(xml_element) :: xml_element
  def cdata(element) do
    {:cdata, X.generate(element, format: :none)}
  end

  @spec prepare(String.t(), [xml_element]) :: t
  def prepare(envelope, elements) do
    envelope
    |> X.element(elements ++ [security_element(auth())])
    |> cdata
  end
end
