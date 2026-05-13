DEV_COMPOSE := docker compose -f docker-compose.yml -f docker-compose.dev.yml
PROD_COMPOSE := docker compose -f docker-compose.yml -f docker-compose.prod.yml -f docker-compose.monitoring.yml
LOCAL_COMPOSE := docker compose -f docker-compose.local.yml
MONITORING_COMPOSE := docker compose -f docker-compose.monitoring.yml

REGISTRY := ghcr.io/antswar
PLATFORMS := linux/amd64,linux/arm64
BUILDER := multi-builder

.PHONY: dev prod local monitoring dev-down prod-down monitoring-down clean release

dev:
ifdef SERVICE
	$(DEV_COMPOSE) up -d --build $(SERVICE)
else
	$(DEV_COMPOSE) up -d --build
endif

prod:
ifdef SERVICE
	$(PROD_COMPOSE) pull $(SERVICE)
	$(PROD_COMPOSE) up -d $(SERVICE)
else
	$(PROD_COMPOSE) pull
	$(PROD_COMPOSE) up -d
endif

local:
	$(LOCAL_COMPOSE) down
	$(LOCAL_COMPOSE) up -d

monitoring:
ifdef SERVICE
	$(MONITORING_COMPOSE) up -d $(SERVICE)
else
	$(MONITORING_COMPOSE) up -d
endif

dev-down:
	$(DEV_COMPOSE) down

prod-down:
	$(PROD_COMPOSE) down

monitoring-down:
	$(MONITORING_COMPOSE) down

clean:
	docker image prune -f
	docker builder prune -f

release:
ifndef SERVICE
	$(error SERVICE is required. usage: make release SERVICE=backend VERSION=1.2.3)
endif
ifndef VERSION
	$(error VERSION is required. usage: make release SERVICE=backend VERSION=1.2.3)
endif
ifeq ($(SERVICE),nginx)
	docker buildx build \
		--builder $(BUILDER) \
		--platform $(PLATFORMS) \
		-f nginx/Dockerfile \
		-t $(REGISTRY)/$(SERVICE):$(VERSION) \
		-t $(REGISTRY)/$(SERVICE):latest \
		--push \
		.
else
	docker buildx build \
		--builder $(BUILDER) \
		--platform $(PLATFORMS) \
		-t $(REGISTRY)/$(SERVICE):$(VERSION) \
		-t $(REGISTRY)/$(SERVICE):latest \
		--push \
		$(SERVICE)
endif