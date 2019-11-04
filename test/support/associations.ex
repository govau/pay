defmodule Pay.Support.Associations do
  def clear(%{__struct__: _struct} = schema, repo_name) when is_atom(repo_name) do
    clear(schema, [repo_name])
  end

  def clear(%{__struct__: struct} = schema, repo_name) when is_list(repo_name) do
    struct.__schema__(:associations)
    |> Enum.reduce(schema, fn association, schema ->
      case Enum.member?(repo_name, association) do
        true ->
          %{schema | association => do_clear(struct, association)}

        false ->
          schema
      end
    end)
  end

  defp do_clear(struct, association) do
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
