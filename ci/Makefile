GIT           ?= git
CF            ?= cf
JQ            ?= jq
CF_SPACE      ?= platforms
CF_SPACE_ID   ?= $(shell $(CF) curl "/v2/spaces?q=name:$(CF_SPACE)" | jq -r ".resources[].metadata.guid")
GIT_REMOTE    ?= $(shell $(GIT) config --get remote.origin.url)

list-branches:
	$(GIT) ls-remote --heads ${GIT_REMOTE} | egrep "/feat-.*" | ./remove_feat_prefix.py

list-apps:
	$(CF) curl "/v2/spaces/${CF_SPACE_ID}/apps?results-per-page=100" | jq -r ".resources[].entity.name"

list-services:
	$(CF) curl "/v2/spaces/${CF_SPACE_ID}/service_instances" | jq -r ".resources[].entity.name"

undeploy:
	./undeploy_closed_branches.py
	$(CF) delete-orphaned-routes -f

undeploy-app-%:
	$(CF) delete $* -f -r

undeploy-service-%:
	$(CF) delete-service $* -f
