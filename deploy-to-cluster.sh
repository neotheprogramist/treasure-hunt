#!/usr/bin/env bash

podman build -t treasure-hunt . && \
podman push --tls-verify=false treasure-hunt:latest localhost:30500/treasure-hunt:latest && \
kubectl config use-context kind-kind && \
kubectl apply -k k8s/patches/dev
