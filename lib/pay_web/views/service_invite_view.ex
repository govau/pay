defmodule PayWeb.ServiceInviteView do
  use PayWeb, :view
  alias PayWeb.ServiceInviteView

  def render("index.json", %{service_invites: service_invites}) do
    %{data: render_many(service_invites, ServiceInviteView, "service_invite.json")}
  end

  def render("show.json", %{service_invite: service_invite}) do
    %{data: render_one(service_invite, ServiceInviteView, "service_invite.json")}
  end

  def render("service_invite.json", %{service_invite: service_invite}) do
    %{
      id: service_invite.id,
      email: service_invite.email,
      expires_at: service_invite.expires_at,
      disabled: service_invite.disabled
    }
  end
end
