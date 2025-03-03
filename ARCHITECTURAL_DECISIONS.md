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

This document explains the key architectural and tech stack choices made for this project. I focused on meeting the assignment requirements with simplicity while maintaining code quality, maintainability, and developer experience.

## Monorepo Structure

I used a Turborepo monorepo setup with pnpm to deliver frontend and backend code together. This provides faster builds through caching, better task management, and consistent tooling across the codebase. Though there isn't much shared code now, this structure makes it easy to add when needed.

## Tech Stack

### Database

I chose SQLite because it meets the needs without unnecessary complexity. Using Prisma as an ORM means we can easily switch to MySQL or PostgreSQL later if needed. For a production app with higher concurrency needs, I would upgrade to a more robust database.

### Backend

NestJS provides a structured way to build API services with TypeScript. Its dependency injection system makes testing easier, and its module system keeps code organized.

#### Images
Menu item images are being served through an `/assets` route on the backend service. Currently the frontend project is using next/image, meaning the app is using 2 apis to serve images (one from next/image, and the other from backend service) which is not ideal. Better alternatives for production would be:
- Using an image hosting/optimization service (e.g. kraken.io)
- Storing images in a storage service like AWS S3 and serving through a CDN like AWS Cloudfront.

### Frontend

The frontend uses NextJS, Tailwind CSS, and Shadcn components with TypeScript support. For state management, I chose Zustand over Redux as it requires less boilerplate while meeting all project needs.

## Code Organization

I organized code by feature rather than technical layer, making the structure reflect application functionality. This approach works well for smaller projects like this one.

A clean architecture implementation with domain, application, and infrastructure layers was considered but deemed unnecessary for this project size.

## API Design

The API follows REST principles with standard methods and status codes. Its resource-oriented structure aligns with database entities. Swagger documentation is included for easier exploration and testing.

## Testing Strategy

I included unit tests for core backend features. In a production scenario, I would add integration tests and frontend component tests to ensure full application reliability.