# NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
# https://openapi-generator.tech
# Do not edit the class manually.

defmodule PayGovAu.Model.CreateErrorResponse do
  @moduledoc """

  """

  @derive [Poison.Encoder]
  defstruct [
    :errors
  ]

  @type t :: %__MODULE__{
          :errors => Map | nil
        }
end

defimpl Poison.Decoder, for: PayGovAu.Model.CreateErrorResponse do
  import PayGovAu.Deserializer

  def decode(value, options) do
    value
    |> deserialize(:errors, :struct, PayGovAu.Model.Map, options)
  end
end
