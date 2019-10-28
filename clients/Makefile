NPX ?= npx

generate: ../priv/static/swagger.json
	$(NPX) openapi-generator generate -i $< -g elixir -o ./pay-client

.PHONY: generate
