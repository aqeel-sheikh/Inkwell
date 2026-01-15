import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api'

export function useBlogPosts(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['posts', page, limit],
    queryFn: () => api.posts.list(page, limit),
  })
}

export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => api.posts.getBySlug(slug),
    enabled: !!slug,
  })
}
