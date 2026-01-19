export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
export const AUTH_BASE_URL =
  import.meta.env.VITE_AUTH_BASE_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  posts: {
    list: () => `${API_BASE_URL}/public/posts`,
    detail: (slug: string) => `${API_BASE_URL}/public/posts/${slug}`,
  },
  comments: {
    list: (postId: string) => `${API_BASE_URL}/public/posts/${postId}/comments`,
    create: () => `${API_BASE_URL}/comments`,
  },
  auth: {
    login: () => `${AUTH_BASE_URL}/api/auth/sign-in/email`,
    register: () => `${AUTH_BASE_URL}/api/auth/sign-up/email`,
    logout: () => `${AUTH_BASE_URL}/api/auth/sign-out`,
    session: () => `${AUTH_BASE_URL}/api/auth/get-session`,
    me: () => `${API_BASE_URL}/auth/me`,
  },
} as const;
