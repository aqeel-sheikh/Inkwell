# Blog Admin Dashboard

Authenticated admin dashboard for managing blog posts built with React, TypeScript, Vite, and BetterAuth.

## Features

- 🔐 Authentication with BetterAuth (email/password)
- 📊 Dashboard with statistics overview
- ✍️ Full CRUD for blog posts
- 📝 Rich text content editor (HTML support)
- 🏷️ Tag management
- 📋 Draft/Published status
- 🎨 Clean, professional UI
- 🔒 Protected routes
- ⚡ Fast performance with TanStack Query

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Data Fetching**: TanStack Query (React Query)
- **Authentication**: BetterAuth
- **Fonts**: Inter, Sora, JetBrains Mono

## Project Structure

```
admin/
├── src/
│   ├── auth/                # Authentication
│   │   ├── authClient.ts       # BetterAuth client setup
│   │   └── ProtectedRoute.tsx  # Route protection HOC
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Textarea.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── ...
│   ├── features/            # Feature-based modules
│   │   ├── dashboard/
│   │   │   └── useDashboard.ts
│   │   └── blogs/
│   │       ├── useBlogs.ts     # Blog CRUD hooks
│   │       └── BlogForm.tsx    # Create/Edit form
│   ├── pages/               # Route pages
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── BlogListPage.tsx
│   │   ├── CreateBlogPage.tsx
│   │   └── EditBlogPage.tsx
│   ├── services/            # API abstraction
│   │   └── api.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── lib/                 # Utilities & config
│   │   └── config.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd admin
npm install
```

### 2. Environment Variables

Create a `.env` file in the admin directory:

```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_AUTH_BASE_URL=http://localhost:4000
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3001`

### 4. Build for Production

```bash
npm run build
```

## BetterAuth Integration

### Client Setup

The BetterAuth client is configured in `src/auth/authClient.ts`:

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: AUTH_BASE_URL,
});

export const { signIn, signUp, signOut, useSession } = authClient;
```

### Authentication Flow

1. **Sign Up**: Users register with name, email, and password
2. **Sign In**: Users log in with email and password
3. **Session**: BetterAuth manages sessions via HTTP-only cookies
4. **Protected Routes**: `ProtectedRoute` component checks session and redirects to login if not authenticated

### Using Authentication

```typescript
// In components
import { useSession, signOut } from '@/auth/authClient'

function MyComponent() {
  const { data: session, isPending } = useSession()

  if (isPending) return <Loading />
  if (!session) return <Login />

  return <div>Welcome {session.user.name}</div>
}
```

### Backend Requirements

The backend must implement BetterAuth server endpoints:

- `POST /api/auth/sign-up/email` - Register new user
- `POST /api/auth/sign-in/email` - Login
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/get-session` - Get current session

## API Integration

The admin expects the following API endpoints:

### Authentication (BetterAuth)

- `POST /api/auth/sign-up/email` - Register
- `POST /api/auth/sign-in/email` - Login
- `POST /api/auth/sign-out` - Logout
- `GET /api/auth/get-session` - Get session

### Blog Posts

- `GET /api/posts?page=1&limit=20` - List blog posts (paginated)
- `GET /api/posts/:id` - Get single blog post
- `POST /api/posts` - Create new blog post
- `PATCH /api/posts/:id` - Update blog post
- `DELETE /api/posts/:id` - Delete blog post

### Dashboard

- `GET /api/dashboard/stats` - Get dashboard statistics

## Routes

### Public Routes

- `/login` - Login page
- `/register` - Registration page

### Protected Routes (requires authentication)

- `/dashboard` - Dashboard overview
- `/dashboard/blogs` - Blog list
- `/dashboard/blogs/new` - Create new blog
- `/dashboard/blogs/:id/edit` - Edit blog

## Features Detail

### Dashboard

- Total posts count
- Published posts count
- Draft posts count
- Total views (if available)
- Quick actions for common tasks

### Blog Management

- View all blog posts
- Create new posts with:
  - Title, excerpt, content
  - Cover image URL
  - Tags (comma-separated)
  - Published/Draft status
- Edit existing posts
- Delete posts with confirmation modal
- Publish/Unpublish toggle

### Authentication

- Email/password registration
- Email/password login
- Persistent sessions via cookies
- Protected routes
- User menu with logout

## Design System

### Colors

- **Primary**: Blue (50-900) - Main brand color
- **Success**: Green - Published posts
- **Warning**: Orange - Draft posts
- **Danger**: Red - Delete actions

### Typography

- **Display**: Sora (headings)
- **Sans**: Inter (body text)
- **Mono**: JetBrains Mono (code)

## State Management

- **Server State**: TanStack Query
- **Authentication**: BetterAuth React hooks
- **Form State**: React useState
- **Caching**: Automatic via TanStack Query

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- All routes except `/login` and `/register` require authentication
- Sessions are managed via HTTP-only cookies by BetterAuth
- API calls automatically include credentials for cookie-based auth
- Form validation is handled at the component level
- Blog content supports HTML for rich formatting
- Tags are managed as comma-separated values
- The dashboard links to the client app at `http://localhost:3000`

## Production Checklist

- [ ] Configure proper CORS settings on backend
- [ ] Set up HTTPS for production
- [ ] Configure secure cookie settings
- [ ] Set up proper error tracking
- [ ] Configure rate limiting
- [ ] Set up image upload service (replace URL input)
- [ ] Add rich text editor (replace HTML textarea)
- [ ] Implement proper validation
- [ ] Add loading states for all operations
- [ ] Test on multiple browsers
