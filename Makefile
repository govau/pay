APP   ?= pay
CF    ?= cf
MIX   ?= mix
FLAGS ?=

CLD_HOST    ?= y.cld.gov.au
CF_API      ?= https://api.system.$(CLD_HOST)
CF_ORG      ?= dta
CF_SPACE    ?= platforms
CF          ?= cf
CF_USERNAME ?= $(CF_Y_USER)
CF_PASSWORD ?= $(CF_Y_PASSWORD)

STG           ?= stg
PSQL_SVC_PLAN ?= shared
PSQL_SVC_NAME ?= pay-psql-$(STG)


run:
	$(MIX) phx.server

reset-db:
	$(MIX) ecto.rollback --all
	$(MIX) ecto.migrate
	$(MIX) run priv/repo/seeds.exs

install:
	$(MIX) deps.get

test:
	$(MIX) test

setup:
	$(MIX) local.hex $(FLAGS)
	$(MAKE) install
	$(MAKE) -C frontend $@

build-release:
	$(MIX) release

cf-login:
	@$(CF) login\
		-a "${CF_API}"\
		-u "${CF_USERNAME}"\
		-p "${CF_PASSWORD}"\
		-o "${CF_ORG}"\
		-s "${CF_SPACE}"

create-service-psql:
	-$(CF) create-service postgres $(PSQL_SVC_PLAN) $(PSQL_SVC_NAME)

manifest-vars-%.yml:
	echo "stg: $*" > $@

deploy:
	$(CF) zero-downtime-push $(APP) -f manifest.yml --show-app-log

deploy-dev: create-service-psql manifest-vars-$(STG).yml
	$(CF) push $(APP)-$(STG) -f manifest-dev.yml --vars-file manifest-vars-$(STG).yml

clean:
	$(MIX) clean

.PHONY: run test deploy setup install
