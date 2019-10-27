defmodule Pay.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    swagger_path = Path.join(:code.priv_dir(:pay), "static/swagger.json")

    IO.inspect(swagger_path)

    if !File.exists?(swagger_path) do
      IO.puts("Swagger.json file does NOT exist")
    else
      IO.puts("Swagger.json file does exist")
    end

    if !File.exists?(Path.join(:code.priv_dir(:pay), "static/index.html")) do
      IO.puts("index.html file does NOT exist")
    else
      IO.puts("index.html file does exist")
    end

    PhoenixSwagger.Validator.parse_swagger_schema(swagger_path)

    # List all child processes to be supervised
    children = [
      # Start the Ecto repository
      Pay.Repo,
      # Start the endpoint when the application starts
      PayWeb.Endpoint
      # Starts a worker by calling: Pay.Worker.start_link(arg)
      # {Pay.Worker, arg},
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Pay.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    PayWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
