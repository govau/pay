YARN ?= yarn
SRC   = $(shell find src -type f)
PUB   = $(shell find public -type f)
PORT ?= 4001

all: build

yarn.lock node_modules: package.json
	$(YARN) install

build/index.html: public/index.html $(SRC) $(PUB)
	$(YARN) build

setup: yarn.lock node_modules

build: build/index.html

clean:
	-rm -r build

start: public/index.html $(SRC) $(PUB)
	$(ENV) PORT=$(PORT) $(YARN) start | cat

test:
	$(YARN) test

.PHONY: clean start test
