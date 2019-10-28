NPX ?= npx
MIX ?= mix

generate: ../priv/static/swagger.json
	$(NPX) openapi-generator generate -i $< -g elixir -o ./pay-client

	cd ./pay-client && $(MIX) format

.PHONY: generate
