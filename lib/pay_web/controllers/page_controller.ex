defmodule PayWeb.PageController do
  use PayWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
