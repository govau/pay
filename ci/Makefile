GIT           ?= git
CF            ?= cf
JQ            ?= jq
DIFF          ?= diff

APP           ?= pay
STG           ?= dev
CF_SPACE      ?= pay
CF_SPACE_ID   ?= $(shell $(CF) curl "/v2/spaces?q=name:$(CF_SPACE)" | jq -r ".resources[].metadata.guid")
GIT_REMOTE    ?= $(shell $(GIT) config --get remote.origin.url)

CLD_Y         ?= y.cld.gov.au
CLD_B         ?= b.cld.gov.au
CLD_HOST      ?= $(CLD_Y)

# We're in the platforms space so we prefix services with `pay-`.
SERVICES       = pay-bambora
SVC_APPLIED    = $(SERVICES:%=apply-service-%)
SVC_CREATED    = $(SERVICES:%=create-service-%)
SVC_DIFFED     = $(SERVICES:%=diff-service-%)
SVC_FETCHED    = $(SERVICES:%=fetch-service-%)
APPLY_ACTION  ?= update

apply-services: $(SVC_APPLIED)

fetch-services: $(SVC_FETCHED)

diff-services: $(SVC_DIFFED)

ups/$(CLD_HOST)/%.json:
	$(MAKE) ensure-space
	-mkdir -p $(@D)
	$(CF) curl "/v2/user_provided_service_instances?q=name:$*" | $(JQ) -S ".resources[].entity.credentials" > $@

$(SVC_APPLIED): apply-service-%: ups/$(CLD_HOST)/%.json
	$(CF) $(APPLY_ACTION)-user-provided-service $* -p $<

$(SVC_CREATED): create-service-%:
	$(MAKE) apply-service-$* APPLY_ACTION=create

$(SVC_DIFFED): SHELL = /bin/bash
$(SVC_DIFFED): diff-service-%: ensure-space
	@$(DIFF) \
	  <($(CF) curl "/v2/user_provided_service_instances?q=name:$*" | $(JQ) -S ".resources[].entity.credentials") \
	  <($(JQ) -S . ups/$(CLD_HOST)/$*.json)

$(SVC_FETCHED): fetch-service-%: ensure-space
	-mkdir -p ups/$(CLD_HOST)
	$(CF) curl "/v2/user_provided_service_instances?q=name:$*" | $(JQ) -S ".resources[].entity.credentials" > ups/$(CLD_HOST)/$*.json

ensure-space:
	$(CF) target -s $(CF_SPACE)

list-branches:
	$(GIT) ls-remote --heads ${GIT_REMOTE} | egrep "/feat-.*" | ./remove_feat_prefix.py

list-apps:
	$(CF) curl "/v2/spaces/${CF_SPACE_ID}/apps?results-per-page=100" | $(JQ) -r ".resources[].entity.name"

list-services:
	$(CF) curl "/v2/spaces/${CF_SPACE_ID}/service_instances" | $(JQ) -r ".resources[].entity.name"

undeploy:
	$(MAKE) -C provisioning undeploy-closed-branches
	$(CF) delete-orphaned-routes -f

undeploy-app-%:
	$(CF) delete $* -f -r
	$(MAKE) -C provisioning unprovision-$*

undeploy-service-%:
	$(CF) delete-service $* -f

setup-auth0:
	$(MAKE) -C provisioning provision-$(APP)-$(STG)

.PHONY: apply-services fetch-services diff-services \
	ensure-space \
	list-branches list-apps list-services \
	setup setup-auth0 undeploy \
	$(SVC_APPLIED) $(SVC_CREATED) $(SVC_DIFFED) $(SVC_FETCHED)
