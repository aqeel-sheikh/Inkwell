import { API_ENDPOINTS } from '@/lib/config'
import type { BlogPost, CreateBlogDto, UpdateBlogDto, PaginatedResponse, DashboardStats } from '@/types'

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
      credentials: 'include', // Important for BetterAuth session cookies
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
    list: async (page = 1, limit = 20): Promise<PaginatedResponse<BlogPost>> => {
      return fetchApi(`${API_ENDPOINTS.posts.list()}?page=${page}&limit=${limit}`)
    },
    
    getById: async (id: string): Promise<BlogPost> => {
      return fetchApi(API_ENDPOINTS.posts.detail(id))
    },

    create: async (data: CreateBlogDto): Promise<BlogPost> => {
      return fetchApi(API_ENDPOINTS.posts.create(), {
        method: 'POST',
        body: JSON.stringify(data),
      })
    },

    update: async ({ id, ...data }: UpdateBlogDto): Promise<BlogPost> => {
      return fetchApi(API_ENDPOINTS.posts.update(id), {
        method: 'PATCH',
        body: JSON.stringify(data),
      })
    },

    delete: async (id: string): Promise<void> => {
      return fetchApi(API_ENDPOINTS.posts.delete(id), {
        method: 'DELETE',
      })
    },
  },

  dashboard: {
    getStats: async (): Promise<DashboardStats> => {
      return fetchApi(API_ENDPOINTS.dashboard.stats())
    },
  },
}
