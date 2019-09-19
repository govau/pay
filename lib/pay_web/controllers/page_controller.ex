defmodule PayWeb.PageController do
  use PayWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def status(conn, %{"err" => "true"}) do
    json(conn, %{status: 5 = 3})
  end

  def status(conn, _params) do
    json(conn, %{status: "OK"})
  end
end
