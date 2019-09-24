#!/usr/bin/env bash -ex

# TODO: remove from repo

mix phx.gen.json Payments Payment payments \
    id:uuid \
    amount:integer \
    fee:integer \
    total_amount:integer \
    net_amount:integer \
    state:map \
    gateway_transaction_id:string \
    return_url:string \
    email:string \
    telephone_number:string \
    description:string \
    reference:string \
    delayed_capture:boolean \
    card_brand:string \
    card_details:map \
    payment_provider:string \
    processor_id:string \
    provider_id:string \
    created_at:utc_datetime_usec \
    authorised_at:utc_datetime_usec \
    payment_outcome:map \
    refund_summary:map \
    settlement_summary:map \
    metadata:map \
    --no-schema --no-context --web External

mix ecto.migrate

# Finally, clean up
mix format
