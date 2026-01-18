import { createBrowserRouter } from "react-router";
import { HomePage } from "@/pages/HomePage";
import { BlogDetailPage } from "@/pages/BlogDetailPage";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/blog/:slug",
        element: <BlogDetailPage />,
      },
    ],
  },
]);
