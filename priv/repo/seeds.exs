# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Pay.Repo.insert!(%Pay.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Pay.Repo
alias Pay.Payments.CardType
alias Pay.Payments.GatewayAccount
alias Pay.Payments.GatewayAccountCardType
alias Pay.Services.Role
alias Pay.Services.Permission
alias Pay.Services.RolePermission
alias Pay.Services.User
alias Pay.Services.OrganisationType
alias Pay.Services.Organisation
alias Pay.Services.OrganisationDomain
alias Pay.Services.Service
alias Pay.Services.ServiceUser
alias Pay.Services.ServiceGatewayAccount
alias Pay.Products.Product

visa_credit_id = Repo.insert!(%CardType{type: "CREDIT", brand: "visa", label: "Visa"}).id
visa_debit_id = Repo.insert!(%CardType{type: "DEBIT", brand: "visa", label: "Visa"}).id

master_credit_id =
  Repo.insert!(%CardType{type: "CREDIT", brand: "master-card", label: "Mastercard"}).id

master_debit_id =
  Repo.insert!(%CardType{type: "DEBIT", brand: "master-card", label: "Mastercard"}).id

amex_id =
  Repo.insert!(%CardType{type: "CREDIT", brand: "american-express", label: "American Express"}).id

diners_id = Repo.insert!(%CardType{type: "CREDIT", brand: "diners-club", label: "Diners Club"}).id
discover_id = Repo.insert!(%CardType{type: "CREDIT", brand: "discover", label: "Discover"}).id
jcb_id = Repo.insert!(%CardType{type: "CREDIT", brand: "jcb", label: "JCB"}).id
unionPay_id = Repo.insert!(%CardType{type: "CREDIT", brand: "unionpay", label: "Union Pay"}).id

# Roles

super_admin_role_id =
  Repo.insert!(%Role{name: Role.SuperAdmin.value().name, description: "Super admin"}).id

admin_role_id =
  Repo.insert!(%Role{name: Role.Admin.value().name, description: "Administrator"}).id

view_and_refund_role_id =
  Repo.insert!(%Role{name: Role.ViewAndRefund.value().name, description: "View and refund"}).id

view_only_role_id =
  Repo.insert!(%Role{name: Role.ViewOnly.value().name, description: "View only"}).id

# Permissons

permission1_id =
  Repo.insert!(%Permission{name: "users-service:read", description: "Viewusersinservice"}).id

permission2_id =
  Repo.insert!(%Permission{name: "users-service:create", description: "Createuserinthisservice"}).id

permission3_id =
  Repo.insert!(%Permission{name: "users-global:create", description: "Createuserinanyservice"}).id

permission4_id =
  Repo.insert!(%Permission{name: "tokens-active:read", description: "Viewactivekeys"}).id

permission5_id =
  Repo.insert!(%Permission{name: "tokens-revoked:read", description: "Viewrevokedkeys"}).id

permission6_id = Repo.insert!(%Permission{name: "tokens:create", description: "Generatekey"}).id
permission7_id = Repo.insert!(%Permission{name: "tokens:update", description: "Generatekey"}).id
permission8_id = Repo.insert!(%Permission{name: "tokens:delete", description: "Revokekey"}).id

permission9_id =
  Repo.insert!(%Permission{name: "transactions:read", description: "Viewtransactionslist"}).id

permission10_id =
  Repo.insert!(%Permission{
    name: "transactions-by-date:read",
    description: "Searchtransactionsbydate"
  }).id

permission11_id =
  Repo.insert!(%Permission{
    name: "transactions-by-fields:read",
    description: "Searchtransactionsbypaymentfields"
  }).id

permission12_id =
  Repo.insert!(%Permission{
    name: "transactions-download:read",
    description: "Downloadtransactions"
  }).id

permission13_id =
  Repo.insert!(%Permission{
    name: "transactions-details:read",
    description: "Viewtransactiondetails"
  }).id

permission14_id =
  Repo.insert!(%Permission{name: "transactions-events:read", description: "Viewtransactionevents"}).id

permission15_id = Repo.insert!(%Permission{name: "refunds:create", description: "Issuerefund"}).id

permission16_id =
  Repo.insert!(%Permission{
    name: "transactions-amount:read",
    description: "Viewtransactionamounts"
  }).id

