#!/usr/bin/env bash -ex

# TODO: remove from repo

PAYMENTS_CTX=Payments

rm -rf ./lib/pay/payments*
rm -rf ./test/pay/payments*
rm -rf ./test/pay_web/controllers/*.exs
rm -rf ./priv/repo/migrations/*.exs

mix ecto.drop
mix ecto.create
mix ecto.migrate

mix phx.gen.json $PAYMENTS_CTX CardType card_types \
    type:string \
    brand:string \
    label:string \
    requires_3ds:boolean

mix ecto.migrate

mix phx.gen.json $PAYMENTS_CTX GatewayAccount gateway_accounts \
    name:string \
    type:string \
    credentials:map \
    service_name:string \
    description:string \
    requires_3ds:boolean \
    allow_apple_pay:boolean \
    allow_google_pay:boolean \
    allow_zero_amount:integer \
    integration_version_3ds:integer \

mix ecto.migrate

mix phx.gen.schema $PAYMENTS_CTX.GatewayAccountCardType gateway_account_card_types \
    gateway_account_id:references:gateway_accounts \
    card_type_id:references:card_types

mix ecto.migrate

mix phx.gen.json $PAYMENTS_CTX Payment payments \
    external_id:uuid \
    amount:integer \
    status:string \
    gateway_transaction_id:string \
    return_url:string \
    email:string \
    card_details:map \
    auth_3ds_details:map \
    gateway_account_id:references:gateway_accounts \
    description:string \
    reference:string \
    delayed_capture:boolean \
    wallet:string \
    external_metadata:map

mix ecto.migrate

mix phx.gen.schema $PAYMENTS_CTX.PaymentFee payment_fees \
    external_id:uuid \
    payment_id:references:payments \
    amount_due:integer \
    amount_collected:integer \
    collected_at:utc_datetime_usec \
    gateway_transaction_id:string

mix ecto.migrate

mix phx.gen.schema $PAYMENTS_CTX.PaymentEvent payment_events \
    payment_id:references:payments \
    status:string

mix ecto.migrate

mix phx.gen.schema $PAYMENTS_CTX.PaymentRefund payment_refunds \
    external_id:uuid \
    payment_id:references:payments \
    reference:string \
    amount:integer \
    status:string \
    user_external_id:uuid \
    gateway_transaction_id:uuid

mix ecto.migrate

# Finally, clean up
mix format
