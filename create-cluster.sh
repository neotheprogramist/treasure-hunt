#!/usr/bin/env bash

KIND_EXPERIMENTAL_PROVIDER=podman kind create cluster --config kind/kind.yaml && \
ansible-playbook kind/install.yaml
