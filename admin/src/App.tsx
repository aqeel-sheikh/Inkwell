import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/auth/ProtectedRoute'
import { LoginPage } from '@/pages/LoginPage'
import { RegisterPage } from '@/pages/RegisterPage'
import { DashboardLayout } from '@/pages/DashboardLayout'
import { DashboardPage } from '@/pages/DashboardPage'
import { BlogListPage } from '@/pages/BlogListPage'
import { CreateBlogPage } from '@/pages/CreateBlogPage'
import { EditBlogPage } from '@/pages/EditBlogPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="blogs" element={<BlogListPage />} />
          <Route path="blogs/new" element={<CreateBlogPage />} />
          <Route path="blogs/:id/edit" element={<EditBlogPage />} />
        </Route>

        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
