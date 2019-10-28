APP   ?= pay
CF    ?= cf
MIX   ?= mix
FLAGS ?=

ASSETS_SRC = $(shell find assets/src -type f)
ASSETS_PUB = $(shell find assets/public -type f)

CLD_HOST    ?= y.cld.gov.au
CF_API      ?= https://api.system.$(CLD_HOST)
CF_ORG      ?= dta
CF_SPACE    ?= platforms
CF          ?= cf
CF_USERNAME ?= $(CF_Y_USER)
CF_PASSWORD ?= $(CF_Y_PASSWORD)


# deploys can respond to STG env variable if they support
# feature branches or alternate production builds
PRD_BRANCH    ?= master
PRD_STAGE     ?= stg
STG_PREFIX    ?= feat-
CIRCLE_BRANCH ?=
BRANCH        ?= $(CIRCLE_BRANCH)
FEATURE        = $(BRANCH:$(STG_PREFIX)%=%)

# set prod stage if we're on prod branch
ifeq ($(BRANCH), $(PRD_BRANCH))
	export STG ?= $(PRD_STAGE)
endif

# export stg variable only if we are on a feature branch
ifneq ($(BRANCH), $(FEATURE))
	export STG ?= f-$(FEATURE)
endif

STG           ?= dev
PSQL_SVC_PLAN ?= shared
PSQL_SVC_NAME ?= pay-psql-$(STG)


run:
	$(MIX) phx.server

run-frontend:
	$(MAKE) -C assets start

start: # start both phoenix and react dev server
	$(MAKE) -j run run-frontend

reset-db:
	$(MIX) ecto.reset

install:
	$(MIX) deps.get

test:
	$(MIX) test
	CI=true $(MAKE) -C assets $@

assets/build/index.html: assets/public/index.html $(ASSETS_SRC) $(ASSETS_PUB)
	$(MAKE) -C assets build

lib/pay_web/templates/react/index.html.eex: assets/build/index.html
	mkdir -p $(@D)
	cp $< $@

priv/static/index.html: assets/build/index.html
	mkdir -p $(@D)
	cp -r assets/build/* $(@D)

frontend: lib/pay_web/templates/react/index.html.eex priv/static/index.html

setup:
	$(MAKE) install
	$(MAKE) -C assets $@

build-release:
	ENDPOINT_HOST=pay-$(STG).apps.y.cld.gov.au $(MIX) swagger

	cat priv/static/swagger.json

	$(MIX) release

	cat _build/prod/rel/priv/static/swagger.json

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
	$(MAKE) -C assets $@
	-rm -r _build
	-rm -r lib/pay_web/templates/react/index.html.eex priv/static

.PHONY: run run-frontend test deploy setup install