permission17_id =
  Repo.insert!(%Permission{
    name: "transactions-description:read",
    description: "Viewtransactiondescription"
  }).id

permission18_id =
  Repo.insert!(%Permission{name: "transactions-email:read", description: "Viewtransactionemail"}).id

permission19_id =
  Repo.insert!(%Permission{
    name: "transactions-card-type:read",
    description: "Viewtransactioncardtype"
  }).id

permission20_id =
  Repo.insert!(%Permission{
    name: "gateway-credentials:read",
    description: "Viewgatewayaccountcredentials"
  }).id

permission21_id =
  Repo.insert!(%Permission{
    name: "gateway-credentials:update",
    description: "Editgatewayaccountcredentials"
  }).id

permission22_id =
  Repo.insert!(%Permission{name: "service-name:read", description: "Viewservicename"}).id

permission23_id =
  Repo.insert!(%Permission{name: "service-name:update", description: "Editservicename"}).id

permission24_id =
  Repo.insert!(%Permission{name: "payment-types:read", description: "Viewpaymenttypes"}).id

permission25_id =
  Repo.insert!(%Permission{name: "payment-types:update", description: "Editpaymenttypes"}).id

permission26_id =
  Repo.insert!(%Permission{
    name: "email-notification-template:read",
    description: "Viewemailnotificationstemplate"
  }).id

permission27_id =
  Repo.insert!(%Permission{
    name: "email-notification-paragraph:update",
    description: "Editemailnotificationsparagraph"
  }).id

permission28_id =
  Repo.insert!(%Permission{
    name: "email-notification-toggle:update",
    description: "Turnemailnotificationson/off"
  }).id

Repo.insert!(%RolePermission{
  role_id: super_admin_role_id,
  permission_id: permission1_id
})

Repo.insert!(%RolePermission{
  role_id: super_admin_role_id,
  permission_id: permission2_id
})

Repo.insert!(%RolePermission{
  role_id: super_admin_role_id,
  permission_id: permission3_id
})

# Organisation types

federal_id = Repo.insert!(%OrganisationType{name: "Federal"}).id
state_id = Repo.insert!(%OrganisationType{name: "State"}).id
local_id = Repo.insert!(%OrganisationType{name: "Local"}).id
educational_id = Repo.insert!(%OrganisationType{name: "Education institution"}).id
other_id = Repo.insert!(%OrganisationType{name: "Other"}).id

# Organisations

dta_id =
  Repo.insert!(%Organisation{
    external_id: Ecto.UUID.generate(),
    name: "Digital Transformation Agency",
    type_id: federal_id
  }).id

Repo.insert!(%OrganisationDomain{
  organisation_id: dta_id,
  domain: "dta.gov.au"
})

Repo.insert!(%OrganisationDomain{
  organisation_id: dta_id,
  domain: "digital.gov.au"
})

dfat_id =
  Repo.insert!(%Organisation{
    external_id: Ecto.UUID.generate(),
    name: "Department of Foreign Affairs and Trade",
    type_id: federal_id
  }).id

Repo.insert!(%OrganisationDomain{
  organisation_id: dfat_id,
  domain: "dfat.gov.au"
})

service_nsw_id =
  Repo.insert!(%Organisation{
    external_id: Ecto.UUID.generate(),
    name: "Service NSW",
    type_id: state_id
  }).id

Repo.insert!(%OrganisationDomain{
  organisation_id: service_nsw_id,
  domain: "service.nsw.gov.au"
})

# Sample users

platform_admin1_id =
  Repo.insert!(%User{
    external_id: Ecto.UUID.generate(),
    platform_admin: true,
    email: "platform-admin1@dta.gov.au",
    telephone_number: "+61412333333",
    name: "Plaform admin 1"
  }).id

platform_admin2_id =
  Repo.insert!(%User{
    external_id: Ecto.UUID.generate(),
    platform_admin: true,
    email: "platform-admin2@dta.gov.au",
    telephone_number: "+61412444444",
    name: "Plaform admin 2"
  }).id

user1_id =
  Repo.insert!(%User{
    external_id: Ecto.UUID.generate(),
    email: "user1@dta.gov.au",
    telephone_number: "+61412111111",
    name: "User 1"
  }).id

