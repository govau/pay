# NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
# https://openapi-generator.tech
# Do not edit the class manually.

defmodule PayGovAu.Model.IndexResponse do
  @moduledoc """
  Response schema for index operation
  """

  @derive [Poison.Encoder]
  defstruct [
    :data
  ]

  @type t :: %__MODULE__{
          :data => [Payment] | nil
        }
end

defimpl Poison.Decoder, for: PayGovAu.Model.IndexResponse do
  import PayGovAu.Deserializer

  def decode(value, options) do
    value
    |> deserialize(:data, :list, PayGovAu.Model.Payment, options)
  end
end
