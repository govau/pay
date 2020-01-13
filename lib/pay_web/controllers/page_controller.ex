defmodule PayWeb.PageController do
  use PayWeb, :controller

  def status(conn, _params) do
    json(conn, %{status: "OK"})
  end
end
