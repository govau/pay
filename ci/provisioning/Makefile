MIX ?= mix

LIB = lib/provisioning.ex

setup:
	$(MIX) deps.get

setup-ci:
	$(MIX) local.hex --force
	$(MIX) local.rebar --force
	$(MAKE) setup

provisioning: $(LIB)
	$(MIX) escript.build

provision-%: provisioning
	./provisioning --host "https://$*.apps.y.cld.gov.au"

unprovision-%: provisioning
	./provisioning --host "https://$*.apps.y.cld.gov.au" --teardown

undeploy-closed-branches: $(LIB) undeploy_closed_branches.exs
	$(MIX) run undeploy_closed_branches.exs

clean:
	-rm -r _build
	-rm provisioning

.PHONY: setup clean undeploy_closed_branches
