# Task Management

A small task management app with a React + TypeScript frontend and an Express + Prisma backend.

## Repository structure

- `frontend/` — Vite React app with task UI, modals, search/filter, and backend API calls.
- `backend/` — Express API using Prisma with PostgreSQL.

## Frontend

### How the task filter works

The task list uses a combination of text search and status filtering on the frontend.

- Search is case-insensitive.
- The value typed in the search box is trimmed and converted to lowercase before checking.
- A task remains visible only if its description includes the searched text.
- The filter dropdown supports four states:
  - `All` — show every task
  - `Active` — show tasks where `isActive === true`
  - `Inactive` — show tasks where `isActive === false`
  - `Completed` — show tasks where a `completedAt` value exists

The actual filtering logic is effectively:

```ts
const term = searchTerm.trim().toLowerCase();

return task.filter((item) => {
  if (term && !item.task.toLowerCase().includes(term)) return false;
  if (filter === "All") return true;
  if (filter === "Active") return item.isActive === true;
  if (filter === "Inactive") return item.isActive === false;
  if (filter === "Completed") return !!item.completedAt;
  return true;
});
```

This means the list is filtered in two steps:
1. remove tasks that do not match the search text
2. then apply the selected status filter

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
- This project uses a reusable boilerplate setup as a base for the app structure. Some generated files may exist even though they are not essential for the actual task-management logic.
- This means the project may include additional scaffolded files or starter configuration that are not required for the app to function, but they are left in place to keep the development workflow consistent.
