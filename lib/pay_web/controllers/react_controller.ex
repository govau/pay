defmodule PayWeb.ReactController do
  use PayWeb, :controller

  # render react-generated index html without a layout.
  #
  # generated from create-react-app and copied into the correct templates dir
  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html")
  end
end
