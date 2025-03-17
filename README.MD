# Web Explorer

## Getting Started

This project consists of both backend and frontend components. Follow the instructions below to set up and run the project.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v8 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v13 or higher)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/web-explorer.git
    cd web-explorer
    ```

2. Install dependencies:
    ```sh
    pnpm install
    ```

### Backend

#### Configuration

1. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    NODE_ENV=development
    PORT=9000
    POSTGRES_URI=postgres://username:password@localhost:5432/database
    JWT_AUTH_SECRET=your_jwt_secret
    ```

#### Running the Development Server

To start the backend development server, run:
```sh
pnpm --filter backend dev
```

The server will start on `http://localhost:9000`.

#### Project Structure

- `backend/src/`
  - `application/` - Application context and setup
  - `domain/` - Domain models, repositories, and use cases
  - `infrastructure/` - Infrastructure services and configurations

#### Available Scripts

- `pnpm --filter backend dev` - Start the development server
- `pnpm --filter backend build` - Build the project for production
- `pnpm --filter backend lint` - Lint the codebase

#### API Endpoints

- `GET /api/v1/folders` - List all folders
- `POST /api/v1/folders` - Create a new folder
- `GET /api/v1/folders/:id/contents` - Get contents of a folder
- `POST /api/v1/files` - Upload a file

### Frontend

#### Running the Development Server

To start the frontend development server, run:
```sh
pnpm --filter frontend dev
```

The server will start on `http://localhost:3000`.

#### Project Structure

- `frontend/src/`
  - `assets/` - CSS and image assets
  - `components/` - Vue components
  - `views/` - Vue views
  - `router/` - Vue router configuration

#### Available Scripts

- `pnpm --filter frontend dev` - Start the development server
- `pnpm --filter frontend build` - Build the project for production
- `pnpm --filter frontend lint` - Lint the codebase
- `pnpm --filter frontend format` - Format the codebase

### License

This project is licensed under the MIT License.