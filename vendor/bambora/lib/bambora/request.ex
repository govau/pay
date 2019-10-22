defmodule Bambora.Request do
  alias XmlBuilder, as: X

  @type t :: {:cdata, String.t()}

  @spec cdata(Bambora.Auth.xml_data()) :: t
  def cdata(element) do
    {:cdata, X.generate(element, format: :none)}
  end

  @spec prepare(elements :: [Bambora.Service.xml_data()], envelope :: String.t()) :: t
  def prepare(elements, envelope) do
    cdata(X.element(envelope, elements))
  end
end
