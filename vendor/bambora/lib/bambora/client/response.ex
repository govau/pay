defmodule Bambora.Client.Response do
  import SweetXml

  @type decoder :: atom | {atom, decoder | [decoder]} | [decoder] | %{optional(atom) => decoder}
  @type sweet_spec :: [{atom, %SweetXpath{} | [%SweetXpath{} | sweet_spec]}]

  @spec camelize(atom) :: String.t()
  defp camelize(term), do: term |> Atom.to_string() |> Macro.camelize()

  @spec decode_response(String.t(), decoder) :: map
  def decode_response(response_body, {selector, decoders}) do
    %{
      selector => xpath(response_body, ~x"//#{camelize(selector)}", decode_response(decoders))
    }
  end

  @spec decode_response(decoder) :: sweet_spec

  def decode_response({selector, decoder}) when is_list(decoder) do
    [{selector, [~x"./#{camelize(selector)}"l | decode_response(decoder)]}]
  end

  def decode_response({selector, decoder}) do
    [{selector, [~x"./#{camelize(selector)}", decode_response(decoder)]}]
  end

  def decode_response(decoders) when is_map(decoders) or is_list(decoders) do
    Enum.flat_map(decoders, &decode_response/1)
  end

  def decode_response(term) when is_atom(term) do
    [{term, ~x"./#{camelize(term)}/text()"s}]
  end

  # xpath arguments can get complicated, assume:
  #   SWEET_XPATH = ~x"/SomeSelector"
  #   SPEC        = {:label, SWEET_XPATH} |
  #   SPEC        = {:label, [SWEET_XPATH, SPEC...]}
  #
  # xpath can be called with:
  #   xpath(parent | raw_xml, SWEET_XPATH)
  #   xpath(parent | raw_xml, SWEET_XPATH, SPEC)
  #
  # The decode_response abstraction we've build attempts to map elixir data structures into xpath selectors.
  # A call like:
  #   decode_response(body, {:query_response, %{response: [:name, :address]}})
  #
  # will be assembled into:
  #   xpath(
  #     body,
  #     ~x"//QueryResponse",
  #     [
  #       {:response,
  #        [~x"./Response"l, {:name, ~x"./Name/text()"s}, {:amount, ~x"./Amount/text()"s}]}
  #     ]
  #   )
  #
  # which simplifies to:
  #   xpath(
  #     body,
  #     ~x"//QueryResponse",
  #     response: [~x"./Response"l, name: ~x"./Name/text()"s, address: ~x"./Address/text()"s]
  #   )
  #
  # and decodes into a structure like:
  #   %{
  #     query_response: %{
  #       response: [
  #         %{
  #           name: "Alex",
  #           address: "Surry Hills"
  #         },
  #         %{name: "Sam", address: "Darlinghurst"}
  #       ]
  #     }
  #   }
end
