# Integrate with Pay.gov.au

Before you build an integration, your service team should have the necessary skills. You can refer to the [Australian Government Digital Guides](https://www.dta.gov.au/help-and-advice/build-and-improve-services/managing-teams/building-core-roles-team) for more information.

This guidance is for technical architects or developers planning to integrate their service with the Pay.gov.au API. It describes:

- the requirements for your service’s backend
- what data you need to store and why
- typical data flows for using the Pay.gov.au API in an integration
- when to release services to your users
- making sure that all payments are processed
- integrating with finance and accounting systems

The following diagram shows a typical high-level architecture with a Pay.gov.au integration:

[![A typical high-level Pay.gov.au architecture](docs/images/typicalArchitecture.png)](docs/images/typicalArchitecture.png)

## Service backend

Your service backend is server-side software. You should build this to:

- make a call to the Pay.gov.au API to start the payment journey
- store information about user payment journeys in your datastore
- redirect your user to the `next_url` provided by Pay.gov.au, where your user will enter their payment information and confirm their payment
- receive your user’s request when they are redirected back to your service via the `return_url`, where your user will return after they complete their payment
- identify your returning user via the session
- make a call to the Pay.gov.au API to determine the outcome of the payment
- display information about the outcome of the payment and next steps to your user

## Datastore

You will likely need some kind of server-side datastore to record payment information for each payment journey. You should store:

- an ID or primary key
- the service your user requested
- the Pay.gov.au payment ID
- the status of the payment
- the date and time the payment was started

## Finance and accounting systems

You may want to integrate your finance and accounting systems with Pay.gov.au using the API.

For example, you could automatically fetch data about the outcome of payment journeys. You could import that into your finance system so payments can be reconciled against bank transaction information.

To help you reconcile payments, you can: [add custom metadata to payments](/docs/optional-features/custom-metadata)

You could also connect a customer-relationship management (CRM) or case management system to Pay.gov.au, so your staff can issue refunds from within your system.

## The Pay.gov.au API

The Pay.gov.au API offers a set of operations to conduct and report on payments. For more information:

- use the [API browser](https://pay-stg.apps.y.cld.gov.au/api/swagger)
- look at the [Swagger file](https://github.com/govau/pay/blob/master/priv/static/swagger.json)

## When to release your service to your users

It’s your responsibility to decide when to release your service to your users. This will depend on the nature of your service.

In some cases you may be comfortable releasing a service before a payment has been confirmed. For example, if you’re taking payments in advance because a user has an account with you.

In most cases, you’ll want to confirm that a payment has been completed before releasing the service to your users. Typically you’ll do this when your user visits the `return_url` on your service.

## Identifying your user when they return to your service

We recommend using a cookie-based session to identify your user when they return to your service. You could use either encrypted client side sessions, or server-side sessions using session store.

We recommend that you do not encode any reference number or user-specific information in the `return_url`.

If you do, an attacker may be able to guess the reference in your `return_url` and gain access to another user’s personal information displayed on your confirmation screen.

|      | Example                                          |
| ---- | ------------------------------------------------ |
| Good | `https://my.service.gov.au/return`               |
| Bad  | `https://my.service.gov.au/return/payment_12345` |

You must use HTTPS for your `return_url`, but you can use HTTP with test accounts.
