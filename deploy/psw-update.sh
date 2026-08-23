#!/bin/bash
# Poll GHCR for a newer site image and roll the container if one landed.
# The NAS has no inbound reachability, so pull-based deploy is the only option.
set -euo pipefail

COMPOSE_DIR=/etc/probablysecure-web
IMAGE=ghcr.io/kush69420/probablysecure-web:latest

cd "$COMPOSE_DIR"

before=$(docker image inspect --format '{{.Id}}' "$IMAGE" 2>/dev/null || echo none)
docker compose pull --quiet probablysecure-web
after=$(docker image inspect --format '{{.Id}}' "$IMAGE" 2>/dev/null || echo none)

if [[ "$before" == "$after" ]]; then
    echo "no change ($after)"
    exit 0
fi

echo "new image: $before -> $after"
docker compose up -d probablysecure-web
docker image prune -f --filter "label=org.opencontainers.image.source" >/dev/null 2>&1 || true
echo "deployed"
