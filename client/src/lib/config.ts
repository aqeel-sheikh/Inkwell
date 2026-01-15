export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api'

export const API_ENDPOINTS = {
  posts: {
    list: () => `${API_BASE_URL}/posts`,
    detail: (slug: string) => `${API_BASE_URL}/posts/${slug}`,
  },
  comments: {
    list: (postId: string) => `${API_BASE_URL}/posts/${postId}/comments`,
    create: () => `${API_BASE_URL}/comments`,
  },
  auth: {
    me: () => `${API_BASE_URL}/auth/me`,
  },
} as const
