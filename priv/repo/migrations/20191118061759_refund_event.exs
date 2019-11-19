defmodule Pay.Repo.Migrations.RefundEvent do
  use Ecto.Migration

  def change do
    alter table("payment_events") do
      add :payment_refund_id, references(:payment_refunds, on_delete: :nothing)
    end
  end
end
