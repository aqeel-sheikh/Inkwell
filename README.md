# Blog Application Monorepo

A modern blog application with separate client and admin frontends, built with React, TypeScript, Vite, and Tailwind CSS.

## 📁 Repository Structure

```
blog-api/
├── client/          → Public blog frontend (Port 3000)
├── admin/           → Admin dashboard (Port 3001)
└── server/          → Backend API (Not included - your existing backend)
```

## 🎯 Applications Overview

### 1. Client Frontend (`/client`)
**Public-facing blog application**

- Browse and read blog posts
- View author information
- Read and post comments
- Beautiful, magazine-style design
- Responsive layout
- **Port**: 3000
- **Design**: Warm, editorial aesthetic with Playfair Display

**Key Features:**
- Blog list with pagination
- Full blog post view with rich content
- Comment system (requires auth)
- Author bios
- Tag filtering
- Loading/error/empty states

### 2. Admin Frontend (`/admin`)
**Authenticated dashboard for content management**

- Full blog CRUD operations
- Dashboard with statistics
- User authentication via BetterAuth
- Draft/publish workflow
- **Port**: 3001
- **Design**: Clean, professional dashboard with Inter

**Key Features:**
- Email/password authentication
- Create/edit/delete blog posts
- Dashboard analytics
- Rich HTML content editor
- Tag management
- Published/draft status

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend server running (your existing server at port 4000)

### Setup Both Applications

```bash
# Clone or navigate to your monorepo
cd blog-api

# Setup Client
cd client
npm install
cp .env.example .env
# Edit .env to configure API_BASE_URL
npm run dev  # Runs on http://localhost:3000

# In a new terminal, setup Admin
cd ../admin
npm install
cp .env.example .env
# Edit .env to configure API_BASE_URL and AUTH_BASE_URL
npm run dev  # Runs on http://localhost:3001
```

### Environment Variables

**Client (`.env`):**
```env
VITE_API_BASE_URL=http://localhost:4000/api
```

**Admin (`.env`):**
```env
VITE_API_BASE_URL=http://localhost:4000/api
VITE_AUTH_BASE_URL=http://localhost:4000
```

## 📦 Tech Stack

| Technology | Client | Admin | Purpose |
|------------|--------|-------|---------|
| React 19 | ✅ | ✅ | UI Framework |
| TypeScript | ✅ | ✅ | Type Safety |
| Vite | ✅ | ✅ | Build Tool |
| Tailwind CSS | ✅ | ✅ | Styling |
| React Router v7 | ✅ | ✅ | Routing |
| TanStack Query | ✅ | ✅ | Data Fetching |
| BetterAuth | ❌ | ✅ | Authentication |

## 🎨 Design Systems

### Client Design
- **Fonts**: Playfair Display, DM Sans, JetBrains Mono
- **Colors**: Warm neutrals with coral, mint, amber accents
- **Style**: Editorial, magazine-inspired
- **Target**: Readers and content consumers

### Admin Design
- **Fonts**: Inter, Sora, JetBrains Mono
- **Colors**: Professional blues with status colors
- **Style**: Clean, dashboard-focused
- **Target**: Content creators and administrators

## 🔌 API Requirements

Both applications expect your backend to provide these endpoints:

### Blog Posts (Both Apps)
```
GET    /api/posts?page=1&limit=10      - List posts (paginated)
GET    /api/posts/:slug                - Get post by slug (client)
GET    /api/posts/:id                  - Get post by ID (admin)
POST   /api/posts                      - Create post (admin)
PATCH  /api/posts/:id                  - Update post (admin)
DELETE /api/posts/:id                  - Delete post (admin)
```

### Comments (Client Only)
```
GET    /api/posts/:postId/comments     - List comments
POST   /api/comments                   - Create comment
```

### Authentication (Admin Only - BetterAuth)
```
POST   /api/auth/sign-up/email         - Register
POST   /api/auth/sign-in/email         - Login
POST   /api/auth/sign-out              - Logout
GET    /api/auth/get-session           - Get session
```

### Dashboard (Admin Only)
```
GET    /api/dashboard/stats            - Get statistics
```

## 📊 Data Types

### BlogPost
```typescript
{
  id: string
  slug: string              // For client URLs
  title: string
  excerpt: string           // Short summary
  content: string           // Full HTML content
  coverImage?: string       // Image URL
  author: {
    id: string
    name: string
    email: string
    bio?: string
    avatar?: string
  }
  createdAt: string
  updatedAt: string
  published: boolean        // Draft vs Published
  tags?: string[]
}
```

### Comment
```typescript
{
  id: string
  content: string
  author: Author
  postId: string
  createdAt: string
  updatedAt: string
}
```

### DashboardStats
```typescript
{
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalViews: number
}
```

## 🔐 BetterAuth Integration (Admin)

### Setup on Backend

1. Install BetterAuth on your server:
```bash
npm install better-auth
```

2. Configure BetterAuth in your backend:
```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: yourDatabase,
  emailAndPassword: {
    enabled: true,
  },
  // ... other config
})
```

3. Add auth routes to your Express/Node server:
```typescript
app.use('/api/auth/*', auth.handler)
```

### How It Works

