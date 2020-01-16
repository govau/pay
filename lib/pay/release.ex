defmodule Pay.Release do
  @app :pay

  def migrate do
    load_app()

    for repo <- repos() do
      migrate(repo)
    end
  end

  defp migrate(repo) do
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :up, all: true))
  end

  def rollback(repo, version) do
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :down, to: version))
  end

  defp rollback(repo) do
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &Ecto.Migrator.run(&1, :down, all: true))
  end

  def reset_database do
    load_app()

    for repo <- repos() do
      rollback(repo)
      migrate(repo)
      run_seeds(repo)
    end
  end

  def repos do
    Application.fetch_env!(@app, :ecto_repos)
  end

  def load_app do
    Application.load(@app)
  end

  @spec run_seeds :: [any]
  def run_seeds do
    load_app()

    for repo <- repos() do
      {:ok, _, _} = Ecto.Migrator.with_repo(repo, &run_seeds_for/1)
    end
  end

  def run_seeds(repo) do
    {:ok, _, _} = Ecto.Migrator.with_repo(repo, &run_seeds_for/1)
  end

  defp run_seeds_for(repo) do
    # Run the seed script if it exists
    seed_script = priv_path_for(repo, "seeds.exs")

    if File.exists?(seed_script) do
      IO.puts("Running seed script..")
      Code.eval_file(seed_script)
    end
  end

  defp priv_path_for(repo, filename) do
    app = Keyword.get(repo.config(), :otp_app)

    repo_underscore =
      repo
      |> Module.split()
      |> List.last()
      |> Macro.underscore()

    priv_dir = "#{:code.priv_dir(app)}"

    Path.join([priv_dir, repo_underscore, filename])
  end

  defmodule Admin do
    @repo_apps [
      :crypto,
      :ssl,
      :postgrex,
      :ecto_sql
    ]

    defp start_repo() do
      IO.puts("Starting dependencies...")

      Enum.each(@repo_apps, fn app ->
        {:ok, _} = Application.ensure_all_started(app)
      end)

      IO.puts("Starting repos...")

      Enum.each(Pay.Release.repos(), fn repo ->
        {:ok, _} = repo.start_link(pool_size: 2)
      end)
    end

    def grant_platform_admin(email) do
      Pay.Release.load_app()
      start_repo()

      email
      |> Pay.Services.get_user_by_email()
      |> Pay.Services.set_platform_admin(true)
    end

    def revoke_platform_admin(email) do
      Pay.Release.load_app()
      start_repo()

      email
      |> Pay.Services.get_user_by_email()
      |> Pay.Services.set_platform_admin(false)
    end
  end
end
