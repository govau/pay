defmodule Pay.Support.Associations do
  def clear(%{__struct__: struct} = schema) do
    clear(schema, struct.__schema__(:associations))
  end

  def clear(schemas) when is_list(schemas) do
    Enum.map(schemas, &clear/1)
  end

  def clear(%{__struct__: _} = schema, associations) when is_list(associations) do
    Enum.reduce(
      associations,
      schema,
      fn association, schema ->
        clear(schema, association)
      end
    )
  end

  def clear(%{__struct__: struct} = schema, association) do
    %{schema | association => clear_association(struct, association)}
  end

  defp clear_association(struct, association) do
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
