#!/usr/bin/env bash

# -e  Exit immediately if a command exits with a non-zero status.
set -e

docker login -u "$REGISTRY_USERNAME" -p "$REGISTRY_PASSWORD" "$REGISTRY_HOST"
docker push $REPO:$TAG

echo "WARNING: Updating 'latest' tag"
docker tag $REPO:$TAG $REPO:latest
docker push $REPO:latest

docker logout
