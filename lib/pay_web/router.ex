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
    plug PayWeb.Plugs.SetCurrentUser
  end

  scope "/v1/api/", PayWeb.External, as: :external do
    pipe_through(:api)

    resources("/payments", PaymentController, only: [:index, :show, :create])
  end

  scope "/v1/api/internal", PayWeb do
    pipe_through(:api)

    scope "/payments", as: :payments do
      resources("/card-types", CardTypeController, except: [:new, :edit])
      resources("/gateway-accounts", GatewayAccountController, except: [:new, :edit])
      resources("/payments", PaymentController, except: [:new, :edit])
    end

    scope "/services", as: :services do
      get "/auth/check", AuthController, :check, as: :check

      resources("/permissions", PermissionController, except: [:new, :edit])
      resources("/roles", RoleController, except: [:new, :edit])

      resources("/users", UserController, except: [:new, :edit]) do
        resources("/services", ServiceController, only: [:index])
      end

      resources "/organisation-types", OrganisationTypeController, except: [:new, :edit]
      resources "/organisations", OrganisationController, except: [:new, :edit]

      resources("/services", ServiceController, except: [:new, :edit]) do
        resources("/service-users", ServiceUserController, only: [:index])
        resources("/gateway-accounts", GatewayAccountController, only: [:index])
      end
    end

    scope "/products", Products, as: :products do
      resources("/gateway-accounts", PayWeb.GatewayAccountController, only: []) do
        resources "/products", ProductController, except: [:new, :edit]
      end

      resources "/products", ProductController, except: [:new, :edit]

      resources "/product-payments", ProductPaymentController, only: [:show, :update]

      post "/product-payments/:id/submit",
           ProductPaymentController,
           :submit,
           as: :submit

      get "/products/:service_name_slug/:name_slug", ProductController, :show_by_slugs,
        as: :show_by_slugs

      post "/products/:service_name_slug/:name_slug/payments",
           ProductPaymentController,
           :create_by_slugs,
           as: :create_payment_by_slugs
    end
  end

  scope "/", PayWeb do
    pipe_through :browser

    get "/_status", PageController, :status
    get "/*path", ReactController, :index
  end
end
