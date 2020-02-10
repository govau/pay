defmodule Pay.Repo.Migrations.ServiceInvitesConstraints do
  use Ecto.Migration

  def change do
    create index(:service_invites, [:email])
    create index(:service_users, [:service_id, :user_id], unique: true)
  end
end
