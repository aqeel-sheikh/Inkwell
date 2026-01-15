import { API_ENDPOINTS } from '@/lib/config'
import type { BlogPost, Comment, CreateCommentDto, PaginatedResponse } from '@/types'

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include', // For cookies/sessions
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An error occurred' }))
      throw new ApiError(response.status, errorData.message || response.statusText)
    }

    return response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error('Network error occurred')
  }
}

export const api = {
  posts: {
    list: async (page = 1, limit = 10): Promise<PaginatedResponse<BlogPost>> => {
      return fetchApi(`${API_ENDPOINTS.posts.list()}?page=${page}&limit=${limit}`)
    },
    
    getBySlug: async (slug: string): Promise<BlogPost> => {
      return fetchApi(API_ENDPOINTS.posts.detail(slug))
    },
  },

  comments: {
    list: async (postId: string): Promise<Comment[]> => {
      return fetchApi(API_ENDPOINTS.comments.list(postId))
    },

    create: async (data: CreateCommentDto): Promise<Comment> => {
      return fetchApi(API_ENDPOINTS.comments.create(), {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },
  },

  auth: {
    getCurrentUser: async () => {
      return fetchApi(API_ENDPOINTS.auth.me())
    },
  },
}
