defmodule Bambora.Auth do
  alias Bambora.Service

  @type t :: %__MODULE__{
          username: String.t(),
          password: String.t()
        }

  @enforce_keys [:username, :password]
  defstruct [:username, :password]

  alias XmlBuilder, as: X

  defprotocol Authable do
    @spec authorisation(term) :: Bambora.Auth.t()
    def authorisation(term)
  end

  @spec security_element(t) :: Service.xml_data()
  def security_element(t) do
    X.element("Security", nil, [
      X.element("UserName", t.username),
      X.element("Password", t.password)
    ])
  end

  @spec authorise([Service.xml_data()], Authable.t()) :: [Service.xml_data()]
  def authorise(elements, auth) do
    elements ++ [security_element(Authable.authorisation(auth))]
  end
end
