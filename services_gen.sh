#!/usr/bin/env bash -ex

# TODO: remove from repo

SERVICES_CTX=Services

rm -rf ./test/pay
rm -rf ./test/pay_web/controllers/*.exs
rm -rf ./priv/repo/migrations/*.exs

mix ecto.drop
mix ecto.create
mix ecto.migrate

mix phx.gen.json $SERVICES_CTX Permission permissions \
    name:string \
    description:string

mix ecto.migrate

mix phx.gen.json $SERVICES_CTX Role roles \
    name:string \
    description:string

mix ecto.migrate

mix phx.gen.schema $SERVICES_CTX.RolePermission role_permissions \
    role_id:references:roles \
    permission_id:references:permissions

mix ecto.migrate

mix phx.gen.json $SERVICES_CTX User users \
    external_id:uuid \
    email:string:unique \
    telephone_number:string \
    name:string \
    disabled:boolean \
    last_logged_in_at:utc_datetime_usec

mix ecto.migrate

mix phx.gen.json $SERVICES_CTX OrganisationType organisation_types \
    name:string

mix ecto.migrate

mix phx.gen.json $SERVICES_CTX Organisation organisations \
    external_id:uuid \
    name:string:unique \
    type_id:references:organisation_types

mix ecto.migrate

mix phx.gen.schema $SERVICES_CTX.OrganisationDomain organisation_domains \
    domain:string:unique \
    organisation_id:references:organisations

mix ecto.migrate

mix phx.gen.json $SERVICES_CTX Service services \
    external_id:uuid \
    organisation_id:references:organisations \
    redirect_to_service_immediately_on_terminal_state:boolean \
    collect_billing_address:boolean \
    custom_branding:map \
    current_go_live_stage:string \
    merchant_name:string \
    merchant_telephone_number:string \
    merchant_address_line1:string \
    merchant_address_line2:string \
    merchant_address_city:string \
    merchant_address_postcode:string \
    merchant_address_country:string \
    merchant_email:string

mix ecto.migrate

mix phx.gen.schema $SERVICES_CTX.ServiceUser service_users \
    service_id:references:services \
    user_id:references:users \
    role_id:references:roles

mix ecto.migrate

mix phx.gen.schema $SERVICES_CTX.ServiceInvite service_invites \
    service_id:references:services \
    role_id:references:roles \
    sender_id:references:users \
    email:string \
    expires_at:utc_datetime_usec \
    disabled:boolean

mix ecto.migrate

mix phx.gen.schema $SERVICES_CTX.ServiceGatewayAccount service_gateway_accounts \
    service_id:references:services \
    gateway_account_id:string

mix ecto.migrate

# Finally, clean up
mix format
