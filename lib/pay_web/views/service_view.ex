defmodule PayWeb.ServiceView do
  use PayWeb, :view
  alias PayWeb.ServiceView

  def render("index.json", %{services: services}) do
    %{data: render_many(services, ServiceView, "service.json")}
  end

  def render("show.json", %{service: service}) do
    %{data: render_one(service, ServiceView, "service.json")}
  end

  def render("service.json", %{service: service}) do
    %{
      id: service.id,
      external_id: service.external_id,
      name: service.name,
      redirect_to_service_immediately_on_terminal_state:
        service.redirect_to_service_immediately_on_terminal_state,
      collect_billing_address: service.collect_billing_address,
      custom_branding: service.custom_branding,
      current_go_live_stage: service.current_go_live_stage,
      merchant_name: service.merchant_name,
      merchant_telephone_number: service.merchant_telephone_number,
      merchant_address_line1: service.merchant_address_line1,
      merchant_address_line2: service.merchant_address_line2,
      merchant_address_city: service.merchant_address_city,
      merchant_address_postcode: service.merchant_address_postcode,
      merchant_address_country: service.merchant_address_country,
      merchant_email: service.merchant_email
    }
  end
end
