defmodule Pay do
  @moduledoc """
  Pay keeps the contexts that define your domain
  and business logic.

  Contexts are also responsible for managing your data, regardless
  if it comes from the database, an external API or others.
  """

  def auth0_domain, do: System.get_env("AUTH0_DOMAIN", "dta-platforms.au.auth0.com")
end
