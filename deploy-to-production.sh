#!/usr/bin/env bash

# Load environment variables
source .env && \
source .env.local && \

# Create namespace
kubectl create namespace treasure-hunt-production --dry-run=client -o yaml | kubectl apply -f - && \

# Delete old deployment
# kubectl delete -k k8s/patches/production && \

# Build the Docker image
podman build -t treasure-hunt:latest . && \

# Push the Docker image
podman push --creds $REGISTRY_USER:$REGISTRY_PASS treasure-hunt:latest registry.visoft.dev/treasure-hunt:latest && \

# Create or update the Docker registry secret
kubectl -n treasure-hunt-production create secret docker-registry regcred \
  --docker-server=$REGISTRY_URL \
  --docker-username=$REGISTRY_USER \
  --docker-password=$REGISTRY_PASS \
  --dry-run=client -o yaml | kubectl apply -f - && \

# Apply Kubernetes manifests
kubectl apply -k k8s/patches/production
