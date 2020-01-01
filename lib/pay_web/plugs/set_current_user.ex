defmodule PayWeb.Plugs.SetCurrentUser do
  def init(_params) do
  end

  def call(conn, _params) do
    case Guardian.Plug.current_resource(conn) do
      nil -> conn
      user -> Absinthe.Plug.put_options(conn, context: %{current_user: user})
    end
  end
end
