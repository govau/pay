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

  scope "/", PayWeb do
    pipe_through :browser

    get "/_status", PageController, :status
    get "/*path", ReactController, :index
  end

  scope "/api", PayWeb do
    pipe_through(:api)
    resources("/card-types", CardTypeController, except: [:new, :edit])

    resources("/permissions", PermissionController, except: [:new, :edit])
    resources("/roles", RoleController, except: [:new, :edit])
    resources("/users", UserController, except: [:new, :edit])
    resources "/organisation-types", OrganisationTypeController, except: [:new, :edit]
    resources "/organisations", OrganisationController, except: [:new, :edit]
    resources("/services", ServiceController, except: [:new, :edit])
  end
end
