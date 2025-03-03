# Web Application
This is a Next.js-based web application that serves as the frontend for the Mashgin take-home assignment. It provides a user interface for interacting with the API service, displaying menu items and managing orders.


- [Directory Structure](#directory-structure)
- [Technical Stack](#technical-stack)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)



## Directory Structure

```
.
├── public/                # Static files served directly by Next.js
│   └── ...                
└── src/                   # Source code
    ├── app/               # Next.js App Router components and pages
    ├── components/        # Reusable UI components
    ├── lib/               # Utility functions and client-side libraries
    └── types/             # TypeScript type definitions
```

## Technical Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **UI/Styling**: Tailwind CSS and Shadcn
- **State Management**: Zustand
- **API Communication**: Axios
- **Testing**: Jest


## Development

### Prerequisites

- pnpm package manager

### Setup

For setup instructions, see the root [README.md](../../README.md) file.

### Environment Variables

The application uses environment variables for configuration. These are typically defined in `.env.development` for development and `.env` for production.

Key variables include:
- `NEXT_PUBLIC_API_HOST`: The URL of the API service

For local developent, `.env.local` file is used.

## Testing

Component testing is planned as a future enhancement. The testing strategy will include:

- Unit tests for utility functions
- Component tests for UI components
- Integration tests for page components

