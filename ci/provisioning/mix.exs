defmodule Provisioning.MixProject do
  use Mix.Project

  def project do
    [
      app: :provisioning,
      version: "0.1.0",
      elixir: "~> 1.9",
      start_permanent: Mix.env() == :prod,
      escript: [main_module: Provisioning.CLI],
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:auth0_ex, "~> 0.4"}
    ]
  end
end
