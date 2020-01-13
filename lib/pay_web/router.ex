defmodule PayWeb.Router do
  use PayWeb, :router
  use Plug.ErrorHandler
  use Sentry.Plug
  alias PhoenixSwagger.Plug.Validate

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug Pay.Auth.Pipeline
    plug PayWeb.Plugs.SetCurrentUser
  end

  pipeline :external_api do
    plug :accepts, ["json"]
    plug(Validate, validation_failed_status: 422)
  end

  scope "/api/v1", PayWeb.External, as: :external do
    pipe_through(:external_api)

    resources "/payments", PaymentController, only: [:index, :show, :create]
  end

  scope "/api/swagger" do
    forward "/", PhoenixSwagger.Plug.SwaggerUI, otp_app: :pay, swagger_file: "swagger.json"
  end

  scope "/api/v1/internal" do
    pipe_through(:api)

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: PayWeb.Schema,
      json_codec: Jason

    forward "/graphql", Absinthe.Plug, schema: PayWeb.Schema, json_codec: Jason
  end

  scope "/", PayWeb do
    pipe_through :browser

    get "/_status", PageController, :status
    get "/*path", ReactController, :index
  end

  def swagger_info do
    %{
      info: %{
        version: "0.0.1",
        title: "Pay.gov.au"
      }
    }
  end
end
