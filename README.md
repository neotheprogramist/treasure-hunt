# The Hunt3rs

Welcome to the future of networking in conferences and exhibitions: The Hunt3rs app. This innovative, web3 backed networking application is revolutionizing the way brands and attendees engage, connect, and maximize presence in professional gatherings.

# Problems Addressed:

- Excessive spending by brands on exhibitions with minimal lead generation.
- Difficulty in converting attendees into future clients or community members.
- Challenges in measuring the ROI and effectiveness of exhibitions or conferences.

# The Solution: The Hunt3rs App

The Hunt3rs app transforms conferences and exhibitions into interactive, gamified experiences, making it more than just an app – it's a digital compass for treasure hunting in the professional world. Attendees interact with booths and speakers as adventure spots, claiming digital tokens, minting NFT badges, and exchanging valuable contacts, all while immersed in an exhilarating hunt.

# Features and Benefits:

- Engaging Activities: Creates engaging activities for communities, increasing visibility and reach for participating projects.
- ROI Measurement Tools: Provides tools to measure ROI and convert leads into customers or community members post-events.
- Gamified Networking: Offers a modern twist on the classic ‘treasure hunt’, specifically tailored for the professional sphere.

# How It Works:

- Scout: Review the list of available partners – your targets.
- Track: Find the partners at the event.
- Aim: Scan their NFC Tag using your phone.
- Capture: Complete tasks to claim your badge.
- Gather: Accumulate badges to earn rewards.
- This competitive yet collaborative approach breaks down barriers and encourages fun, engaging interactions.

# Tokenized Experience:

Upon interaction, users (Hunters) instantly receive collectible NFTs and Soulbound Tokens (SBTs).
Brands gather user data (name, wallet ID, email) for effective connection tracking.

# App Demo

https://youtu.be/IX3dzn-JkYo

# Smart Contracts

Repo: https://github.com/neotheprogramist/hunters-contracts

- [mainnet](https://alephzero.subscan.io/account/5FTgMgUKq3J3gPZpbhgvZP3UL5YuhbsSJPsxPzjdTyYPRrg1)

# Working Demo

https://hunters.visoft.dev/

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
  REGISTRY_URL=https://localhost:30500
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
