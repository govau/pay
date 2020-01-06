# Adding custom metadata

You can add custom metadata to a new payment. For example, you can add a reference number from your finance or accounting system, so you can reconcile the payment later.

You add metadata when you make an API call to create a new payment. You cannot add metadata to [payment links](/docs/payment-links).

Your users cannot see metadata while they’re making a payment.

## Add metadata to a payment

Include a `metadata` object in the body of your request when creating a new payment. For example your metadata might look like (as a JSON object):

```json
{
  "ledger_code": "AB100",
  "an_internal_reference_number": 200
}
```

The `metadata` object must contain between 1 and 10 parameters.

Each parameter key must be a unique string between 1 and 30 characters long. If a key is not unique, the API will remove all but one of the duplicate keys from the `metadata` object.

The data type of each parameter value must be either a:

- string of no more than 50 characters
- number
- boolean

Parameter values can be empty.

The API response will include your metadata.

You cannot add or change metadata keys or values after you’ve created the payment request.

Refer to the [Swagger file](https://github.com/govau/pay/blob/master/priv/static/swagger.json) for more information.

## Getting a payment’s metadata

When you get information about a single payment or generate a list of payments, the API response will include the `metadata` object.

The order of the parameters in the `metadata` object may be different to your original object.

You can also sign in to the [Pay.gov.au console tool](https://pay-stg.apps.y.cld.gov.au/login) to see or download a payment’s metadata.
