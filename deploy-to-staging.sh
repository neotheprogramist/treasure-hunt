#!/usr/bin/env bash

# Load environment variables
source k8s/patches/staging/.env && \
source k8s/patches/staging/.env.local && \

# Push the Docker image
podman push --creds $REGISTRY_USER:$REGISTRY_PASS webapp:latest registry.visoft.dev/webapp:latest && \

# Create or update the Docker registry secret
kubectl -n staging create secret docker-registry regcred \
  --docker-server=$REGISTRY_URL \
  --docker-username=$REGISTRY_USER \
  --docker-password=$REGISTRY_PASS \
  --dry-run=client -o yaml | kubectl apply -f - && \

# Apply Kubernetes manifests
kubectl apply -k k8s/patches/staging
