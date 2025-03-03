# Architectural Decision

- [Overview](#overview)
- [Monorepo Structure](#monorepo-structure)
- [Tech Stack](#tech-stack)
  - [Database](#database)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Code Organization](#code-organization)
- [API Design](#api-design)
- [Testing Strategy](#testing-strategy)

## Overview

In this document, I'm breaking down the key architectural and tech stack choices I made for this project and why I made them. I primarily focused on meeting the assignment requirements (specially focusing on simplicity), but I also kept in mind best practices for creating code (e.g. maintainability, performance, dev experience,...). These decisions guided how I structured the entire project. 

I believe there is much more that could be done from the system design perspective if this project goes to production. We can discuss my thoughts on it if you'd like.

## Monorepo Structure

For this project, I went with a monorepo setup using Turborepo and pnpm because it just made sense for delivering both frontend and backend code together. Turborepo gives me some nice perks like faster builds through caching and better task management across packages. While I'm not sharing much code between projects right now, the monorepo makes it easy to do so when/if needed. It also keeps dependency management clean and ensures I'm using the same tools consistently throughout the codebase. I chose pnpm over npm (or yarn) mainly because it's faster and doesn't take much disk space.

## Tech Stack

### Database

I went with SQLite for this project because it's simpler than more robust options like MySQL or PostgreSQL. It does everything needed for this project without extra complexity. The nice thing is I'm using Prisma as a layer between my code and the database, so this could be easily switched to MySQL or something else later if needed. SQLite works perfectly for now, but for a real production app where lots of users are hitting the database at the same time and you need more advanced features, I'd definitely upgrade to MySQL or Postgres instead (or evalute other database solutions)

### Backend

I picked NestJS for my backend because it gives me a simple and organized way to build API services, and it works great with TypeScript. It also has built-in dependency injection, which makes testing easier. Plus, its module system keeps the code neat and organized.

### Frontend

For the frontend, I decided to go with NextJS, Tailwind CSS and Shadcn components. This combination gives me a solid starting point with built-in TypeScript on NextJS.  When it came to state management, I thought about using Redux with Redux-Toolkit, but ultimately chose Zustand instead because it's less complex and requires less boilerplate code while still meeting all my needs for this project.

## Code Organization

For organizing my code, I chose to structure everything by feature instead of by technical layer. The folder structure naturally reflects the application's functionality, and makes it really easy to maintain on small projects like this.

## API Design

For the API design, I went with a REST approach, with standard methods and status codes. The resource-oriented structure maps nicely to database entities, creating a clear relationship between the data and the endpoints. To make the API easier to explore and test, I added Swagger documentation where you can see endpoints and try them out.

## Testing Strategy

Although testing wasn't specifically required for this take-home assignment, I still implemented unit tests for the core features in the backend. For a more comprehensive testing approach, I'd add integration tests, as well as component tests for the frontend to make sure the UI behaves properly. These additional testing layers would be my next steps if I were to continue developing this application for production use.