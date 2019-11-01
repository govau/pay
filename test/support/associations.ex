defmodule Pay.Support.Associations do
  def clear(%{__struct__: struct} = schema) do
    struct.__schema__(:associations)
    |> Enum.reduce(schema, fn association, schema ->
      %{schema | association => clear(struct, association)}
    end)
  end

  defp clear(struct, association) do
    %{
      cardinality: cardinality,
      field: field,
      owner: owner
    } = struct.__schema__(:association, association)

    %Ecto.Association.NotLoaded{
      __cardinality__: cardinality,
      __field__: field,
      __owner__: owner
    }
  end
end
