defmodule Pay.Repo.Migrations.ServiceInvitesConstraints do
  use Ecto.Migration

  def change do
    create index(:service_invites, [:email])
  end
end
