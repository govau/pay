defmodule Bambora.Service do
  @type xml_data ::
          {String.t(), %{optional(String.t()) => String.t()}, [xml_data] | String.t()}

  @callback operation :: String.t()
  @callback envelope :: String.t()
  @callback build_body(params :: map) :: [xml_data]
  @callback decode(response :: map) :: map
end
