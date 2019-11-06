defmodule PayWeb.External.PaymentView do
  use PayWeb, :view
  alias PayWeb.External.PaymentView

  def render("index.json", %{payments: payments}) do
    %{data: render_many(payments, PaymentView, "payment.json")}
  end

  def render("show.json", %{payment: payment}) do
    %{data: render_one(payment, PaymentView, "payment.json")}
  end

  def render("payment.json", %{payment: payment}) do
    # TODO: fill fields in.
    %{
      id: payment.external_id,
      amount: payment.amount,
      fee: 42,
      total_amount: 42,
      net_amount: 42,
      state: %{
        status: payment.status,
        # TODO: determine based off status
        finished: false
      },
      gateway_transaction_id: payment.gateway_transaction_id,
      return_url: payment.return_url,
      next_url: "#{Application.get_env(:pay, :checkout_endpoint)}/pay/#{payment.external_id}",
      email: payment.email,
      telephone_number: "some telephone_number",
      description: payment.description,
      reference: payment.reference,
      delayed_capture: payment.delayed_capture,
      card_brand: "some card_brand",
      card_details: payment.card_details,
      payment_provider: "some payment_provider",
      processor_id: "some processor_id",
      provider_id: "some provider_id",
      created_at: "2010-04-17T14:00:00.000000Z",
      authorised_at: "2010-04-17T14:00:00.000000Z",
      payment_outcome: %{},
      refund_summary: %{},
      settlement_summary: %{},
      metadata: payment.external_metadata
    }
  end
end
