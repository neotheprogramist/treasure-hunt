# Qwik City App ⚡️

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)

---

## Project Structure

This project is using Qwik with [QwikCity](https://qwik.builder.io/qwikcity/overview/). QwikCity is just an extra set of tools on top of Qwik to make it easier to build a full site, including directory-based routing, layouts, and more.

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Provides the directory-based routing, which can include a hierarchy of `layout.tsx` layout files, and an `index.tsx` file as the page. Additionally, `index.ts` files are endpoints. Please see the [routing docs](https://qwik.builder.io/qwikcity/routing/overview/) for more info.

- `src/components`: Recommended directory for components.

- `public`: Any static assets, like images, can be placed in the public directory. Please see the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Add Integrations and deployment

Use the `npm run qwik add` command to add additional integrations. Some examples of integrations includes: Cloudflare, Netlify or Express Server, and the [Static Site Generator (SSG)](https://qwik.builder.io/qwikcity/guides/static-site-generation/).

```shell
npm run qwik add # or `yarn qwik add`
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will server-side render (SSR) the output during development.

```shell
npm start # or `yarn start`
```

> Note: during dev mode, Vite may request a significant number of `.js` files. This does not represent a Qwik production build.

## Preview

The preview command will create a production build of the client modules, a production build of `src/entry.preview.tsx`, and run a local server. The preview server is only for convenience to preview a production build locally and should not be used as a production server.

```shell
npm run preview # or `yarn preview`
```

## Production

The production build will generate client and server modules by running both client and server build commands. The build command will use Typescript to run a type check on the source code.

```shell
npm run build # or `yarn build`
```

## Fastify Server

This app has a minimal [Fastify server](https://fastify.dev/) implementation. After running a full build, you can preview the build using the command:

```
npm run serve
```

Then visit [http://localhost:3000/](http://localhost:3000/)

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
  ORIGIN=https://localhost:30443
  ```

## Step 7: Configure Private Environment Variables

Similarly, set up the private environment variables by creating and editing a `.env.local` file. These variables should be kept secure and not exposed publicly:

- Location: `k8s/patches/dev/.env.local`
- Example Content:
  ```
  SURREALDB_USER=root
  SURREALDB_PASS=toor
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
