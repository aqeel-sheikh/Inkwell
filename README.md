# Inkwell - Fullstack blog web app

[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-ES%20Modules-green)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-yellow.svg)](./LICENSE)

Full-stack blog platform with a Node.js API, PostgreSQL database, and two React frontends: a public **client** for reading posts and commenting, and an **admin** dashboard for authors to create and manage content.

---

## Project Overview

This repository provides a complete blog system:

- **Server** — Express API with Better Auth (email/password), Prisma (PostgreSQL), and REST endpoints for posts, comments, users, and dashboard stats.
- **Admin** — React SPA for authenticated users: dashboard, blog CRUD, publish/draft, and profile settings.
- **Client** — React SPA for visitors: homepage with published posts, post detail by slug, and comments.

The server is the single backend; both frontends talk to the same API and auth service.

---

## Key Features

- **Authentication** — Email/password sign-up and sign-in via [Better Auth](https://www.better-auth.com/); session-based auth with configurable trusted origins.
- **Blog posts** — Create, edit, delete; draft vs published; slug-based URLs; title, content, excerpt, tags.
- **Comments** — List comments per post (public); create comment (authenticated).
- **Dashboard** — Author stats: total posts, published, drafts, and view counts.
- **User profiles** — Username (unique), name, email, image, cover image, website, bio; editable in admin Settings.
- **Public API** — List published posts and get post by slug without auth.

---

## Tech Stack

| Layer   | Technologies |
|--------|--------------|
| **Server** | Node.js, Express 5, Better Auth, Prisma 7, PostgreSQL, Helmet, CORS, Zod |
| **Admin**  | React 19, Vite 6, React Router 7, TanStack Query, Better Auth client, Tailwind CSS 4, Radix UI, Zod |
| **Client** | React 19, Vite 6, React Router 7, TanStack Query, Better Auth client, Tailwind CSS 4, Radix UI, Zod |

---

## Installation & Setup

### Prerequisites

- **Node.js** (v18+ recommended)
- **PostgreSQL** (for the server)
- **pnpm** or **npm** (commands below use `npm`)

### 1. Clone and install dependencies

```bash
git clone https://github.com/aqeel-sheikh/Inkwell.git
cd Inkwell
```

Install in each app:

```bash
cd server && npm install && cd ..
cd admin && npm install && cd ..
cd client && npm install && cd ..
```

### 2. Database

Create a PostgreSQL database and run migrations from the `server` directory:

```bash
cd server
npx prisma migrate deploy
# Or for development:
npx prisma migrate dev
```

### 3. Environment variables

Create `.env` in each app and set the variables below. Use the corresponding `.env.example` in `admin` and `client` as a reference where present.

### 4. Run the apps

Start the server first, then either or both frontends.

**Server (default port 3000):**

```bash
cd server
npm run dev
```

**Admin (e.g. port 5173):**

```bash
cd admin
npm run dev
```

**Client (e.g. port 5174 if admin is on 5173):**

```bash
cd client
npm run dev
```

---

## Environment Variables

### Server (`server/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (required for Prisma). |
| `PORT` | HTTP port (default: `3000`). |
| `ADMIN_FRONTEND_URL` | Full URL of the admin app (e.g. `http://localhost:5173`) — CORS and Better Auth trusted origin. |
| `CLIENT_FRONTEND_URL` | Full URL of the client app (e.g. `http://localhost:5174`) — CORS and Better Auth trusted origin. |

### Admin (`admin/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | API base URL (e.g. `http://localhost:3000/api`). |
| `VITE_AUTH_BASE_URL` | Server base URL for auth (e.g. `http://localhost:3000`). |

### Client (`client/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | API base URL (e.g. `http://localhost:3000/api`). |
| `VITE_AUTH_BASE_URL` | Server base URL for auth (e.g. `http://localhost:3000`). |
| `VITE_DASHBOARD_URL` | Admin app URL (e.g. `http://localhost:5173/`) for redirects/links. |

---

## Usage

- **Public blog** — Open the client app; browse posts on the homepage and open a post by slug (e.g. `/blog/my-post-slug`). Log in to comment.
- **Admin** — Open the admin app; sign up or log in. Use Dashboard for stats, **Blogs** to list/create/edit posts and change publish status, and **Settings** to update profile (username, name, image, bio, etc.).

API base path is `/api` (e.g. `http://localhost:3000/api`). Auth is under `/api/auth/*` (Better Auth). Protected routes use the session validated by the server.

---

## Project Structure

```
Inkwell/
├── server/                 # Express API + Better Auth + Prisma
│   ├── prisma/
│   │   ├── schema.prisma   # User, Session, Account, BlogPost, BlogComment, etc.
│   │   └── migrations/
│   └── src/
│       ├── app.ts         # Express app, CORS, helmet, auth mount, routes
│       ├── server.ts     # Start server
│       ├── lib/auth.ts   # Better Auth config
│       ├── config/       # Prisma client (PostgreSQL)
│       ├── controllers/  # posts, comments, dashboard, users, root
│       ├── routes/       # API route definitions
│       ├── middleware/   # requireAuth
│       └── db/           # Queries (e.g. dashboard stats)
├── admin/                 # React admin dashboard (Vite)
│   └── src/
│       ├── auth/         # Better Auth client, ProtectedRoute
│       ├── components/   # UI, sidebar, blog cards, modals
│       ├── features/     # blogs, dashboard, user (hooks + forms)
│       ├── pages/        # Dashboard, BlogList, Create/Edit Blog, Settings, Login, Register
│       ├── services/     # API client
│       └── lib/config.ts # API_ENDPOINTS, base URLs
└── client/                # React public blog (Vite)
    └── src/
        ├── auth/         # Auth client
        ├── components/   # Navbar, Footer, BlogCard, comments, auth modals
        ├── features/     # blog (list/detail), comments
        ├── pages/        # HomePage, BlogDetailPage
        ├── services/     # API client
        └── lib/config.ts # API_ENDPOINTS, base URLs
```

---

## Scripts / Commands

Run from each app’s directory (`server`, `admin`, or `client`).

### Server

| Command | Description |
|--------|-------------|
| `npm run dev` | Start dev server (tsx watch). |
| `npm run build` | TypeScript build. |
| `npm start` | Run production build (`node dist/server.js`). |
| `npm run lint` | Run ESLint. |
| `npm run format` | Prettier on `src`. |
| `npx prisma migrate dev` | Apply migrations in development. |
| `npx prisma migrate deploy` | Apply migrations (e.g. production). |

### Admin & Client

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server. |
| `npm run build` | TypeScript check + Vite build. |
| `npm run preview` | Preview production build. |
| `npm run lint` | Run ESLint (admin: `lint:fix` available). |
| `npm run prepare` | Husky install (pre-commit hooks). |

---

## Contributing

1. Install dependencies and set up env and database as in **Installation & Setup**.
2. Use the existing ESLint and Prettier config; pre-commit hooks (Husky + lint-staged) run formatters.
3. Prefer TypeScript and the existing patterns (controllers, routes, React Query, Better Auth).
4. Open an issue or PR with a clear description of the change.

---

## License

MIT. See [LICENSE](./LICENSE) in the repository root, or the `license` field in each `package.json`. If no `LICENSE` file is present, add one when distributing.
