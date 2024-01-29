#!/usr/bin/env bash

podman build -t webapp . && \
podman push --tls-verify=false webapp:latest localhost:30500/webapp:latest && \
kubectl config use-context kind-kind && \
kubectl apply -k k8s/patches/dev
