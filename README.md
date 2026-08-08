# Task Management

A small task management app with a React + TypeScript frontend and an Express + Prisma backend.

## Repository structure

- `frontend/` — Vite React app with task UI, modals, search/filter, and backend API calls.
- `backend/` — Express API using Prisma with PostgreSQL.

## Frontend

### Key runtime dependencies

- `react`
- `react-dom`
- `react-router-dom`
- `react-hook-form`
- `axios`
- `tailwindcss`
- `@tailwindcss/vite`

### Setup

```bash
cd frontend
npm install
```

Create a `.env` file with:

```env
VITE_API_URL=http://localhost:3000/api
```

### Run

```bash
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Backend

### Key runtime dependencies

- `express`
- `@prisma/client`
- `@prisma/adapter-pg`
- `pg`

### Setup

```bash
cd backend
npm install
npx prisma generate
```

Create a `.env` file with:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
CLIENT_URL=http://localhost:5173
```

If you need a local database schema, run:

```bash
npx prisma migrate dev
npx prisma db push
```

### Run

```bash
npm run dev
```

Build:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

## Notes

- The frontend uses `VITE_API_URL` to call the backend API.
- The backend validates `DATABASE_URL` and `CLIENT_URL` at startup.
- Frontend and backend each have their own `package.json` and local install steps.
