# POC WebSocket x Python (Client)

This folder represents the client part of this POC. It uses [Vite](https://vitejs.dev) to support `.ts` files import and enable HMR in development. It relies on the native JS [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

## Prerequisites

### Node.js

We use [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) to ensure a consistent Node.js version. Install NVM and set the Node.js version for this project with :

```bash
nvm install
```

### Pnpm

Pnpm is the package manager of choice for this project. Make sure you are using at least Node.js 14 _(lts/fermium)_ and then activate it through `corepack` :

```bash
corepack enable pnpm
```

To ensure consistent behaviour across all development environments, they should all use the same version of pnpm. That's why an explicit pnpm version is specified in the [package.json](). Check if your pnpm version is matching the one under the `packageManager` property :

```bash
pnpm -v
```

If it is not the case, install the corresponding version :

```bash
corepack install
```

### Visual Studio Code

Consistency in TypeScript versions is crucial. For VSCode users, ensure that you [use the workspace version of TypeScript](https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript) and not the built-in version provided by VSCode.

## Getting Started

Ensure that you follow the sections below in sequence to set up your development environment without issues.
Documentation is provided to guide you through the major setup steps.

### Dependency Installation

Install necessary project dependencies :

```bash
pnpm install
```

### Dependency Addition & Update (Optional)

To precisely keep track of the dependencies of this application, each dependency should be added with a specific version number :

```bash
pnpm add <pkg> -E
```

Also, for easier dependency updating, you should use the pnpm interactive mode :

```bash
pnpm up -i -L
```

## Development

Execute the app :

```bash
# Development mode
pnpm dev
```

## Production

Build the app :

```
pnpm build
```

You can now deploy the content of the `/dist` like any other static site. You can also preview the result locally using :

```bash
pnpm preview
```

## Docker

To ease the use of this project on any OS, it also includes a Dockerfile that containerizes this client and serve it through Nginx. You can setup all the infrastructure using Docker compose on the [root](../) of this repository :

```bash
docker compose up
```
