defmodule Bambora.MixProject do
  use Mix.Project

  def project do
    [
      app: :bambora,
      version: "0.1.0",
      elixir: "~> 1.9",
      start_permanent: Mix.env() == :prod,
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
      {:soap, path: "../soap"},
      {:dialyxir, "~> 1.0.0-rc.7", only: [:dev], runtime: false}

      # {:soap, "~> 1.0"},
    ]
  end
end
