defmodule Provisioning do
  defmodule FeatureBranches do
    def execute_command(target) do
      {output, _} = System.cmd("make", ["-C", "../", target])
      output
    end

    def run_command(target) do
      {lines, 0} = System.cmd("make", ["-C", "../", "-s", target])
      String.trim(lines) |> String.split("\n")
    end

    def orphaned(branches, entities) do
      feat_sep = "-f-"
      deployable_apps = MapSet.new(["pay", "pay-psql"])

      entities
      |> Enum.filter(&String.contains?(&1, feat_sep))
      |> Enum.map(fn entity ->
        [app, branch] = String.split(entity, feat_sep)
        {app, branch, entity}
      end)
      |> Enum.filter(fn {app, branch, _} ->
        MapSet.member?(deployable_apps, app) and not MapSet.member?(branches, branch)
      end)
      |> Enum.map(fn {_, _, entity} -> entity end)
      |> MapSet.new()
    end

    def feature_branches, do: run_command("list-branches") |> MapSet.new()
    def deployed_apps, do: run_command("list-apps") |> MapSet.new()
    def deployed_services, do: run_command("list-services") |> MapSet.new()

    def undeploy_closed_branches() do
      branches = feature_branches()
      orphaned_services = orphaned(branches, deployed_services())
      orphaned_apps = orphaned(branches, deployed_apps())

      Enum.each(orphaned_apps, fn app ->
        IO.puts(execute_command("undeploy-app-#{app}"))
      end)

      Enum.each(orphaned_services, fn service ->
        IO.puts(execute_command("undeploy-service-#{service}"))
      end)
    end
  end

  defmodule CLI do
    defp append_item(items, item_to_append) do
      case Enum.member?(items, item_to_append) do
        true -> items
        false -> items ++ [item_to_append]
      end
    end

    defp remove_item(items, item_to_remove) do
      Enum.reject(items, fn item -> item == item_to_remove end)
    end

    def main(args) do
      {options, _, _} = OptionParser.parse(args, switches: [host: :string, teardown: :boolean])

      hostname = Keyword.fetch!(options, :host)
      teardown = Keyword.get(options, :teardown, false)

      operation =
        case teardown do
          true -> &remove_item/2
          false -> &append_item/2
        end

      client_id = System.get_env("AUTH0_DEV_CLIENT_ID")

      {:ok, %{"callbacks" => callbacks, "web_origins" => web_origins}} =
        Auth0Ex.Management.Client.get(client_id)

      {:ok, _} =
        Auth0Ex.Management.Client.update(client_id, %{
          callbacks: operation.(callbacks, hostname),
          web_origins: operation.(web_origins, hostname)
        })
    end
  end
end
