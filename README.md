# Inkwell - Fullstack blog web app

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node](https://img.shields.io/badge/Node-ES%20Modules-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-339933?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?logo=prisma)](https://www.prisma.io/)

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.x-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zod](https://img.shields.io/badge/Zod-Schema%20Validation-3E67B1)](https://zod.dev/)
[![BetterAuth](https://img.shields.io/badge/Auth-Better%20Auth-4B5563)](https://www.better-auth.com/)

[![TipTap](https://img.shields.io/badge/Editor-TipTap-coral?logo=tiptap)](https://tiptap.dev/)
[![HTML Parser](https://img.shields.io/badge/Render-html--react--parser-orange)](https://github.com/remarkablemark/html-react-parser)

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)


Full-stack blog platform with a Node.js API, PostgreSQL database, and two React frontends: a public **client** for reading posts and commenting, and an **admin** dashboard for authors to create and manage content.

---

## Project Overview

This repository provides a complete blog system:

- **Server** — Express API with Better Auth (email/password), Prisma (PostgreSQL), NeonDb, and REST endpoints for posts, comments, users, and dashboard stats.
- **Admin** — React SPA for authenticated users: dashboard, blog CRUD, publish/draft, rich text editor, and profile settings.
- **Client** — React SPA for visitors: homepage with published posts, post detail by slug with parsed html, and comments.

The server is the single backend; both frontends talk to the same API and auth service.

---

## Key Features

- **Authentication** — Email/password sign-up and sign-in via [Better Auth](https://www.better-auth.com/); session-based auth with configurable trusted origins.
- **Blog posts** — Create, edit, delete; draft vs published; slug-based URLs; title, content, excerpt, tags.
- **Rich text editor** — TipTap-based editor for blogs with HTML output and safe client-side rendering via `html-react-parser`.
- **Comments** — List comments per post (public); create comment (authenticated).
- **Dashboard** — Author stats: total posts, published, drafts, and view counts.
- **User profiles** — Username (unique), name, email, image, cover image, website, bio; editable in admin Settings.
- **Public API** — List published posts and get post by slug without auth.

---

## Tech Stack

| Layer   | Technologies |
|--------|--------------|
| **Server** | Node.js, Express 5, Better Auth, Prisma 7, PostgreSQL, Helmet, CORS, Zod |
| **Admin**  | React 19, Vite 6, React Router 7, TanStack Query, Better Auth client, Tailwind CSS 4, Shadncn UI, Zod |
| **Client** | React 19, Vite 6, React Router 7, TanStack Query, Better Auth client, Tailwind CSS 4, Shadcn UI, Zod |

---

## Installation & Setup

### Prerequisites

- **Node.js** (v18+ recommended)
- **PostgreSQL** (for the server)
- **pnpm** or **npm** (commands below use `npm`)

### Cross-domain authentication (production only)

When the admin and client apps are hosted on **different domains**, cookies are configured with
`SameSite=None; Secure; Partitioned` to allow cross-site session sharing.

If you deploy the Server, Admin and Client on the **same domain**, you can safely remove the cross-domain cookie configuration.

This configuration is **enabled only in production**.  
For local developmen, these attributes are disabled to avoid issues on `localhost`.

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

Create `.env` in each app and set the variables below. Use the corresponding `.env.example` in `admin`, `client` and `server` as a reference where present.

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
| `DIRECT_URL` | PostgreSQL direct connection string without pooler (required for Prisma CLI direct connection). |
| `BETTER_AUTH_SECRET` | Cryptographic key used for signing and encryption, generated using a secure, programmatic method |
| `BETTER_AUTH_BASE_URL` | Your backend url where it is hosted(e.g. `http://localhost:3000`)|
| `ADMIN_FRONTEND_URL` | Full URL of the admin app (e.g. `http://localhost:5173`) — CORS and Better Auth trusted origin. |
| `CLIENT_FRONTEND_URL` | Full URL of the client app (e.g. `http://localhost:5174`) — CORS and Better Auth trusted origin. |

### Admin (`admin/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | API base URL (e.g. `http://localhost:3000/api`). |
| `VITE_AUTH_BASE_URL` | Server base URL for auth (e.g. `http://localhost:3000`). |
| `VITE_CLIENT_FRONTEND_URL` | Client app URL  (e.g. `http://localhost:3000`) for redirects/links. |

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
