export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'
export const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:4000'

export const API_ENDPOINTS = {
  auth: {
    login: () => `${AUTH_BASE_URL}/api/auth/sign-in/email`,
    register: () => `${AUTH_BASE_URL}/api/auth/sign-up/email`,
    logout: () => `${AUTH_BASE_URL}/api/auth/sign-out`,
    session: () => `${AUTH_BASE_URL}/api/auth/get-session`,
  },
  posts: {
    list: () => `${API_BASE_URL}/posts`,
    detail: (id: string) => `${API_BASE_URL}/posts/${id}`,
    create: () => `${API_BASE_URL}/posts`,
    update: (id: string) => `${API_BASE_URL}/posts/${id}`,
    delete: (id: string) => `${API_BASE_URL}/posts/${id}`,
  },
  dashboard: {
    stats: () => `${API_BASE_URL}/dashboard/stats`,
  },
} as const