1. **Registration**: User submits name, email, password
2. **Login**: User submits email, password
3. **Session**: BetterAuth creates HTTP-only cookie
4. **Protected Routes**: Admin checks session, redirects if not authenticated
5. **API Calls**: Include `credentials: 'include'` to send cookies

### Admin Authentication Flow

```
User Registration
     ↓
POST /api/auth/sign-up/email
     ↓
BetterAuth creates user + session
     ↓
Cookie sent to browser
     ↓
User redirected to /dashboard
     ↓
Protected routes check session
     ↓
API calls include session cookie
```

## 🛣️ Route Structure

### Client Routes
```
/                          - Homepage with blog list
/blog/:slug               - Individual blog post
```

### Admin Routes
```
/login                    - Login page (public)
/register                 - Registration page (public)
/dashboard                - Dashboard overview (protected)
/dashboard/blogs          - Blog list (protected)
/dashboard/blogs/new      - Create blog (protected)
/dashboard/blogs/:id/edit - Edit blog (protected)
```

## 📝 Development Workflow

### Creating a New Blog Post

1. **Admin**: Login at `http://localhost:3001/login`
2. **Admin**: Navigate to "Blog Posts" or click "Create New Post"
3. **Admin**: Fill in title, excerpt, content (HTML supported)
4. **Admin**: Add cover image URL and tags
5. **Admin**: Toggle "Publish immediately" or save as draft
6. **Admin**: Click "Create Blog Post"
7. **Client**: Post appears on `http://localhost:3000` (if published)

### Editing Content

1. **Admin**: Go to "Blog Posts"
2. **Admin**: Click "Edit" on any post
3. **Admin**: Make changes
4. **Admin**: Save
5. **Client**: Changes reflect immediately (TanStack Query invalidation)

### Managing Comments (Client)

1. **Client**: User reads a blog post
2. **Client**: User logs in (if not authenticated)
3. **Client**: User writes comment
4. **Client**: Comment appears in list

## 🏗️ Architecture Patterns

### Client Architecture
```
Pages (Routes)
    ↓
Features (Domain Logic)
    ↓
Services (API Calls)
    ↓
Components (UI)
```

### Admin Architecture
```
Pages (Routes) + Auth Guard
    ↓
Features (CRUD Operations)
    ↓
Services (API Calls with Auth)
    ↓
Components (UI)
```

### Data Flow (TanStack Query)
```
Component triggers query
    ↓
TanStack Query checks cache
    ↓
If stale, fetch from API
    ↓
Update cache
    ↓
Re-render component
```

## 🔧 Scripts

### Client
```bash
npm run dev      # Development server (port 3000)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linting
```

### Admin
```bash
npm run dev      # Development server (port 3001)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linting
```

## 📦 Production Build

### Build Both Apps
```bash
# Build client
cd client
npm run build
# Output: client/dist/

# Build admin
cd ../admin
npm run build
# Output: admin/dist/
```

### Deployment

Both apps generate static files that can be deployed to:
- Vercel
- Netlify
- AWS S3 + CloudFront
- Any static hosting

**Important**: Configure environment variables in your hosting platform.

## 🚦 Common Issues & Solutions

### Issue: CORS Errors
**Solution**: Configure CORS on backend to allow requests from client (`http://localhost:3000`) and admin (`http://localhost:3001`)

### Issue: Auth Not Working
**Solution**: 
1. Ensure `credentials: 'include'` in API calls
2. Check CORS allows credentials
3. Verify BetterAuth is properly configured on backend
4. Check cookie settings (SameSite, Secure)

### Issue: Comments Require Auth (Client)
**Solution**: The client currently shows "Sign in to comment" for all users. You'll need to:
1. Implement BetterAuth on client (optional)
2. OR integrate with admin's auth system
3. OR allow anonymous comments

### Issue: Image Uploads
**Solution**: Currently uses URL input. For production:
1. Add file upload to backend
2. Use services like Cloudinary, AWS S3
3. Update `BlogForm` to handle file uploads

## 🎯 Next Steps

### Recommended Enhancements

**Client:**
- [ ] Search functionality
- [ ] Category pages
- [ ] Related posts
- [ ] Social sharing
- [ ] Newsletter signup
- [ ] RSS feed

**Admin:**
- [ ] Rich text editor (TinyMCE, Quill)
- [ ] Image upload
- [ ] Analytics dashboard
- [ ] Comment moderation
- [ ] SEO fields (meta description, OG tags)
- [ ] Scheduled publishing
- [ ] Multi-user support with roles

**Both:**
- [ ] Error boundaries
- [ ] Improved loading states
- [ ] Offline support
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Unit tests
- [ ] E2E tests

## 📚 Documentation

- **Client**: See `/client/README.md`
- **Admin**: See `/admin/README.md`
- **BetterAuth**: https://www.better-auth.com/docs
- **TanStack Query**: https://tanstack.com/query/latest
- **Tailwind CSS**: https://tailwindcss.com/docs

## 🤝 Contributing

1. Keep client and admin separate
2. Follow existing file structure
3. Use TypeScript strictly
4. Follow component patterns
5. Update README when adding features

## 📄 License

MIT

---

Built with ❤️ using React, TypeScript, Vite, and Tailwind CSS