user2_id =
  Repo.insert!(%User{
    external_id: Ecto.UUID.generate(),
    email: "user2@dta.gov.au",
    telephone_number: "+61412222222",
    name: "User 2"
  }).id

service1_view_only_user_id =
  Repo.insert!(%User{
    external_id: Ecto.UUID.generate(),
    email: "service1-view-only@dta.gov.au",
    telephone_number: "+61412999999",
    name: "Service 1 view only"
  }).id

# Sample services

service1_gateway_account =
  Repo.insert!(%GatewayAccount{
    external_id: Ecto.UUID.generate(),
    payment_provider: GatewayAccount.provider(:sandbox),
    type: GatewayAccount.type(:test),
    service_name: "Service 1",
    credentials: %{}
  })

service1_id =
  Repo.insert!(%Service{
    external_id: Ecto.UUID.generate(),
    organisation_id: dta_id,
    name: "Service 1",
    current_go_live_stage: Pay.Services.Service.GoLiveStage.NotStarted.value().name,
    custom_branding: %{}
  }).id

Repo.insert!(%ServiceGatewayAccount{
  gateway_account_id: service1_gateway_account.external_id,
  service_id: service1_id
})

Repo.insert!(%GatewayAccountCardType{
  gateway_account_id: service1_gateway_account.id,
  card_type_id: visa_credit_id
})

Repo.insert!(%GatewayAccountCardType{
  gateway_account_id: service1_gateway_account.id,
  card_type_id: master_debit_id
})

Repo.insert!(%GatewayAccountCardType{
  gateway_account_id: service1_gateway_account.id,
  card_type_id: jcb_id
})

Repo.insert!(%GatewayAccountCardType{
  gateway_account_id: service1_gateway_account.id,
  card_type_id: diners_id
})

Repo.insert!(%ServiceUser{
  service_id: service1_id,
  user_id: service1_view_only_user_id,
  role_id: view_only_role_id
})

service2_test_gateway_account =
  Repo.insert!(%GatewayAccount{
    external_id: Ecto.UUID.generate(),
    payment_provider: GatewayAccount.provider(:sandbox),
    type: GatewayAccount.type(:test),
    service_name: "Service 2",
    credentials: %{}
  })

service2_live_gateway_account =
  Repo.insert!(%GatewayAccount{
    external_id: Ecto.UUID.generate(),
    payment_provider: GatewayAccount.provider(:bambora),
    type: GatewayAccount.type(:live),
    service_name: "Service 2",
    credentials:
      with {:ok, merchant_id} <-
             Pay.VCAP.user_provided(
               "pay-bambora",
               "MERCHANT_ID",
               System.get_env("BAMBORA_MERCHANT_ID", "")
             ),
           {:ok, account_number} <-
             Pay.VCAP.user_provided(
               "pay-bambora",
               "ACCOUNT_NUMBER",
               System.get_env("BAMBORA_ACCOUNT_NUMBER", "")
             ),
           {:ok, api_username} <-
             Pay.VCAP.user_provided(
               "pay-bambora",
               "API_USERNAME",
               System.get_env("BAMBORA_API_USERNAME", "")
             ),
           {:ok, api_password} <-
             Pay.VCAP.user_provided(
               "pay-bambora",
               "API_PASSWORD",
               System.get_env("BAMBORA_API_PASSWORD", "")
             ) do
        %{
          "merchant_id" => merchant_id,
          "account_number" => account_number,
          "api_username" => api_username,
          "api_password" => api_password
        }
      else
        _ -> %{}
      end
  })

service2_id =
  Repo.insert!(%Service{
    external_id: Ecto.UUID.generate(),
    organisation_id: dfat_id,
    name: "Australian Passport Office",
    current_go_live_stage: Pay.Services.Service.GoLiveStage.Live.value().name,
    custom_branding: %{}
  }).id

Repo.insert!(%ServiceGatewayAccount{
  gateway_account_id: service2_test_gateway_account.external_id,
  service_id: service2_id
})

Repo.insert!(%GatewayAccountCardType{
  gateway_account_id: service2_test_gateway_account.id,
  card_type_id: master_credit_id
})

Repo.insert!(%GatewayAccountCardType{
  gateway_account_id: service2_test_gateway_account.id,
  card_type_id: unionPay_id
})

