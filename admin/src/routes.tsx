import { createBrowserRouter, type RouteObject } from "react-router";
import { Navigate } from "react-router";
import App from "./App";
import { ProtectedRoute } from "@/auth/ProtectedRoute";

import {
  LoginPage,
  RegisterPage,
  DashboardLayout,
  DashboardPage,
  BlogListPage,
  CreateBlogPage,
  EditBlogPage,
  Settings,
} from "@/pages";

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
          { path: "settings", element: <Settings /> },
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
