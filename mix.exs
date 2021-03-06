defmodule Pay.MixProject do
  use Mix.Project

  def project do
    [
      app: :pay,
      version: "0.1.0",
      elixir: "~> 1.5",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext] ++ Mix.compilers() ++ [:phoenix_swagger],
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Pay.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:phoenix, "~> 1.4.9"},
      {:phoenix_pubsub, "~> 1.1"},
      {:phoenix_ecto, "~> 4.0"},
      # Latest master fixes a compatibility issue with Phoenix, not released yet
      # https://github.com/xerions/phoenix_swagger/issues/232
      {:phoenix_swagger, git: "https://github.com/xerions/phoenix_swagger", branch: "master"},
      {:ex_json_schema, "~> 0.6"},
      {:ecto_sql, "~> 3.1"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 2.11"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:gettext, "~> 0.11"},
      {:jason, "~> 1.0"},
      {:plug_cowboy, "~> 2.0"},
      {:sentry, "~> 7.0"},
      {:slugger, "~> 0.3"},
      {:stripity_stripe, "~> 2.4.0"},
      {:absinthe, "~> 1.4"},
      {:absinthe_plug, "~> 1.4"},
      {:guardian, "~> 2.0"},
      {:pay_gov_au, path: "./clients/pay-client"},
      {:soap, path: "./vendor/soap"},

      # TODO: hackney is a transitive dep of sentry that broke;
      # unpin it once sentry sorts themselves out
      {:hackney, "~> 1.15.2"},
      {:dialyxir, "~> 1.0.0-rc.7", only: [:dev], runtime: false}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to create, migrate and run the seeds file at once:
  #
  #     $ mix ecto.setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      swagger: ["phx.swagger.generate"],
      test: ["ecto.create --quiet", "ecto.migrate", "swagger", "test"]
    ]
  end
end
