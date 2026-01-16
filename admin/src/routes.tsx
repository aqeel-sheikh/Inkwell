import { createBrowserRouter, type RouteObject } from "react-router";
import { Navigate } from "react-router";
import App from "./App";
import { ProtectedRoute } from "@/auth/ProtectedRoute";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { DashboardLayout } from "@/pages/DashboardLayout";
import { DashboardPage } from "@/pages/DashboardPage";
import { BlogListPage } from "@/pages/BlogListPage";
import { CreateBlogPage } from "@/pages/CreateBlogPage";
import { EditBlogPage } from "@/pages/EditBlogPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "blogs", element: <BlogListPage /> },
          { path: "blogs/new", element: <CreateBlogPage /> },
          { path: "blogs/:id/edit", element: <EditBlogPage /> },
        ],
      },
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
