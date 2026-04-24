# Yantrix

Backend service for Yantrix, built with Node.js, TypeScript, Express, Prisma, and PostgreSQL.

## Overview

Yantrix is structured as a backend-first service with a Prisma-managed PostgreSQL database and Docker-based local environment. This repository currently contains the backend application in the `backend` directory.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express
- **ORM:** Prisma
- **Database:** PostgreSQL 16
- **Containerization:** Docker + Docker Compose

## Repository Structure

```text
Yantrix/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   └── index.ts
│   ├── docker-compose.yml
│   ├── Dockerfile.dev
│   ├── package.json
│   └── .env.example
└── Readme.md
```

## Prerequisites

Before running the project, ensure you have:

- Node.js 18 or later
- npm
- Docker Desktop (or Docker Engine + Compose)

## Quick Start

### 1) Clone and move into the backend

```bash
git clone <your-repository-url>
cd Yantrix/backend
```

### 2) Install dependencies

```bash
npm install
```

### 3) Set up environment variables

Create a `.env` file in `backend/` using `.env.example` as a baseline:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/space_platform?schema=public
PORT=8000
NODE_ENV=development
JWT_SECRET=your_dev_secret
JWT_REFRESH_SECRET=your_dev_refresh_secret
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### 4) Start services with Docker (recommended)

```bash
docker compose up --build
```

This starts:

- PostgreSQL on `localhost:5432`
- Backend on `localhost:8000`

## Running Without Docker

If you prefer running locally:

```bash
cd backend
npx prisma generate
npm run dev
```

## Available Commands

From `backend/package.json`:

- `npm run dev` - Build TypeScript and run the backend
- `npx prisma generate` - Generate Prisma client
- `npx prisma migrate dev --name <migration_name>` - Create and apply a migration
- `npx prisma studio` - Open Prisma Studio

## Database

Prisma schema is defined in `backend/prisma/schema.prisma`.

Current entities:

- `User`
  - `id`, `name`, `email`, `phone`, `githubId`, `password`
  - `createdAt`, `updatedAt`

## Configuration

The Docker Compose setup uses:

- Database container: `space_platform_postgres`
- Backend container: `space_platform_backend`
- Internal database host for backend container: `postgres`

## Development Notes

- Keep `DATABASE_URL` aligned with your run mode:
  - Dockerized backend: host should be `postgres`
  - Local backend process: host should be `localhost`
- Do not commit real credentials or production secrets.
- Keep `.env` in `.gitignore`.

## Security

- Replace placeholder JWT secrets before deployment.
- Use strong, unique database credentials in non-local environments.
- Configure environment variables through a secure secret manager in production.

## Project Status

The repository is in active development. The current entry point is `backend/src/index.ts`, and API routes are expected to be expanded in upcoming iterations.

## Contributing

1. Create a feature branch from `main`.
2. Make focused, atomic changes.
3. Verify changes locally.
4. Open a pull request with context and test steps.

## License

Add your preferred license here (for example, MIT).
