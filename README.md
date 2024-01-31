# The Hunters

Visit the `https://hunters.visoft.dev/` to see working app.


# Setting Up a Kind Cluster

This guide provides step-by-step instructions on setting up a Kind (Kubernetes in Docker) cluster for your development environment. Kind allows you to run Kubernetes clusters in Docker containers, which is ideal for local testing and development.

## Prerequisites

Before you begin, ensure that you have Python and Ansible installed on your machine. These tools are necessary for creating the virtual environment, installing dependencies, and configuring the cluster.

## Step 1: Create a Python Virtual Environment

Start by creating an isolated Python environment to manage the project's dependencies:

```bash
python -m venv .venv
```

## Step 2: Activate the Virtual Environment

Activate the virtual environment to use it for the subsequent operations:

```bash
source .venv/bin/activate
```

## Step 3: Upgrade pip

Ensure that you have the latest version of pip, the Python package manager:

```bash
pip install --upgrade pip
```

## Step 4: Install Python Dependencies

Install the required Python packages listed in the project's `requirements.txt` file:

```bash
pip install -r kind/requirements.txt
```

## Step 5: Install Ansible Collections

Install the necessary Ansible collections for cluster configuration as specified in the project's YAML file:

```bash
ansible-galaxy collection install -r kind/ansible-requirements.yaml
```

## Step 6: Configure Public Environment Variables

Set up the public environment variables by creating and editing a `.env` file in the specified directory. Adjust the variables as needed for your setup:

- Location: `k8s/patches/dev/.env`
- Example Content:
  ```
  ORIGIN=https://hunters.visoft.dev
  REGISTRY_URL=https://registry.visoft.dev
  PUBLIC_CONTRACT=5FdBmnv3vSPHcVoutyTBjgs1n8wCf8swq5Jb6cndN3BLp59R
  PUBLIC_AZERO_URL=wss://ws.azero.dev/
  ```

## Step 7: Configure Private Environment Variables

Similarly, set up the private environment variables by creating and editing a `.env.local` file. These variables should be kept secure and not exposed publicly:

- Location: `k8s/patches/dev/.env.local`
- Example Content:
  ```
  MINTER_SEED=
  ```

## Step 8: Create a New Kind Cluster

Use the provided shell script to create a new Kind cluster with the specified configuration:

```bash
./create-cluster.sh
```

## Step 9: Apply Kubernetes Patches

Finally, apply the necessary Kubernetes patches to your cluster to complete the setup:

```bash
./deploy-to-cluster.sh
```

## Accessing the Deployed Container

Once the Kubernetes patches have been applied and the Kind cluster setup is complete, you can access the deployed container through your web browser:

- For HTTP access, navigate to: [http://localhost:30080](http://localhost:30080)
- For HTTPS access, navigate to: [https://localhost:30443](https://localhost:30443)