Repo.insert!(%ServiceGatewayAccount{
  gateway_account_id: service2_live_gateway_account.external_id,
  service_id: service2_id
})

Repo.insert!(%GatewayAccountCardType{
  gateway_account_id: service2_live_gateway_account.id,
  card_type_id: visa_credit_id
})

Repo.insert!(%GatewayAccountCardType{
  gateway_account_id: service2_live_gateway_account.id,
  card_type_id: master_credit_id
})

Repo.insert!(%GatewayAccountCardType{
  gateway_account_id: service2_live_gateway_account.id,
  card_type_id: diners_id
})

Repo.insert!(%GatewayAccountCardType{
  gateway_account_id: service2_live_gateway_account.id,
  card_type_id: jcb_id
})

Repo.insert!(%ServiceUser{
  service_id: service2_id,
  user_id: service1_view_only_user_id,
  role_id: view_only_role_id
})

Repo.insert!(%Product{
  external_id: Ecto.UUID.generate(),
  gateway_account_id: service2_test_gateway_account.external_id,
  name: "New adult passport (test)",
  name_slug: "new-adult-passport-test",
  service_name_slug: "australian-passport-office",
  description: "Pay for your adult Australian passport, valid for 10 years.",
  price_fixed: true,
  price: 29300,
  reference_enabled: true,
  reference_label: "Passport application number",
  reference_hint:
    "You can find your application number on the top right hand side of your application form."
})

Repo.insert!(%Product{
  external_id: Ecto.UUID.generate(),
  gateway_account_id: service2_live_gateway_account.external_id,
  name: "New adult passport",
  name_slug: "new-adult-passport",
  service_name_slug: "australian-passport-office",
  description: "Pay for your adult Australian passport, valid for 10 years.",
  price_fixed: true,
  price: 29300,
  reference_enabled: true,
  reference_label: "Passport application number",
  reference_hint:
    "You can find your application number on the top right hand side of your application form."
})

service3_test_gateway_account_external_id =
  Repo.insert!(%GatewayAccount{
    external_id: Ecto.UUID.generate(),
    payment_provider: GatewayAccount.provider(:sandbox),
    type: GatewayAccount.type(:test),
    service_name: "Service 3",
    credentials: %{}
  }).external_id

service3_live_gateway_account_external_id =
  Repo.insert!(%GatewayAccount{
    external_id: Ecto.UUID.generate(),
    payment_provider: GatewayAccount.provider(:bambora),
    type: GatewayAccount.type(:live),
    service_name: "Service 3",
    credentials:
      with {:ok, merchant_id} <-
             Pay.VCAP.user_provided(
               "pay-bambora",
               "MERCHANT_ID",
               System.get_env("BAMBORA_MERCHANT_ID", "")
             ),
           {:ok, account_number} <-
             Pay.VCAP.user_provided(
               "pay-bambora",
               "ACCOUNT_NUMBER",
               System.get_env("BAMBORA_ACCOUNT_NUMBER", "")
             ),
           {:ok, api_username} <-
             Pay.VCAP.user_provided(
               "pay-bambora",
               "API_USERNAME",
               System.get_env("BAMBORA_API_USERNAME", "")
             ),
           {:ok, api_password} <-
             Pay.VCAP.user_provided(
               "pay-bambora",
               "API_PASSWORD",
               System.get_env("BAMBORA_API_PASSWORD", "")
             ) do
        %{
          "merchant_id" => merchant_id,
          "account_number" => account_number,
          "api_username" => api_username,
          "api_password" => api_password
        }
      else
        _ -> %{}
      end
  }).external_id

service3_id =
  Repo.insert!(%Service{
    external_id: Ecto.UUID.generate(),
    organisation_id: dta_id,
    name: "Service 3",
    current_go_live_stage: Pay.Services.Service.GoLiveStage.Live.value().name,
    custom_branding: %{}
  }).id

Repo.insert!(%ServiceGatewayAccount{
  gateway_account_id: service3_test_gateway_account_external_id,
  service_id: service3_id
})

Repo.insert!(%ServiceGatewayAccount{
  gateway_account_id: service3_live_gateway_account_external_id,
  service_id: service3_id
})

Repo.insert!(%ServiceUser{
  service_id: service3_id,
  user_id: user2_id,
  role_id: admin_role_id
})
