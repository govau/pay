# NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
# https://openapi-generator.tech
# Do not edit the class manually.

defmodule PayGovAu.Model.CreateRequest do
  @moduledoc """
  Request schema for create operation
  """

  @derive [Poison.Encoder]
  defstruct [
    :payment
  ]

  @type t :: %__MODULE__{
          :payment => Payment | nil
        }
end

defimpl Poison.Decoder, for: PayGovAu.Model.CreateRequest do
  import PayGovAu.Deserializer

  def decode(value, options) do
    value
    |> deserialize(:payment, :struct, PayGovAu.Model.Payment, options)
  end
end
