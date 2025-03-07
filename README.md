# Mashgin Take-Home Assignment



This repository contains a monorepo built with Turborepo, housing a full-stack application with a Next.js frontend and a NestJS backend. The project demonstrates modern software development practices using a TypeScript-based tech stack.

![Mashgin Menu Interface](./resources/mashgin-menu.png)



- [Project Structure](#project-structure)
- [Architecture](#architecture)
  - [Architectural Decisions](#architectural-decisions)
  - [Projects](#projects)
- [Getting Started](#getting-started)
- [Database](#database)
- [Next Steps](#next-steps)


## Project Structure

```
.
├── apps/                   
│   ├── api/                # NestJS backend service
│   └── web/                # Next.js frontend application
└── packages/               # Shared libraries and configurations
    ├── eslint-config/      
    ├── typescript-config/  
```

## Architecture

[//]: # "Insert architecture diagram here"

The project uses a monorepo structure managed by Turborepo and pnpm, allowing for efficient dependency management and build processes across multiple applications and shared packages. This architecture promotes code reuse while maintaining clear boundaries between services.

### Architectural Decisions

For a detailed explanation of the key architectural and tech stack decisions made in this project, please refer to the [Architectural Decisions](./ARCHITECTURAL_DECISIONS.md) document.

### Projects

- **API Service**: NestJS backend that provides REST API endpoints for menu items and order management. [View API Service README for more details](./apps/api/README.md).
- **Web Application**: Next.js frontend that provides the user interface for browsing menu items and placing orders. [View Web Application README for more details](./apps/web/README.md).



## Getting Started

### Prerequisites

- Node.js >= 18.18.0
- Pnpm package manager

### Setup

Follow these steps to set up and run the project:

1. Copy the environment variables file for the backend service:
   ```bash
   cp apps/api/.env.example apps/api/.env
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Prepare the local database environment:
   ```bash
   pnpm --filter api db:prepare
   ```
   This will:
   - Generate Prisma client files
   - Create the SQLite database
   - Apply migrations
   - Seed initial data

4. Start the development servers:
   ```bash
   pnpm dev
   ```
5. Make sure both tasks are running (web#dev and api#dev), then go to `http://localhost:3000`

## Database

The backend uses SQLite for simplicity in this demonstration project. In a real-world production environment, a more robust relational database management system like PostgreSQL or MySQL would be a more appropriate choice for scalability, concurrency, and reliability.

SQLite db file will be created at: `apps/api/prisma/mashgin-dev.db`

## Next Steps

- [ ] Add end-to-end tests for the API project
- [ ] Add component tests for the web project
