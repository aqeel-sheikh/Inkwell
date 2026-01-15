# Blog Client Frontend

Public-facing blog application built with React, TypeScript, Vite, and Tailwind CSS.

## Features

- 📚 Browse blog posts with elegant card layout
- 📖 Read full blog posts with rich formatting
- 💬 Comment system (authentication required)
- 🎨 Beautiful, responsive design with custom branding
- ⚡ Fast performance with TanStack Query caching
- 🔍 Loading, error, and empty states

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v7
- **Data Fetching**: TanStack Query (React Query)
- **Fonts**: Playfair Display, DM Sans, JetBrains Mono

## Project Structure

```
client/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── features/            # Feature-based modules
│   │   ├── blog/
│   │   │   ├── useBlog.ts      # Blog queries
│   │   │   ├── BlogCard.tsx
│   │   │   └── BlogList.tsx
│   │   └── comments/
│   │       ├── useComments.ts  # Comment queries/mutations
│   │       ├── CommentList.tsx
│   │       └── CommentForm.tsx
│   ├── pages/               # Route pages
│   │   ├── HomePage.tsx
│   │   └── BlogDetailPage.tsx
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
cd client
npm install
```

### 2. Environment Variables

Create a `.env` file in the client directory:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## API Integration

The client expects the following API endpoints:

### Blog Posts
- `GET /api/posts?page=1&limit=10` - List blog posts (paginated)
- `GET /api/posts/:slug` - Get single blog post by slug

### Comments
- `GET /api/posts/:postId/comments` - List comments for a post
- `POST /api/comments` - Create a new comment (authenticated)

### Authentication
- `GET /api/auth/me` - Get current user (for comment auth)

## Design System

### Colors
- **Brand**: Warm neutral palette (50-900)
- **Accent Coral**: `#ff6b6b` - Primary CTA color
- **Accent Mint**: `#4ecdc4` - Secondary accent
- **Accent Amber**: `#f7b731` - Tertiary accent
- **Accent Lavender**: `#a29bfe` - Quaternary accent

### Typography
- **Display**: Playfair Display (headings)
- **Sans**: DM Sans (body text)
- **Mono**: JetBrains Mono (code)

## Key Features

### Blog List Page (`/`)
- Hero section with animated headline
- Grid layout of blog cards
- Author info, date, tags
- Responsive design

### Blog Detail Page (`/blog/:slug`)
- Full article content with prose styling
- Cover image
- Author bio section
- Comments section
- Comment form (requires auth)

### State Management
- TanStack Query for server state
- Automatic caching and refetching
- Optimistic updates for comments

### Loading States
- Skeleton loaders
- Smooth animations
- Empty state messages

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- Authentication is currently mocked - integrate with BetterAuth when backend is ready
- API endpoints are configured but expect mock data or a running backend
- All components are fully typed with TypeScript
- Responsive design works on mobile, tablet, and desktop
