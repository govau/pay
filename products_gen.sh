#!/usr/bin/env bash -ex

# TODO: remove from repo

PRODUCTS_CTX=Products

mix phx.gen.json $PRODUCTS_CTX Product products \
    external_id:uuid \
    gateway_account_id:uuid \
    api_token:string \
    name:string \
    description:string \
    price:integer \
    status:string \
    return_url:string \
    service_name_path:string \
    product_name_path:string \
    reference_enabled:boolean \
    reference_label:string \
    reference_hint:string

mix ecto.migrate

mix phx.gen.json $PRODUCTS_CTX ProductPayment product_payments \
    external_id:uuid \
    product_id:references:products \
    payment_id:string \
    next_url:string \
    amount:integer \
    status:string \
    gateway_account_id:uuid \
    reference_number:string

mix ecto.migrate

# Finally, clean up
mix format
