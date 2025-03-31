## Project Structure

The project is structured into the following folders:

```
ShippingFrontEnd/
├── packages/
│   ├── shared/       # Shared code and utilities between packages
│   ├── web/          # Web application for shipping services
├── docker/           # Docker configuration files
├── .env-dev          # Environment variables for development
├── .env              # Environment variables for production
├── README.md         # Project documentation
├── package.json      # Project dependencies and scripts
```

- `web`: The web application used to provide shipping Web Services.
- `shared`: The shared package is used to represent common code between packages.

## Requirements

- Node.js 22
- Docker

## Quick Start

Before starting the project, copy the file `.env-dev` to `.env` and configure the environment variables. There are two modes for the configuration:

- `dev`: Development mode.

To start the project, you should use Docker Compose with either a local or production database.

### Install Dependencies
```bash
yarn install
```

### Build Shared Package
```bash
cd packages/shared
yarn build
```

### Start Web Application
```bash
cd packages/wev
yarn dev
```

