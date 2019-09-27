defmodule PayWeb.Router do
  use PayWeb, :router
  use Plug.ErrorHandler
  use Sentry.Plug

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/v1/api/", PayWeb.External, as: :external do
    pipe_through(:api)

    resources("/payments", PaymentController, only: [:index, :show, :create])
  end

  scope "/v1/api/internal", PayWeb do
    pipe_through(:api)

    resources("/payments/card-types", CardTypeController, except: [:new, :edit])
    resources("/payments/gateway-accounts", GatewayAccountController, except: [:new, :edit])
    resources("/payments/payments", PaymentController, except: [:new, :edit])

    resources("/services/permissions", PermissionController, except: [:new, :edit])
    resources("/services/roles", RoleController, except: [:new, :edit])
    resources("/services/users", UserController, except: [:new, :edit])
    get "/services/auth/check", AuthController, :check, as: :check
    resources "/services/organisation-types", OrganisationTypeController, except: [:new, :edit]
    resources "/services/organisations", OrganisationController, except: [:new, :edit]
    resources("/services/services", ServiceController, except: [:new, :edit])
  end

  scope "/", PayWeb do
    pipe_through :browser

    get "/_status", PageController, :status
    get "/*path", ReactController, :index
  end
end
